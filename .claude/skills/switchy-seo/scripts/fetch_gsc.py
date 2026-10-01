#!/usr/bin/env python3
"""Pull Google Search Console data via the API for the weekly Switchy SEO review.

Replaces the manual xlsx export. Standard library only; JWTs are signed with the
`openssl` CLI so it runs on macOS and in cloud containers without pip installs.

Credentials (service account JSON), first match wins:
  GSC_KEY_JSON   env var holding the JSON itself (cloud routines)
  GSC_KEY_FILE   env var holding a path to the JSON
  ~/Documents/2026/Get Rich/SEO/Switchy Data/*.json (local default)

Usage:
  fetch_gsc.py                    weekly report: last 7 days with data vs the 7 before
  fetch_gsc.py --inspect URL ...  URL Inspection: index status, last crawl, canonical
  fetch_gsc.py --submit-sitemap   (re)submit https://mangobuns.com/sitemap.xml
  fetch_gsc.py --sites            list properties the service account can see

The service account must be a user on the Search Console property (Full
permission is needed for --submit-sitemap). Google offers no API for
"Request Indexing"; --inspect tells you when a manual request is worthwhile.
"""
import base64
import datetime as dt
import json
import os
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from parse_gsc import report  # noqa: E402

DATA_DIR = Path.home() / "Documents/2026/Get Rich/SEO/Switchy Data"
SITEMAP = "https://mangobuns.com/sitemap.xml"
SCOPE = "https://www.googleapis.com/auth/webmasters"
API = "https://www.googleapis.com/webmasters/v3"
INSPECT_API = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect"


def load_key():
    if os.environ.get("GSC_KEY_JSON"):
        return json.loads(os.environ["GSC_KEY_JSON"])
    if os.environ.get("GSC_KEY_FILE"):
        return json.loads(Path(os.environ["GSC_KEY_FILE"]).read_text())
    for p in sorted(DATA_DIR.glob("*.json")):
        d = json.loads(p.read_text())
        if d.get("type") == "service_account":
            return d
    sys.exit("No service account key found (set GSC_KEY_JSON or GSC_KEY_FILE).")


def b64url(data):
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()


def access_token(key):
    now = int(time.time())
    header = b64url(json.dumps({"alg": "RS256", "typ": "JWT"}).encode())
    claims = b64url(json.dumps({
        "iss": key["client_email"], "scope": SCOPE, "aud": key["token_uri"],
        "iat": now, "exp": now + 3600,
    }).encode())
    signing_input = f"{header}.{claims}".encode()
    fd, key_path = tempfile.mkstemp(suffix=".pem")
    try:
        os.chmod(key_path, 0o600)
        with os.fdopen(fd, "w") as f:
            f.write(key["private_key"])
        sig = subprocess.run(["openssl", "dgst", "-sha256", "-sign", key_path],
                             input=signing_input, capture_output=True, check=True).stdout
    finally:
        os.unlink(key_path)
    body = urllib.parse.urlencode({
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": f"{header}.{claims}.{b64url(sig)}",
    }).encode()
    with urllib.request.urlopen(key["token_uri"], body) as r:
        return json.load(r)["access_token"]


class GSC:
    def __init__(self):
        self.token = access_token(load_key())

    def call(self, url, payload=None, method=None):
        data = json.dumps(payload).encode() if payload is not None else None
        req = urllib.request.Request(url, data=data, method=method or ("POST" if data else "GET"))
        req.add_header("Authorization", f"Bearer {self.token}")
        if data:
            req.add_header("Content-Type", "application/json")
        try:
            with urllib.request.urlopen(req) as r:
                raw = r.read()
                return json.loads(raw) if raw else {}
        except urllib.error.HTTPError as e:
            sys.exit(f"HTTP {e.code} from {url}: {e.read().decode()[:500]}")

    def sites(self):
        return self.call(f"{API}/sites").get("siteEntry", [])

    def site(self):
        entries = [s for s in self.sites() if "mangobuns.com" in s["siteUrl"]]
        if not entries:
            sys.exit("Service account has no access to a mangobuns.com property. Add its "
                     "client_email under Search Console > Settings > Users and permissions.")
        # Prefer the widest property: domain > https://mangobuns.com/ > /switchy/.
        # Only a root-covering property can accept /sitemap.xml.
        entries.sort(key=lambda s: (not s["siteUrl"].startswith("sc-domain:"), len(s["siteUrl"])))
        return entries[0]["siteUrl"]

    def query(self, site, start, end, dims, limit=1000):
        url = f"{API}/sites/{urllib.parse.quote(site, safe='')}/searchAnalytics/query"
        body = {"startDate": str(start), "endDate": str(end), "dimensions": dims,
                "rowLimit": limit, "type": "web"}
        return self.call(url, body).get("rows", [])


def latest_data_date(gsc, site):
    """GSC lags 2-3 days; find the newest day that has finalized data."""
    today = dt.date.today()
    rows = gsc.query(site, today - dt.timedelta(days=10), today, ["date"])
    if not rows:
        sys.exit("No Search Console data in the last 10 days.")
    return max(dt.date.fromisoformat(r["keys"][0]) for r in rows)


def rows_by_key(rows):
    return {r["keys"][0]: r for r in rows}


def merged(cur, prev):
    out = []
    for name, r in cur.items():
        p = prev.get(name, {})
        out.append({
            "name": name,
            "clicks": r["clicks"], "impressions": r["impressions"],
            "ctr": r["ctr"], "position": r["position"],
            "clicks_prev": p.get("clicks", 0), "impressions_prev": p.get("impressions", 0),
            "position_prev": p.get("position", 0),
        })
    return out


def weekly():
    gsc = GSC()
    site = gsc.site()
    end = latest_data_date(gsc, site)
    start = end - dt.timedelta(days=6)
    pend, pstart = start - dt.timedelta(days=1), start - dt.timedelta(days=7)

    def totals(s, e):
        rows = gsc.query(site, s, e, ["date"])
        c = sum(r["clicks"] for r in rows)
        i = sum(r["impressions"] for r in rows)
        pos = sum(r["position"] * r["impressions"] for r in rows) / i if i else 0
        return c, i, pos, rows

    c, i, pos, daily = totals(start, end)
    pc, pi, ppos, _ = totals(pstart, pend)
    print(f"Property: {site}")
    print(f"Current window: {start} → {end}   Previous: {pstart} → {pend}")
    print()
    print("## Site-wide (property totals)")
    print(f"- impressions {pi:g} → {i:g} ({(i - pi) / pi * 100:+.0f}%)" if pi else f"- impressions {i:g}")
    print(f"- clicks {pc:g} → {c:g}")
    print(f"- CTR {pc / pi * 100 if pi else 0:.2f}% → {c / i * 100 if i else 0:.2f}%")
    print(f"- impression-weighted position {ppos:.2f} → {pos:.2f} (lower is better)")
    print("- daily: " + ", ".join(f"{r['keys'][0][5:]} {r['impressions']:g}/{r['clicks']:g}" for r in daily))
    print()

    perf = {"filters": {"Source": "Search Console API", "Search type": "Web",
                        "Current": f"{start}..{end}", "Previous": f"{pstart}..{pend}"}}
    for dim, key in (("page", "pages"), ("query", "queries")):
        cur = rows_by_key(gsc.query(site, start, end, [dim]))
        prev = rows_by_key(gsc.query(site, pstart, pend, [dim]))
        perf[key] = {"compare": True, "entries": merged(cur, prev)}
    perf["pages"]["entries"].sort(key=lambda e: -e["clicks"])
    report(perf, f"API pull {dt.date.today()}")

    print("## Devices")
    for r in gsc.query(site, start, end, ["device"]):
        print(f"- {r['keys'][0].lower()}: {r['impressions']:g} imp, {r['clicks']:g} clicks, "
              f"pos {r['position']:.2f}")
    print()
    print("## Top page+query pairs (which page serves which query)")
    pairs = sorted(gsc.query(site, start, end, ["page", "query"], 250),
                   key=lambda r: -r["impressions"])[:40]
    for r in pairs:
        page = r["keys"][0].replace("https://mangobuns.com", "")
        print(f"- {page} ← \"{r['keys'][1]}\": {r['impressions']:g} imp, "
              f"{r['clicks']:g} clicks, pos {r['position']:.1f}")


def inspect(urls):
    gsc = GSC()
    site = gsc.site()
    for u in urls:
        res = gsc.call(INSPECT_API, {"inspectionUrl": u, "siteUrl": site})
        s = res.get("inspectionResult", {}).get("indexStatusResult", {})
        print(f"{u}\n  verdict={s.get('verdict')} coverage={s.get('coverageState')!r}\n"
              f"  lastCrawl={s.get('lastCrawlTime', '-')} googleCanonical={s.get('googleCanonical', '-')}")


def submit_sitemap():
    gsc = GSC()
    site = gsc.site()
    url = (f"{API}/sites/{urllib.parse.quote(site, safe='')}/sitemaps/"
           f"{urllib.parse.quote(SITEMAP, safe='')}")
    gsc.call(url, method="PUT")
    print(f"Submitted {SITEMAP} to {site}")


def main():
    args = sys.argv[1:]
    if not args:
        weekly()
    elif args[0] == "--inspect":
        inspect(args[1:])
    elif args[0] == "--submit-sitemap":
        submit_sitemap()
    elif args[0] == "--sites":
        for s in GSC().sites():
            print(s["siteUrl"], s["permissionLevel"])
    else:
        sys.exit(__doc__)


if __name__ == "__main__":
    main()
