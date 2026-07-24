---
name: switchy-seo
description: Weekly SEO review for the Switchy landing page (mangobuns.com). Parses the user's Google Search Console xlsx exports, finds position-8-20 title-tweak opportunities, flags CTR problems, verifies new pages got indexed, checks site health, and appends trends to docs/seo-log.md. Use when the user runs /switchy-seo, asks for the weekly SEO check/review, or drops fresh GSC export data to analyze.
---

# Switchy Weekly SEO Review

Context: this repo deploys to mangobuns.com via GitHub Actions on push to main
(pushing = production deploy — get user approval before pushing). Canonical
sitemap: https://mangobuns.com/sitemap.xml. Running log + watching list:
`docs/seo-log.md`. Strategy background: `docs/seo-playbook.md`. GSC exports
live in `~/Documents/2026/Get Rich/SEO/Switchy Data/`.

## Workflow

### 1. Parse the GSC data

```bash
python3 .claude/skills/switchy-seo/scripts/parse_gsc.py
```

The script finds the newest Performance export, prints per-page metrics
(with week-over-week deltas for compare exports), position-8-20
opportunities, and CTR flags. If it warns the data is stale (>7 days),
ask the user for a fresh export and pause the analysis:

> In GSC (mangobuns.com property) → Performance → set date to **Last 7 days,
> compare to previous period** → **clear any page filter** → Export → Excel,
> and drop the file into `~/Documents/2026/Get Rich/SEO/Switchy Data/`.

### 2. Site health (automated)

Every sitemap URL must return 200:

```bash
curl -s https://mangobuns.com/sitemap.xml | grep -o '<loc>[^<]*' | cut -c6- | \
  while read -r u; do curl -s -o /dev/null -w "%{http_code}  $u\n" "$u"; done
```

Investigate anything that isn't 200 before proceeding.

### 3. Indexing check for watched URLs

Read the **Watching** table in `docs/seo-log.md`. For each URL, run a
WebSearch for `site:mangobuns.com <slug>`:

- Found → mark it indexed in the log (record the date).
- Not found and added <14 days ago → keep watching, no action.
- Not found and added >=14 days ago → tell the user to re-run URL
  Inspection → Request Indexing in GSC for that exact URL.

### 4. Analyze and propose actions

Apply these rules to the parser output:

- **Position 8-20 with impressions** → one title/meta tweak away from page 1.
  Identify which page ranks (parser Pages section; when ambiguous ask the user
  to export with that query filtered). Propose a specific `<title>`/meta
  description change that front-loads the query phrasing. Show before/after
  and reasoning. Apply only after user approval; never silently.
- **Position <=10, impressions but ~0 clicks** → CTR problem, not ranking.
  Rewrite title/description for click-through (numbers, year, concrete
  benefit), don't chase position.
- **Position improving week-over-week** → leave the page alone; note the trend.
- **Query cluster with impressions but no dedicated page** → propose a new
  post. Pattern: copy the structure of an existing post in `public/blog/`
  (Article + FAQPage + BreadcrumbList JSON-LD, related-links section, same
  inline CSS), then wire it into ALL of: `public/blog/index.html` (hub card),
  `public-root/sitemap.xml` (the ONLY sitemap — `public/sitemap.xml` was
  deleted 2026-07-24; it published a stale orphan duplicate to
  `/switchy/sitemap.xml` that nothing referenced), `public-root/llms.txt`,
  and the IndexNow urlList in `.github/workflows/deploy.yml`.
  Also add at least one **in-prose contextual link** from an existing
  high-impression page — links in the "Related reading" block alone do not
  register as referring pages (see the 2026-07-24 log entry).
- Never add aggregateRating schema without real third-party reviews.

### 4b. Homebrew cask status (until merged, then delete this step)

Check `gh pr view 274395 --repo Homebrew/homebrew-cask --json state,comments`:

- **Merged** → add `brew install --cask switchy` to the site: a small line next to the
  homepage CTA/download link (App.jsx + index.html prerendered header) and in the trial FAQ
  answer; mention it in llms.txt; log it; then remove this step from the skill.
- **Open with new maintainer comments** → summarize them for the user and propose fixes.
- **Closed unmerged** → tell the user; fallback plan (self-hosted tap) is in
  `docs/homebrew-cask-plan.md`.

### 5. Log the week

Append to `docs/seo-log.md` following the existing entry format: date,
per-page metrics, notable queries with positions, actions taken/proposed,
and any Watching-table updates. This log is the week-over-week baseline —
keep it current even when there's nothing to act on.

### 6. Report to the user

Lead with the trend (impressions/position vs last week), then at most three
prioritized actions. If changes were approved and made: build
(`npm run build`), validate, commit, and push only with the user's go-ahead;
after deploy, remind them to Request Indexing for any new/retitled URLs.
