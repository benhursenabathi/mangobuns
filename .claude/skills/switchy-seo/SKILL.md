---
name: switchy-seo
description: Weekly SEO review for the Switchy landing page (mangobuns.com). Pulls Google Search Console data via the API (or parses xlsx exports as a fallback), finds position-8-20 title-tweak opportunities, flags CTR problems, verifies new pages got indexed, checks site health, proposes or writes content, and appends trends to docs/seo-log.md. Use when the user runs /switchy-seo, asks for the weekly SEO check/review, or drops fresh GSC export data to analyze. Also runs unattended as a weekly cloud routine that opens a PR.
---

# Switchy Weekly SEO Review

Context: this repo deploys to mangobuns.com via GitHub Actions on push to main
(pushing = production deploy — get user approval before pushing; in unattended
mode NEVER push to main, open a PR instead). Canonical sitemap:
https://mangobuns.com/sitemap.xml. Running log + watching list:
`docs/seo-log.md`. Strategy background: `docs/seo-playbook.md`.

## Workflow

### 1. Get the GSC data

Primary — Search Console API (service account
`switchy-search-console@steady-cascade-460612-c0.iam.gserviceaccount.com`,
Full user on the property):

```bash
python3 .claude/skills/switchy-seo/scripts/fetch_gsc.py            # last 7 days with data vs the 7 before
python3 .claude/skills/switchy-seo/scripts/fetch_gsc.py --inspect URL ...   # index status + last crawl
python3 .claude/skills/switchy-seo/scripts/fetch_gsc.py --submit-sitemap    # needs a root/domain property
```

Credentials: `GSC_KEY_B64` (cloud routine env var, base64 of the key JSON),
`GSC_KEY_JSON` or `GSC_KEY_FILE`, else the
key JSON in `~/Documents/2026/Get Rich/SEO/Switchy Data/` (local). The key is
secret and the repo is public: never print it, copy it into the repo, or
commit it. The report includes site-wide totals, per-page metrics with
previous-week values, all queries, devices, and page←query pairs (which page
serves which query — use this instead of asking for page-filtered exports).

Fallback — manual xlsx export (`parse_gsc.py`), if the API fails:

> In GSC (mangobuns.com property) → Performance → set date to **Last 7 days,
> compare to previous period** → **clear any page filter** → Export → Excel,
> and drop the file into `~/Documents/2026/Get Rich/SEO/Switchy Data/`.

### 2. Site health (automated)

Every sitemap URL must return 200:

```bash
curl -s https://mangobuns.com/sitemap.xml | grep -o '<loc>[^<]*' | cut -c6- | \
  while read -r u; do curl -s -o /dev/null -w "%{http_code}  $u\n" "$u"; done
```

Investigate anything that isn't 200 before proceeding. Then run
`fetch_gsc.py --submit-sitemap` so Google re-reads lastmod dates (skip with a
note if it reports the property can't cover /sitemap.xml).

### 3. Indexing check for watched URLs

Read the **Watching** table in `docs/seo-log.md` and run
`fetch_gsc.py --inspect` on every URL not yet indexed (and any page edited in
the last 14 days, to see whether Google has recrawled it):

- `Submitted and indexed` → mark it indexed in the log (record the date).
- Not indexed and added <14 days ago → keep watching, no action.
- Not indexed and added >=14 days ago → tell the user to run URL Inspection →
  Request Indexing in GSC for that exact URL. There is no API for this; it is
  always a manual step for the user.

### 4. Analyze and propose actions

Apply these rules to the report:

- **Position 8-20 with impressions** → one title/meta tweak away from page 1.
  Use the page←query pairs to find which page ranks. Propose a specific
  `<title>`/meta description change that front-loads the query phrasing. Show
  before/after and reasoning.
- **Position <=10, impressions but ~0 clicks** → CTR problem, not ranking.
  Rewrite title/description for click-through (numbers, year, concrete
  benefit), don't chase position.
- **Position improving week-over-week** → leave the page alone; note the trend.
- **Experiment windows:** never change the title/description/intro of a page
  whose snippet changed in the last 14 days (check the log). One snippet test
  per page at a time, and record the baseline (impr, clicks, pos) in the log.
- **Query cluster with impressions but no dedicated page** → propose a new
  post (at most one per week, only with query or SERP evidence). Pattern: copy
  the structure of an existing post in `public/blog/` (Article + FAQPage +
  BreadcrumbList JSON-LD whose FAQ text matches the visible FAQ exactly,
  related-links section with 3 items, purchase block, same inline CSS, meta
  line `Month YYYY · N min read`), then wire it into ALL of:
  `public/blog/index.html` (hub card), `public-root/sitemap.xml` (the ONLY
  sitemap — `public/sitemap.xml` was deleted 2026-07-24), `public-root/llms.txt`,
  and the IndexNow urlList in `.github/workflows/deploy.yml`. Also add at least
  one **in-prose contextual link** from an existing high-impression page —
  links in the "Related reading" block alone do not register as referring
  pages (see the 2026-07-24 log entry).
- **Updating a post:** bump `dateModified` in its JSON-LD, its sitemap
  `lastmod`, and the meta line to `<Published> · Updated Month YYYY · N min read`
  (and the hub card's date line).

### Content and claim rules

- Every product claim must be true of the shipped app. When the Switchy app
  repo is available (cloud routine: `benhursenabathi/Switchy`; local:
  `~/Documents/2025/App Development/Switchy`), verify menu labels, requirements
  and behavior against its source and `Docs/` before writing.
- Switchy 2.0 **Send**: from the Mac you're using, a device's submenu offers
  "Send to <Mac>", and "Send all devices" (shown with 2+ connected devices)
  offers "Send all to <Mac>". Both Macs need Switchy 2.0 on the same local
  network. Say **"desktop Mac"**; use the Mac mini only as an example. Make
  **no claims about sending to a sleeping, locked or logged-out Mac**.
- Price $12.99 one-time, 3-day trial, up to 5 Macs, macOS 14+, Intel and Apple
  silicon. Buy links use the existing Lemon Squeezy checkout URL already in
  every post — never invent a new one.
- Never add aggregateRating schema without real third-party reviews.
- Don't claim anything about competitors you can't verify on their live site.

### 5. Log the week

Append to `docs/seo-log.md` following the existing entry format: date, data
window, site-wide totals, per-page metrics, notable queries with positions,
actions taken/proposed, and any Watching-table updates. This log is the
week-over-week baseline — keep it current even when there's nothing to act on.

### 6. Build, validate, deliver

`npm ci` (if needed) then `npm run build`; parse every JSON-LD block in changed
pages, confirm internal links resolve in `dist/`, and validate the sitemap XML.

- **Interactive:** lead with the trend, then at most three prioritized actions.
  Apply changes only after user approval; commit and push only with the user's
  go-ahead; after deploy, remind them to Request Indexing for new/retitled URLs.
- **Unattended (cloud routine):** do NOT push to main. Commit to a branch
  `seo/weekly-YYYY-MM-DD` and open a PR against main. The PR body leads with
  the trend, lists every change with before/after and the evidence behind it,
  and ends with a "Manual steps after merge" checklist (exact URLs to Request
  Indexing). If no site change is warranted, the PR contains only the log
  entry. If the API or build fails, still open a PR with the log entry
  describing the failure.
