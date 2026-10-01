# Switchy SEO Log

Weekly entries appended by the `/switchy-seo` skill. Newest at the bottom.

## Watching (indexing status)

| URL | Added | Indexed? |
|---|---|---|
| /switchy/blog/ | 2026-07-10 | Yes — 2026-07-20. URL Inspection 2026-10-01: Submitted and indexed, last crawl 2026-08-30; 3 impr, pos 3.0 (22–28 Sep) |
| /switchy/blog/universal-control-vs-switching-devices/ | 2026-07-10 | Yes — 2026-07-20. URL Inspection 2026-10-01: indexed, last crawl 2026-09-06; 40 impr, 3 clicks, pos 7.8 |
| /switchy/blog/kvm-switch-for-two-macs/ | 2026-07-10 | Yes — 2026-07-20. URL Inspection 2026-10-01: indexed, last crawl 2026-09-25; 22 impr, 0 clicks, pos 9.0 |
| /switchy/blog/one-keyboard-mouse-mac-mini-macbook/ | 2026-07-10 | Yes — 2026-07-20. URL Inspection 2026-10-01: indexed, last crawl **2026-08-29** (predates the 2026-10-01 retitle + Send section); 422 impr, 2 clicks, pos 8.6. Snippet test runs to 2026-10-15 |
| /switchy/blog/magic-keyboard-pairing-mode/ | 2026-07-10 | **Yes — 2026-07-24.** URL Inspection 2026-10-01: indexed, last crawl 2026-09-26; 202 impr, 2 clicks, pos 8.8 |
| /switchy/blog/magic-keyboard-multiple-devices/ | 2026-07-10 | **Yes — 2026-07-24.** Retitled 2026-09-14; URL Inspection 2026-10-01: indexed, **recrawled 2026-09-25** (first post-update crawl confirmed); 672 impr, 6 clicks, pos 7.7 |
| /switchy/ (homepage) | 2026-07-10 | Yes — 2026-07-20. URL Inspection 2026-10-01: indexed, last crawl 2026-09-26 (predates the 2026-10-01 softwareVersion/FAQ edit); 49 impr, 10 clicks, pos 4.6 |
| /switchy/blog/mac-mini-without-keyboard-mouse/ | 2026-10-01 | No — URL Inspection 2026-10-01: **Crawled - currently not indexed**, crawled 2026-10-01 20:40 UTC (same day as publish; normal). Request Indexing; re-check ~2026-10-15 |

---

## 2026-07-10 — Baseline + overhaul week

Data: GSC export for 23–29 Jun 2026 (compare vs 16–22 Jun).

**Pages**
- blog/how-to-switch-magic-keyboard-between-macs/: 68 impressions (prev 7, ~10×), 0 clicks, pos 17.2 (prev 19.9). Only page with impressions.

**Notable queries**
- "switch magic keyboard between macs" — pos 10.0 (title-tweak candidate; left alone this week: page climbing on its own + 6 new internal links should push it)
- "magic keyboard pairing mode" — pos 31, top impression query → dedicated post shipped
- "…connect to multiple devices" cluster — pos 26–32 → dedicated post shipped

**Actions taken**
- Full technical SEO pass deployed (em-dash fix, schema 1.1.4, breadcrumbs, unified 11-URL sitemap, OG image 1200×630, 404, llms.txt, IndexNow on deploy).
- 6 new pages live: blog hub + Universal Control, KVM, Mac mini, pairing-mode, multiple-devices posts — all interlinked.
- GitHub repo topics added. GSC sitemap resubmitted + indexing requested (user).
- Homebrew cask investigated → not viable (paid download, no license activation); draft parked in docs/homebrew-cask-switchy.rb.draft.

**Next week: check** new-page indexing, movement on "switch magic keyboard between macs" (was pos 10), first impressions on the two query-gap posts.

---

## 2026-07-10 (later) — Licensing launch content update

App v1.1.4 build 70 shipped licensing: 3-day full-featured trial, Lemon Squeezy license keys, 5-Mac activation limit, pre-license installs grandfathered.

**Content corrections (truthfulness):**
- "Lifetime, unlimited Macs" → "lifetime license for up to 5 Macs" everywhere (homepage FAQ ×2, feature card, compare ×2, 6 blog mentions, llms.txt).
- "No data ever leaves your devices" → accurate wording: switching is local; license activation/validation sends license key + device identifier to Lemon Squeezy; no analytics. Privacy policy rewritten with a Licensing and trial section (Last updated bumped).
- Trial now marketed: new FAQ entry (page + JSON-LD), meta description, blog CTAs → "Try Switchy Free — 3 Days", download link added (header, CTA card, compare).
- Public download live at /switchy/downloads/Switchy.dmg (build 70, notarization verified). NOTE: refresh this file on every stable release.

**Watch next week:** whether trial-first CTAs move blog click-through; homepage CTR once impressions start.

---

## 2026-07-20 — First full site-wide baseline

Data: GSC export for **12–18 Jul 2026** (corrected 2026-07-24 — the entry originally said
14–20 Jul; the file's daily Chart sheet shows 12–18, which is what period alignment should
use. Site-wide totals on that sheet are 399 impr / 7 clicks; the 428 below is the sum of the
Pages sheet, which runs higher because GSC aggregates pages and totals differently.)
(Last 7 days, no page filter, no compare — so no automatic WoW deltas this week; deltas below are vs the 2026-07-10 page-filtered snapshot where comparable).

**Pages (site-wide, 8 with impressions; ~428 impr / 7 clicks total)**
- blog/how-to-switch-magic-keyboard-between-macs/: 255 impr (prev 68, ~3.75×), 3 clicks, pos 17.8 avg (pos ~9.2 on head term "switch magic keyboard between macs")
- compare/: 85 impr, 1 click, pos 5.8
- blog/kvm-switch-for-two-macs/: 38 impr, 0 clicks, pos 6.4 (brand-new page, already page 1)
- blog/universal-control-vs-switching-devices/: 24 impr, 0 clicks, pos 15.1
- /switchy/ (homepage): 18 impr, 2 clicks, pos 2.6 (~11% CTR, healthy)
- blog/ (hub): 5 impr, 1 click, pos 7.6
- mangobuns.com/ (root): 2 impr, 0 clicks, pos 25.5
- blog/one-keyboard-mouse-mac-mini-macbook/: 1 impr, 0 clicks, pos 2.0

**Notable queries**
- Competitor-brand cluster → compare page: "switchmymagic" pos 4.1 (11 impr), "magic device switch" pos 7.4 (11 impr), "magic switch app" pos 9.1, "magic switch" pos 9.4
- "switch magic keyboard between macs" pos 9.2 (6 impr) — how-to page holding page 1 on its head term
- "apple keyboard" phrasing variants ("switch apple keyboard between macs" 20.5, "apple keyboard multiple devices" 30.5, etc.) rank 20–40 — how-to page uses "Magic Keyboard" wording; minor content-gap to note, volumes tiny (1–2 impr each), not acted on

**Indexing:** 5 of 7 watched URLs confirmed indexed via impressions (homepage, blog hub, universal-control, kvm, one-keyboard-mouse). Two still at 0 impr + absent from site: search: magic-keyboard-pairing-mode, magic-keyboard-multiple-devices — re-request indexing on 2026-07-24 if still absent.

**Actions taken**
- compare/ meta description rewritten for CTR (pos 5.8, 85 impr, only 1 click ≈ 1.2% CTR): front-loaded competitor brand names + concrete comparison dimensions + year. Before: "Comparing the best apps to switch Magic Keyboard, Trackpad, and Mouse between Macs. Switchy vs Magic Switch vs SwitchMyMagic vs Universal Control — features, price, and compatibility." After: "Switchy vs Magic Switch vs SwitchMyMagic vs Universal Control: which switches your Magic Keyboard, Trackpad & Mouse between Macs fastest? Compared for 2026." (tightened to ~155 chars so Google doesn't truncate the year hook)

**Left alone (climbing / young):** how-to (pos ~9 head term), kvm (pos 6.4, new), homepage (pos 2.6).

**Proposed, not acted on:** universal-control/ (pos 15.1, page 2) is a title-tweak candidate but its 24 impr aren't tied to a clear query in this export — need a query-filtered export before editing to avoid cannibalizing the how-to page.

**Watch next week:** compare/ CTR after the description change (request re-indexing so Google recrawls the snippet); the two un-indexed posts on 2026-07-24; whether kvm/universal-control keep climbing. Next export: tick "compare to previous period" for clean WoW deltas.

**Homebrew cask PR #274395:** OPEN, mergeable, all CI green (test switchy passes on Intel + ARM), reviewDecision REVIEW_REQUIRED — sitting in the new-cask review queue awaiting a maintainer. Launch-day template bot comment auto-resolved. No action; wait.

---

## 2026-07-24 — Compare-page CTR fix lands; two posts still unindexed at day 14

Data: GSC export "Last 7 days" = **16–22 Jul 2026**. Note: last week's export covered
**12–18 Jul**, so the two exports overlap by 3 days — export-to-export deltas are
contaminated. Clean deltas below come from stitching the daily series of both files
(non-overlapping 4-day windows).

**Trend (clean, daily series)**
| Window | Impressions | Clicks | Avg position |
|---|---|---|---|
| 12–15 Jul (4d) | 290 | 5 | ~15.2 |
| 19–22 Jul (4d) | 214 | 8 | ~12.2 |

Impressions **down ~26%**, clicks **up 60%**, average position **improved ~3 spots**.
Reading: the how-to page shed a block of deep-position (25–40) long-tail impressions
that were never going to convert, while holding and improving on core terms. Position
and clicks moving the right way at the same time says normalisation after the mid-July
impression spike, not a demotion. Confirm next week before treating it as settled.

**Pages (this export vs last export — overlap caveat applies)**
- blog/how-to-switch-magic-keyboard-between-macs/: 200 impr (prev 255), **5 clicks (prev 3)**, **pos 14.3 (prev 17.8)**
- compare/: 72 impr (prev 85), **3 clicks (prev 1)**, pos 6.3 (prev 5.8) — **CTR 1.2% → 4.2%**
- blog/universal-control-vs-switching-devices/: 29 impr (prev 24), 0 clicks, **pos 12.5 (prev 15.1)**
- blog/kvm-switch-for-two-macs/: 26 impr (prev 38), 0 clicks, pos 6.7 (prev 6.4)
- /switchy/ (homepage): 8 impr (prev 18), 0 clicks (prev 2), pos 2.0 (prev 2.6)
- mangobuns.com/ (root): 6 impr (prev 2), 1 click, pos 13.7 (prev 25.5)
- blog/ (hub): 5 impr, 1 click, pos 5.4 (prev 7.6)
- blog/one-keyboard-mouse-mac-mini-macbook/: 2 impr, 0 clicks, pos 12.0
- privacy/: 1 impr, 0 clicks, pos 5.0 (first appearance)

**Notable queries**
- Competitor-brand cluster → compare/: "magic device switch" pos 7.4 (10 impr, top query this week),
  "magic switch mac" pos 6.9 (8 impr, was 1 impr/pos 6.0), "magic switch app" pos 9.0 (5 impr),
  "switchmymagic" pos 4.7 (3 impr), "magic switch" pos 11.0. ~27 impr at pos 4.7–11 → 3 clicks.
- "switch magic keyboard between macs" pos 10.2 (5 impr, 1 click) — head term, prev pos 9.2. Sample too small to read as movement.
- "discoverable" cluster at pos 29–34 ("how to make a mac keyboard discoverable", "make mac keyboard
  discoverable", "how to make apple keyboard discoverable"). This is *exactly* what the unindexed
  magic-keyboard-pairing-mode post targets — another page is taking these at page 3. Indexing that
  post is the unlock, not new content.
- The pos 20–40 "apple keyboard" phrasing variants logged on 2026-07-20 largely dropped out this week.

**Site health:** all 11 sitemap URLs return 200. robots.txt allows all crawlers on `/`
(Content-Signal search=yes). AI-training bots blocked — no effect on Search indexing.

**Indexing:** magic-keyboard-pairing-mode and magic-keyboard-multiple-devices are at **day 14**
with 0 impressions and still absent from site: search. Diagnosed — not a site defect: both return
200, carry `<meta name="robots" content="index, follow">`, self-canonical correctly, sit in the
sitemap, and each has 3 inbound internal links (more than one-keyboard-mouse-mac-mini-macbook,
which *is* indexed on 2). This is Google's crawl queue, so the fix is manual Request Indexing.

**Indexing diagnosis (GSC URL Inspection → Google Index tab, 2026-07-24).** Both URLs return
**"Page is not indexed: Crawled – currently not indexed"**. Key fields:
- Last crawl 24 Jul 2026 20:28, crawled as Googlebot smartphone, crawl allowed **Yes**, page fetch **Successful**
- **Referring page: None detected**
- **Google-selected canonical: N/A** — Google is *not* folding these into the how-to page
- Sitemaps: "Temporary processing error" (transient GSC noise; live sitemap is HTTP 200, `application/xml`, well-formed, 11 URLs)

This kills the near-duplicate theory floated earlier in this entry: if Google had judged them
duplicates it would name a chosen canonical, and it doesn't. "Crawled – currently not indexed"
means Google fetched the pages and declined to index on perceived value. The operative signal is
**Referring page: None detected** — corroborated by a link audit showing the how-to page's only
in-body links were 4× `/switchy/` and 1× `/switchy/compare/`, with *zero* in-body links to any blog
post. Every link to these two posts sat in the boilerplate "Related reading" block in the final 8%
of the page, which Google evidently discounts. So the pages had: no referring pages Google counts,
547–570 words (thinnest on the site), and topical overlap with a page that already ranks.
(Caveat: GSC's referring-page field is documented as incomplete — "URL might be known from other
sources that are currently not reported" — so treat it as strong corroboration, not proof.)

**Actions taken:** added **7 in-prose contextual internal links** across the three pages that carry
authority, all inside article body copy rather than the related-links block:

| Target | From | Anchor text |
|---|---|---|
| magic-keyboard-multiple-devices | how-to (200 impr) | "pair with one Mac at a time" (opening premise) |
| magic-keyboard-multiple-devices | compare/ (72 impr) | "pair with one device at a time by design" (intro) |
| magic-keyboard-multiple-devices | blog hub | "why Magic accessories only pair with one device at a time" |
| magic-keyboard-pairing-mode | how-to | "pairing mode" (new sentence in Method 1) |
| magic-keyboard-pairing-mode | compare/ | "become discoverable again" (intro) |
| magic-keyboard-pairing-mode | blog hub | "how to make one discoverable" |
| universal-control-vs-switching-devices | how-to | "Here's the fuller comparison of sharing versus switching" |

Anchor text deliberately varied, and the "discoverable" anchors target the pos-29–34 cluster
("how to make a mac keyboard discoverable") that the pairing-mode post is written for. The Method 1
addition on the how-to page is genuinely useful copy, not a link stub. HTML validated, build clean.
IndexNow already lists all 11 URLs, so deploy pings it automatically.

**Deliberately NOT changed this week:**
- compare/ **title and meta description** left alone. They were rewritten on 2026-07-20 and only ~2
  of the 7 days in this window had the new snippet live; early read is positive (CTR 1.2% → 4.2%),
  so we want a clean week rather than churning the snippet. Note the page's *intro body copy* did
  change (two in-prose links added above) — that doesn't affect the SERP snippet being measured.
- universal-control-vs-switching-devices/ was last week's title-tweak candidate. It improved on its
  own (15.1 → 12.5, impressions up) → rule says leave climbing pages alone. Candidacy withdrawn.
- how-to page climbing (17.8 → 14.3) → left alone.

**Proposed, not acted on:** the compare/ competitor-brand cluster still converts poorly
("magic device switch" 10 impr at pos 7.4 with 0 clicks). Below the automated CTR-flag threshold
(20 impr on a single query) and the page was just edited — revisit 2026-07-31 with a clean week
of data before touching the title.

**User action taken:** Request Indexing submitted for both URLs on 2026-07-24 (before the internal
linking shipped). Re-request after this deploy so Google re-crawls with the new referring links in
place — that is the change we actually want it to re-evaluate.

**RESOLVED same day — both posts indexed.** Deployed the internal links to main (`3da794f`, GH
Actions run 30121654712 green, IndexNow pinged, all 7 links verified live in-body). GSC URL
Inspection then returned **"URL is on Google / Page is indexed"** for *both* URLs on 2026-07-24 —
14 days after publication and hours after the "Crawled – currently not indexed" verdict.

*Attribution now leans to the Request Indexing, not the links.* Local timezone is **+0100**
(confirmed independently from an appcast `pubDate` stamped the same evening), so GSC's "Last crawl
24 Jul 2026, 20:28:25" = **19:28 UTC** — roughly 19 minutes *before* the deploy completed at 19:47
UTC. The crawl on record when Google flipped these to indexed therefore predates the internal links
going live. Ordering is corroborated by the session itself: the Live Test screenshot stamped 20:29
local was taken before the deploy. Google may have re-crawled after the IndexNow ping, so this
isn't airtight, but the honest read is that **Request Indexing did the work here** and the links
were a real fix for a real defect that probably didn't cause *this* indexing event. Also
worth recording: the 2026-07-24 prediction that multiple-devices would *not* index without content
differentiation was **wrong** — it indexed with the same content. Treat "Crawled – currently not
indexed" as a softer, more recoverable state than assumed, especially on a young site.

Indexed is the floor, not the goal: both pages are now *eligible* to appear, with zero impressions
so far. The real signal is first impressions in the 2026-07-31 export.

**Still open (proposed 2026-07-24, not done):**
1. Differentiate magic-keyboard-multiple-devices. **Priority downgraded** — no longer needed to get
   indexed. Still worth doing as a *ranking* concern: it and the how-to page target overlapping
   queries with the same four methods in the same order, so they risk splitting relevance rather
   than one page ranking well. Add the Logitech multi-device comparison its own meta description
   already promises, plus trackpad/mouse specifics to target "magic trackpad multiple devices"
   (pos 10.0). Both posts are also the shortest on the site (547/570 words) and could stand to grow.
   Revisit once there's impression data showing which queries each page actually attracts.
2. ~~Sitemap drift~~ **DONE 2026-07-24.** Investigation showed this wasn't drift between two copies
   of one file — the repo was publishing **two live sitemaps**: `mangobuns.com/sitemap.xml` (11 URLs,
   canonical, referenced by both robots.txt files) and `mangobuns.com/switchy/sitemap.xml` (10 URLs,
   stale, referenced by nothing). `public/` is Vite's public dir, so `public/sitemap.xml` shipped
   into `/switchy/`. Deleted `public/sitemap.xml` rather than syncing it — syncing maintains two
   copies forever and the drift recurs. `public-root/sitemap.xml` is now the single source of truth.
   Also updated `.claude/skills/switchy-seo/SKILL.md`, which instructed future runs to edit the
   now-deleted file, and added the in-prose-link lesson from this week to its new-post checklist.
   **GSC check completed 2026-08-01 — clean, nothing to remove.** Sitemaps report shows exactly one
   row: `https://mangobuns.com/sitemap.xml`, submitted 10 Jul 2026, last read 30 Jul 2026, status
   **Success**, 11 discovered pages. The `/switchy/` duplicate was never submitted to GSC, so
   deleting the file was the entire fix. This also resolves the "Temporary processing error" seen
   on 2026-07-24 — transient GSC noise, as diagnosed at the time, cleared without intervention.

**Watch next week:** **first impressions on the two newly-indexed posts** (they're in the index but
have never had one — if they're still at 0 impr on 2026-07-31, indexing wasn't the real ceiling and
the content/differentiation work moves back up the list); whether the impression decline continues
or flattens; compare/ CTR over a full clean week; universal-control breaking into page 1; whether
the "discoverable" cluster (pos 29–34) shifts to the pairing-mode post now that it can rank.
Next export: tick **"compare to previous period"** and keep the window aligned to avoid overlap.

**Homebrew cask PR #274395:** still OPEN, all 12 CI checks green (test switchy passes on Intel +
ARM), label `new cask`, not draft, reviewDecision REVIEW_REQUIRED, no new comments since the
auto-resolved template bot on 2026-07-10 (last update 2026-07-11). Two weeks in the new-cask review
queue. No action available; wait.

---

## 2026-08-01 — Indexing was the ceiling: impressions +154% in one week

**Window:** 2026-07-23 → 2026-07-29, vs 2026-07-16 → 2026-07-22. **No overlap** — first clean
week-over-week read since the log started. (Export still had "compare to previous period" unticked,
so deltas below are computed by stitching the two exports, not read from the file.)

**Site-wide:** impressions **323 → 820 (+154%)**, clicks **10 → 17 (+70%)**, weighted avg position
**11.5 → 17.1**.

The position number looks like a demotion and isn't. It is arithmetic: two pages that had *never*
had an impression entered the index on 2026-07-24 and immediately pulled 288 impressions at pos
18.4 and 30.7, dragging the site-wide mean down. Excluding those two pages, position moved
11.5 → 13.6, and essentially all of that residual is the how-to page (below).

### Per page (impressions / clicks / position)

| Page | Last wk | This wk | Pos |
|---|---|---|---|
| blog/how-to-switch-magic-keyboard-between-macs/ | 200 / 5 | **294 / 2** | 14.29 → **18.36** |
| blog/magic-keyboard-multiple-devices/ | 0 / 0 | **160 / 1** | — → 18.37 |
| compare/ | 72 / 3 | **132 / 9** | 6.26 → 6.77 |
| blog/magic-keyboard-pairing-mode/ | 0 / 0 | **128 / 0** | — → 30.70 |
| blog/universal-control-vs-switching-devices/ | 29 / 0 | 56 / 0 | 12.48 → **10.50** |
| blog/one-keyboard-mouse-mac-mini-macbook/ | 2 / 0 | 42 / 0 | 12.00 → **10.38** |
| blog/kvm-switch-for-two-macs/ | 26 / 0 | **18 / 0** | 6.73 → **8.17** |
| switchy/ (homepage) | 8 / 0 | 12 / 5 | 2.00 → 1.50 |
| blog/ (hub) | 5 / 1 | 5 / 0 | 5.40 → 19.00 |
| / (root) | 6 / 1 | 5 / 0 | 13.67 → 23.00 |

**Last week's open question is answered.** The 2026-07-24 entry set the test explicitly: "if they're
still at 0 impr on 2026-07-31, indexing wasn't the real ceiling." They went **0 → 288 impressions**.
Indexing *was* the ceiling. The two-week block on those posts was the single largest constraint on
the site, and clearing it roughly doubled site-wide impressions on its own.

**compare/ CTR rewrite is confirmed.** Third data point on the 2026-07-20 title/meta change, now
with a full clean week: CTR 1.2% → 4.2% → **6.8%**, clicks 3 → **9**. This page produces 53% of all
site clicks from 15% of impressions. Do not touch its title again without a strong reason.

### Notable queries

- **"Apple keyboard" phrasing gap (actionable).** The pairing-mode post ranks pos **9–29** for
  *"magic keyboard"* phrasings of an intent and pos **34–55** for the *"apple keyboard" /
  "apple wireless keyboard" / "apple bluetooth keyboard"* phrasings of the *same* intent —
  17 such queries, ~25 impressions, e.g. "how to make apple wireless keyboard discoverable" (50.7),
  "how to pair apple bluetooth keyboard" (54.5), "apple keyboard pairing" (34.5), "pair apple
  keyboard" (41.0). Cause is direct: the string "Apple keyboard"/"Apple wireless keyboard" appears
  **zero times** in the page body, title, description, or keywords. Same intent, ~20-position gap,
  purely vocabulary. This cluster was first flagged 2026-07-20, faded 2026-07-24, and is back larger.
- **Competitor-brand cluster converts at 0%.** "magic switch mac" 25 impr / pos 7.3 / **0 clicks**
  (fires the automated CTR flag), plus "magic device switch" 11 @ 7.5, "magic switch app" 8 @ 9.4,
  "magic switch" 7 @ 7.9, "switchmymagic" 6 @ 3.7, "magicswitch" 2 @ 12.5 — **~59 impressions,
  0 clicks**, all page 1. Inferred to land on compare/ (only competitor-targeting page; its 6.77
  average matches the cluster). Backing that out, compare/'s remaining ~73 impressions produced all
  9 clicks — a **12% CTR** on its intended queries.
- **Magic Trackpad cluster, unclaimed.** "magic trackpad multiple devices" (14.5), "apple magic
  trackpad connect to multiple devices" (11.0), "magic trackpad connect to multiple devices" (1.0),
  "magic trackpad pairing mode" / "magic trackpad pairing" / "apple magic trackpad pairing mode"
  (all 19.0), "how to pair magic trackpad" (37.0). ~8 impressions — too thin for its own post,
  but exactly the differentiation angle already queued for multiple-devices and pairing-mode.
- "how to make magic keyboard discoverable" pos 15.2 (4 impr) — the pairing-mode post's head term,
  now clearly attached to the right page but still page 2.

**Site health:** all 11 sitemap URLs return 200. Single canonical sitemap confirmed still in place
after last week's `public/sitemap.xml` deletion.

**Indexing:** Watching table is now **fully green** — every listed URL is indexed. The two
2026-07-24 additions are confirmed not just indexed but *serving*, which is a stronger signal than
`site:` search. No URLs currently pending.

**Actions taken:** rewrote and roughly tripled the two thinnest posts — the same two that just
proved their demand. Neither was touched on 2026-07-24, so this doesn't disturb any measurement in
flight.

**1. `magic-keyboard-pairing-mode` — 550 → 1,359 words.** Closes the vocabulary gap that was
costing ~20 positions. Changes:
- Title `Magic Keyboard Pairing Mode…` → **`Apple Magic Keyboard Pairing Mode — How to Make It
  Discoverable (2026)`**; meta description, og tags, and keywords now carry "Apple Wireless
  Keyboard" / "pair apple bluetooth keyboard" / "make apple keyboard discoverable".
- New section on the **pre-2015 Apple Wireless Keyboard (A1314)** — press-and-hold power button,
  blinking green LED, AA batteries, and crucially *no charging port*, so the cable shortcut this
  site recommends everywhere doesn't apply to it. Real content gap, not keyword insertion: the
  advice on the rest of the page was actively wrong for that model.
- New section on **Magic Trackpad and Magic Mouse** switch/port locations, targeting the pos-19
  trackpad pairing cluster.
- Intro now explains the Apple Wireless Keyboard → Magic Keyboard rename (2015), which is *why*
  the two vocabularies exist and why searchers use them interchangeably.
- Added a **visible FAQ** (6 questions). The FAQPage schema previously had no on-page counterpart,
  which is a structured-data guideline violation — now fixed, and it absorbs the "apple keyboard"
  question phrasings directly.

**2. `magic-keyboard-multiple-devices` — 533 → 1,442 words, restructured to stop competing with the
how-to page.** The near-identical positions (18.37 vs 18.36) and the identical four-methods-in-the-
same-order structure were the problem. Fix was *subtraction as much as addition*: the four
workarounds are now a compressed four-bullet summary that defers to the how-to guide for steps,
freeing the page to own what only it can:
- **Full Logitech Easy-Switch comparison** — the one its meta description has been promising since
  July. Seven-row table (MX Keys / MX Keys Mini / K380), plus Logitech Flow as the cross-account
  answer to Universal Control, and an honest "Easy-Switch is genuinely better at this" paragraph.
- **Dedicated Trackpad/Mouse/Touch-ID section** claiming the unowned trackpad cluster.
- **New cross-platform section** (iPad, Apple TV, Windows, Android) covering modifier remapping and
  the fact that multi-touch gestures don't survive off macOS — targets "can an apple magic keyboard
  connect to android" (pos 49).
- Corrected a factual point the old version implied: one-pairing-at-a-time is **not** a Bluetooth
  limitation. The protocol supports multiple bonded hosts — competing keyboards use that. It's an
  Apple firmware decision. Being right about this is also what makes the Logitech comparison land.
- Added a **visible FAQ** (5 questions), same schema-compliance fix as above.

Blog hub cards updated for both. HTML validated, all JSON-LD parses, all internal links resolve,
build clean. IndexNow already lists both URLs, so deploy pings automatically.

**Deliberately NOT touched: the how-to page.** Impressions +47% but position 14.29 → 18.36 and
clicks 5 → 2 (CTR 2.5% → 0.68%). Two readings fit: benign long-tail expansion (more queries, worse
average) or genuine cannibalization by the two siblings that indexed *inside this window*. Site-wide
daily position degraded from 11.7 to ~18 immediately after 2026-07-24, consistent with either. It
cannot be separated from a site-wide export — needs a **page-filtered query export** for the how-to
page across both windows. Editing it blind risks breaking the site's biggest page. Note that this
week's restructure of multiple-devices is itself a partial treatment: if the two *were* cannibalizing,
pushing them onto different queries should show up as the how-to page recovering.

**Deliberately NOT doing:**
- **compare/ title/meta — no change, despite the CTR flag firing on "magic switch mac."** The flag
  is a false positive here. The page's overall CTR *rose* (4.2% → 6.8%) and clicks tripled in the
  same week. The 0-click cluster is competitor-brand navigational intent — someone searching
  "magic switch mac" wants Magic Switch, and a "Switchy vs …" result is correctly ignored. Rewriting
  the snippet to chase those ~59 impressions would risk the 12% CTR on the queries that actually
  convert. Revisit only if non-brand CTR falls.
- **universal-control-vs-switching-devices/** — 12.48 → 10.50 with impressions nearly doubled.
  Second consecutive week the "improving → leave alone" rule applies. Knocking on page 1.
- **one-keyboard-mouse-mac-mini-macbook/** — 2 → 42 impressions, 12.0 → 10.38. Climbing; leave.
- **New posts** — no query cluster is yet large enough to justify one. The trackpad cluster (~8
  impr) belongs inside existing posts, not in a thin new page.

**Watch next week:** whether the how-to page's position recovers once the two new siblings settle
(if it stays ~18 while they hold ~18, that's cannibalization, and consolidation becomes the play);
first clicks on pairing-mode; kvm-switch, the only decliner (26 → 18 impr, 6.73 → 8.17) — small
numbers, but the only page moving the wrong way on both axes; whether compare/'s non-brand CTR holds
near 12%. Next export: **tick "compare to previous period"** (missed again this week).

**Homebrew cask PR #274395:** still OPEN, not draft, reviewDecision REVIEW_REQUIRED, no new comments
since the auto-resolved template bot on 2026-07-10; last update 2026-07-11 — **three weeks** with no
maintainer movement. Unchanged from last week. No action available; wait.

---

## 2026-08-08 — Clicks nearly doubled as impressions normalize

**Data:** GSC export `mangobuns.com-Performance-on-Search-2026-08-08.xlsx`, 2026-07-31 →
2026-08-06, compared with the previous export's clean window 2026-07-23 → 2026-07-29. The
windows do not overlap. Site-wide totals below use the Search Console Chart sheet; its daily
average position is not the same measure as a weighted page average.

**Site-wide:** impressions **820 → 575 (-30%)**, clicks **17 → 32 (+88%)**, and CTR roughly
**2.1% → 5.6%**. Daily chart average position was broadly flat/slightly better at about
**16.6 → 15.8**. This looks like the post-indexing spike settling while qualified traffic
improves, not a broad ranking collapse.

### Per page (impressions / clicks / position)

| Page | Previous | Current |
|---|---:|---:|
| /switchy/compare/ | 132 / 9 / 6.77 | **150 / 13 / 6.1** |
| /switchy/ | 12 / 5 / 1.50 | **51 / 13 / 3.2** |
| /switchy/blog/how-to-switch-magic-keyboard-between-macs/ | 294 / 2 / 18.36 | **320 / 4 / 18.4** |
| /switchy/blog/magic-keyboard-multiple-devices/ | 160 / 1 / 18.37 | **38 / 1 / 16.7** |
| /switchy/blog/magic-keyboard-pairing-mode/ | 128 / 0 / 30.70 | **37 / 0 / 33.5** |
| /switchy/blog/universal-control-vs-switching-devices/ | 56 / 0 / 10.50 | **11 / 0 / 12.3** |
| /switchy/blog/one-keyboard-mouse-mac-mini-macbook/ | 42 / 0 / 10.38 | **13 / 0 / 9.6** |
| /switchy/blog/kvm-switch-for-two-macs/ | 18 / 0 / 8.17 | **5 / 0 / 9.2** |
| /switchy/blog/ | 5 / 0 / 19.00 | **3 / 0 / 2.7** |
| / | 5 / 0 / 23.00 | **21 / 0 / 9.8** |
| /switchy/privacy/ | 0 / 0 / — | **2 / 1 / 5.0** |

**What is working:** compare/ generated 13 clicks at position 6.1, up from 9 clicks at 6.77;
the homepage grew from 12 to 51 impressions and from 5 to 13 clicks while remaining in the
top three. Leave both pages alone. The one-keyboard page also improved to position 9.6, despite
lower volume.

**Main opportunity:** the how-to page remains the largest page-2 opportunity at **320
impressions, 4 clicks, position 18.4**. Its page-filtered export confirmed related intent around
switching a Magic Keyboard between devices, multiple Macs, and Apple devices. The visible query
rows are sparse (18 listed impressions versus 320 page impressions), so this is a conservative
snippet test rather than a content rewrite. Applied 2026-08-08:

- Before title: `How to Switch Magic Keyboard Between Macs (2026 Guide)`
- New title: `How to Switch Magic Keyboard Between Macs: 3 Methods (2026)`
- New description: `Learn how to switch an Apple Magic Keyboard, Trackpad, or Mouse between two Macs. Compare Bluetooth re-pairing, Universal Control, and one-click switching with practical steps.`

The title accurately reflects the article's three methods and front-loads the existing head term;
the description adds the Apple/device vocabulary visible in the filtered queries. The visible H1
was aligned to the new title; no URL or substantive body content was changed.

**Notable queries:** the current competitor-name cluster is small and mostly non-converting:
`magic switch` (13 impressions, position 8.5, 0 clicks), `magic switch mac` (10, 6.8, 1),
`switchmymagic` (9, 2.7, 0), `magic device switch` (7, 8.7, 1), and `magic switch app` (4, 8.8,
0). No individual query met the parser's CTR-flag threshold. Long-tail terms around switching a
Magic Keyboard between devices are present but thin (1–2 impressions each), so they do not yet
justify a new post.

**Indexing:** all watched URLs remain indexed and are serving impressions. Direct `site:` searches
found the established pages; the pairing-mode and multiple-devices pages are also confirmed
serving by current GSC data. No URL Inspection requests are needed.

**Site health:** all 11 URLs in `https://mangobuns.com/sitemap.xml` returned HTTP 200.

**Actions taken:** Homebrew cask PR **#274395 is MERGED**. Added `brew install --cask switchy`
to the homepage CTA area and prerendered header, the trial FAQ (visible text and FAQ schema),
and `public-root/llms.txt`. Updated the cask plan status and removed the temporary Homebrew
check from the SEO skill. Applied the how-to page's title/meta update; no new post was added.

**Watch next week:** whether the updated snippet improves the how-to page's CTR and position;
whether pairing-mode stabilizes after its 128 → 37 impression drop; and whether compare/ maintains
its improved click volume. Keep the next export comparison enabled and aligned to the prior clean
window.

---

## 2026-08-16 — Referral-parameter canonical is healthy; visibility expands sharply

**Data:** GSC Performance export
`https___mangobuns.com_switchy_-Performance-on-Search-2026-08-16.xlsx`, covering 2026-08-08 →
2026-08-14, plus Coverage Drilldown export
`https___mangobuns.com_switchy_-Coverage-Drilldown-2026-08-16.xlsx`. The performance window follows
the previous export's 2026-07-31 → 2026-08-06 window without overlap; 7 Aug is not represented.

**Site-wide:** impressions **575 → 1,361 (+137%)**, clicks **32 → 26 (-19%)**, CTR **5.6% →
1.9%**, and the impression-weighted daily position improved from roughly **15.8 → 11.6**. The CTR
drop is visibility mix, not an indexing loss: the multiple-devices and pairing-mode pages alone
added 603 impressions week over week at positions 11.3 and 17.0, but only one click. Nearly half of
this week's impressions now come from those two rapidly expanding, not-yet-top-result pages.

### Per page (impressions / clicks / position)

| Page | Previous | Current |
|---|---:|---:|
| /switchy/blog/how-to-switch-magic-keyboard-between-macs/ | 320 / 4 / 18.4 | **484 / 8 / 12.1** |
| /switchy/blog/magic-keyboard-multiple-devices/ | 38 / 1 / 16.7 | **383 / 1 / 11.3** |
| /switchy/blog/magic-keyboard-pairing-mode/ | 37 / 0 / 33.5 | **258 / 0 / 17.0** |
| /switchy/compare/ | 150 / 13 / 6.1 | **149 / 10 / 6.3** |
| /switchy/blog/one-keyboard-mouse-mac-mini-macbook/ | 13 / 0 / 9.6 | **66 / 0 / 8.9** |
| /switchy/ | 51 / 13 / 3.2 | **46 / 7 / 3.5** |
| /switchy/blog/universal-control-vs-switching-devices/ | 11 / 0 / 12.3 | **40 / 0 / 8.7** |
| /switchy/blog/kvm-switch-for-two-macs/ | 5 / 0 / 9.2 | **25 / 0 / 8.8** |
| /switchy/blog/ | 3 / 0 / 2.7 | **3 / 1 / 2.7** |
| /switchy/privacy/ | 2 / 1 / 5.0 | **4 / 0 / 6.5** |

**The 2026-08-08 how-to snippet test is working.** Impressions rose 51%, clicks doubled, and
position improved by 6.3 places (18.4 → 12.1) in its first full measured week. Leave it alone.
Multiple-devices and pairing-mode also improved by 5.4 and 16.5 places respectively while their
visibility surged; under the "improving → leave alone" rule, do not churn either snippet yet.

**Coverage alert diagnosed — no defect.** The sole excluded URL is
`https://mangobuns.com/switchy/?ref=producthunt`, first appearing in the report on 8 Aug and last
crawled on 11 Aug. It returns HTTP 200 with `index, follow` and correctly declares
`https://mangobuns.com/switchy/` as canonical. The clean homepage is indexed, is the only version
in the sitemap, and generated 46 impressions / 7 clicks this week. The parameterized URL is an
external referral variant, not a separate page that should enter the index; GSC's "Alternative
page with proper canonical tag" exclusion is the intended outcome. Validation was started, but
there is nothing to fix and a failed validation would not indicate damage.

**Site health:** all 11 canonical sitemap URLs return HTTP 200. No internal link contains
`ref=producthunt`; the live parameter URL's canonical matches the source `index.html` canonical.

**Notable queries:** `magic switch` is the only automated CTR flag (22 impressions, position 8.7,
0 clicks), but it remains competitor-brand navigational intent and the compare page's overall CTR
is still healthy at 6.7%. Do not rewrite its snippet. `magic keyboard pairing mode` is now position
12.1 on 14 impressions; the page is already climbing quickly after the 1 Aug rewrite, so wait.

**Actions taken:** recorded the diagnosis only. No production code or SEO content change is
warranted; no deploy or indexing request is needed.

**Watch next week:** whether multiple-devices converts as it crosses page 1, whether pairing-mode
continues toward the top 10, and whether the how-to improvement holds. For the next performance
export, enable **Compare → Previous period** so page/query deltas are present in the workbook.

---

## 2026-08-29 — Page-one visibility broadens; multiple-devices is the CTR bottleneck

**Data:** GSC Performance export `mangobuns.com-Performance-on-Search-2026-08-29.xlsx`, covering
2026-08-21 → 2026-08-27. The workbook was exported as **Last 7 days** without comparison columns.
The nearest prior window is 2026-08-08 → 2026-08-14, leaving 15–20 Aug unrepresented, so the
changes below are directional rather than a clean week-over-week comparison.

**Site-wide:** impressions **1,361 → 1,470 (+8%)**, clicks **26 → 33 (+27%)**, CTR **1.9% →
2.2%**, and impression-weighted daily position improved from roughly **11.6 → 8.2**. The site is
now broadly on page one: compare, how-to, multiple-devices, Universal Control, KVM, Mac mini, and
the homepage all average positions 3.8–8.8; pairing-mode is just outside at 10.3.

### Per page (impressions / clicks / position)

| Page | Prior available (8–14 Aug) | Current (21–27 Aug) |
|---|---:|---:|
| /switchy/blog/magic-keyboard-multiple-devices/ | 383 / 1 / 11.3 | **608 / 1 / 8.3** |
| /switchy/blog/how-to-switch-magic-keyboard-between-macs/ | 484 / 8 / 12.1 | **345 / 8 / 8.8** |
| /switchy/compare/ | 149 / 10 / 6.3 | **245 / 13 / 7.0** |
| /switchy/blog/magic-keyboard-pairing-mode/ | 258 / 0 / 17.0 | **153 / 2 / 10.3** |
| /switchy/blog/one-keyboard-mouse-mac-mini-macbook/ | 66 / 0 / 8.9 | **69 / 0 / 8.3** |
| /switchy/blog/universal-control-vs-switching-devices/ | 40 / 0 / 8.7 | **58 / 1 / 8.6** |
| /switchy/blog/kvm-switch-for-two-macs/ | 25 / 0 / 8.8 | **27 / 1 / 6.9** |
| /switchy/ | 46 / 7 / 3.5 | **29 / 5 / 3.8** |
| /switchy/blog/ | 3 / 1 / 2.7 | **5 / 0 / 3.8** |
| /switchy/privacy/ | 4 / 0 / 6.5 | **7 / 0 / 6.3** |

**Primary SEO opportunity: multiple-devices is now a snippet/CTR problem, not a ranking
problem.** It produced the most page impressions on the site (**608**) at position **8.35**, but
only one click (**0.16% CTR**). Its visible query cluster is also on page one: “can magic keyboard
connect to multiple devices” (8 impressions, position 8.2), “magic keyboard multiple macs” (5,
9.2), and related variants at positions 5.5–11. The page's answer-first copy is useful, but the
current snippet gives little reason to click beyond the yes/no answer.

**Proposed title/meta test — pending user approval; not applied:**

- Before title: `Can a Magic Keyboard Connect to Multiple Devices? (Trackpad & Mouse Too)`
- Proposed title: `Magic Keyboard on Multiple Devices: 4 Ways to Switch Macs (2026)`
- Proposed description: `A Magic Keyboard pairs with one Mac at a time—but four methods let you use it across Macs. Compare cables, Universal Control and one-click switching.`

This front-loads the demonstrated query phrasing, adds a concrete four-method reason to click, and
qualifies the result around Macs rather than chasing the 15-impression Android query, which is less
likely to convert for a macOS-only product.

**Primary conversion opportunity:** multiple-devices and how-to generated **953 page impressions**
between them and are now both on page one. Proposed first rollout: add one trial-first contextual
CTA to each, immediately after the reader recognizes the repeated-pairing cost. On
multiple-devices, place it after the paragraph explaining that three accessories mean three trips
through Bluetooth settings; on how-to, place it after the paragraph explaining that manual
switching means three rounds of the process. Keep the instructional answer before the CTA, link the
primary action directly to the free three-day trial, and retain purchase as a secondary/end action.
No CTA was added this week because the request was analysis/brainstorming, not implementation.

**Leave the climbing pages alone:** how-to improved from 12.1 to 8.8 and held eight clicks despite
lower impressions; pairing-mode improved from 17.0 to 10.3 and earned its first two clicks;
Universal Control and KVM earned their first clicks while holding/improving page-one positions.
Compare remains healthy at 13 clicks and 5.3% CTR. The “magic switch” query (65 impressions,
position 9.5, one click) is still competitor-brand navigational intent, so do not rewrite compare's
successful snippet to chase it.

**Mac mini page:** 69 impressions, position 8.3, zero clicks is a second CTR concern, but the global
query export does not identify its query mix. Get a page-filtered query export before changing its
already-specific title. **No new post proposed this week:** the Android query is product-misaligned,
while the visible Magic Trackpad and Magic Mouse clusters remain too small to justify dedicated
pages yet.

**Site health and indexing:** all 11 canonical sitemap URLs return HTTP 200. Every URL in the
Watching table is confirmed serving by current GSC impressions; no indexing requests are needed.

**Actions taken:** logged the fresh baseline and proposals only. No production code, title, meta,
or content change was made. The sitemap's article `lastmod` values remain at 2026-07-10 despite
August edits; refresh them accurately with the next approved content deploy.

**Watch next week:** multiple-devices CTR, how-to holding page one, pairing-mode crossing into the
top 10, and the Mac mini page's query mix. Export **Last 7 days → Compare → Previous period** next
time so deltas are clean and included directly in the workbook.

---

## 2026-09-13 — Visibility grows 25%; clicks fall as compare loses seven clicks

**Data:** fresh GSC Performance export `mangobuns.com-Performance-on-Search-2026-09-13.xlsx`,
covering **2026-09-05 → 2026-09-11**, with Web search, Last 7 days, no page filter, and no comparison
columns. Prior available export: `mangobuns.com-Performance-on-Search-2026-08-29.xlsx`, covering
**2026-08-21 → 2026-08-27**. The eight days from 28 Aug through 4 Sep are unrepresented. These are
equal-length, non-consecutive windows with different weekday alignment, not a clean week-over-week
comparison. The file dates are export dates; the reporting dates were checked against Chart rows.

**Site-wide:** impressions **1,470 → 1,841 (+25.2%)**, clicks **33 → 28 (-15.2%)**, CTR
**2.24% → 1.52%**, and approximate impression-weighted daily position **8.24 → 7.71**.
Totals come from Chart, not the Pages or Queries sums. The Pages sheet totals 1,919 impressions
and 28 clicks; the visible Queries sheet totals only 277 impressions and 6 clicks. Page and site
aggregation differ, and the listed queries are incomplete, so neither sum replaces the site total.
Average position is reconstructed from rounded daily values and can also change with query mix.

### Per page (impressions / clicks / position)

| Page | Prior available (21–27 Aug) | Current (5–11 Sep) |
|---|---:|---:|
| /switchy/blog/magic-keyboard-multiple-devices/ | 608 / 1 / 8.35 | **752 / 1 / 7.90** |
| /switchy/blog/how-to-switch-magic-keyboard-between-macs/ | 345 / 8 / 8.79 | **497 / 11 / 7.51** |
| /switchy/compare/ | 245 / 13 / 6.99 | **247 / 6 / 7.26** |
| /switchy/blog/magic-keyboard-pairing-mode/ | 153 / 2 / 10.30 | **217 / 2 / 9.22** |
| /switchy/blog/one-keyboard-mouse-mac-mini-macbook/ | 69 / 0 / 8.26 | **83 / 1 / 8.10** |
| /switchy/blog/universal-control-vs-switching-devices/ | 58 / 1 / 8.64 | **53 / 0 / 7.40** |
| /switchy/ | 29 / 5 / 3.76 | **39 / 6 / 3.31** |
| /switchy/blog/kvm-switch-for-two-macs/ | 27 / 1 / 6.93 | **20 / 0 / 8.70** |
| / | 10 / 2 / 1.50 | **10 / 1 / 7.60** |
| /switchy/privacy/ | 7 / 0 / 6.29 | **1 / 0 / 6.00** |
| /switchy/blog/ | 5 / 0 / 3.80 | Not listed |

**The click decline is concentrated in compare/.** Its impressions are effectively flat
(245 → 247), but clicks fall 13 → 6 and CTR **5.31% → 2.43%**, with only a small change in average
position (6.99 → 7.26). The other pages together gain a net two clicks, leaving the site down five.
This identifies where the decline occurs, not why: the export does not establish snippet failure,
a changed query mix, or a durable trend. Desktop accounts for the device-level decline
(27 → 21 clicks, 1,083 → 1,381 impressions); mobile clicks rise 6 → 7. Device and page tables cannot
be joined to attribute compare's lost clicks specifically to desktop.

**Multiple-devices remains the largest CTR opportunity:** 752 impressions, one click,
**0.13% CTR**, after 608 impressions and one click in the prior window. Its average position still
improves (8.35 → 7.90), so leave its live content and snippet alone while collecting a clean
comparison. This is the first page to investigate for a future CTR test, not a reason to chase
additional ranking or publish a competing switching guide. The current page-to-query mapping is
ambiguous because the how-to guide also covers the switching cluster.

**Provisional snippet draft for multiple-devices — not applied, not yet approved.** This revises
the 29 Aug draft to preserve this page's limits/options intent. It avoids advertising Universal
Control as a fourth way to move the Bluetooth connection and keeps some distance from the how-to
page's three-method title. The live metadata was verified on 13 Sep.

| Field | Current | Candidate for a later test |
|---|---|---|
| Title | `Can a Magic Keyboard Connect to Multiple Devices? (Trackpad & Mouse Too)` | `Magic Keyboard on Multiple Devices: What Works (2026)` |
| Description | `No — Apple's Magic Keyboard, Trackpad, and Mouse pair with one device at a time. Why Apple designed it that way, how it compares to Logitech Easy-Switch, and what to do instead.` | `Use a Magic Keyboard with two Macs? Compare manual pairing, cables, Universal Control and switching apps, plus the limits for Trackpad and Mouse.` |

The candidate front-loads the topic and gives readers concrete options to compare. It is a
hypothesis, not a promised CTR increase. Confirm relevant queries with a page-filtered export
before proposing implementation. Keep the improving page untouched in this review; applying a
future title/meta test requires user approval under the SEO skill.

**Notable queries and gaps:**
- `magic switch`: 82 impressions, 1 click, position 9.7 (previous 65, 1, 9.5).
  `magic switch mac`: 24 impressions, 2 clicks, position 5.9. `switchmymagic`: 10 impressions,
  no clicks, position 2.3. These are competitor names; do not assume a broad informational snippet
  will win those clicks. The global query rows do not prove which page served each impression.
- `magic keyboard switch between devices`: 15 impressions, no clicks, position 8.9;
  `can magic keyboard connect to multiple devices`: 12, no clicks, position 9.2;
  `magic keyboard multiple macs`: 7, no clicks, position 8.4;
  `share magic keyboard between two macs`: 7, no clicks, position 10.4.
  Existing pages cover these topics; get filtered data to separate their intent before editing.
- `switch magic keyboard between macs`: 9 impressions, no clicks, position 6.7. The how-to page
  overall gains three clicks and improves position, so retain its existing snippet.
- `how to switch magic mouse between macs`: 4 impressions, position 10.0;
  `switch magic mouse between macs`: 2, position 15.0;
  `magic trackpad switch between devices`: 4, position 9.2;
  `magic trackpad multiple devices`: 3, position 10.0. These remain small and are covered by
  existing guides. No separate Mouse/Trackpad article is justified by this export alone.
- The Android question has 6 impressions at position 14.8 and is not a strong fit for Switchy's
  Mac-to-Mac switching use case. No new post proposed.

**Parser caveat:** no individual query meets its zero-click CTR threshold. The current script
only emits query-level CTR flags despite its docstring mentioning pages. Manual page review finds
Universal Control (53 impressions, position 7.40, zero clicks) and KVM (20, 8.70, zero clicks).
Universal Control is still improving; KVM's sample is small and its query mix is unconfirmed.
Neither warrants an immediate rewrite. Multiple-devices has one click, so it also evades the
literal zero-click rule despite the persistent low CTR. Parser code was not changed.

**Keep the gains:** how-to improves to position 7.51 with 11 clicks; pairing-mode crosses into the
top 10 at 9.22 with 217 impressions; Mac mini earns one click at position 8.10; the homepage
generates six clicks at position 3.31. The data do not establish that earlier snippet edits caused
these gains. No changes recommended to these pages this review.

**Site health and indexing, checked 13 Sep:** the live canonical sitemap returns HTTP 200 and
contains 11 URLs. All 11 return HTTP 200, declare matching self-canonicals, and include
`index, follow`. Root robots.txt allows general search crawling and references
`https://mangobuns.com/sitemap.xml`; the compatibility robots.txt under `/switchy/` also returns 200.
The sitemap still uses 10 Jul `lastmod` dates for pages whose source metadata records August
updates. Carry forward the maintenance item to use accurate content dates in the next approved
content deployment; do not label untouched pages as freshly modified.

Six watched URLs surfaced in `site:` search, including the blog hub, which is absent from this
week's Pages export. The multiple-devices URL did not surface directly in the search results
returned by this check, but its current GSC row confirms 752 impressions. A missing `site:` result
is not evidence of deindexing; no Request Indexing action is warranted. The other six watched
content/homepage URLs have current GSC impressions. Watching table refreshed, preserving original
indexing dates. This is not a fresh GSC URL Inspection of all seven URLs.

**Prioritized next actions:**
1. Get a clean site-wide comparison export: **Last 7 days → Compare → Previous period**, with no
   page or query filter. This supplies the missing consecutive baseline before acting on changes.
2. Export the same comparison with an exact page filter for
   `https://mangobuns.com/switchy/blog/magic-keyboard-multiple-devices/`. Inspect the Queries table
   before proceeding with the provisional CTR test. If a particular query still overlaps how-to,
   filter that query and inspect Pages to confirm which URLs actually rank.
3. Export the same comparison for `https://mangobuns.com/switchy/compare/` to examine the lost
   clicks by query. If low CTR persists on relevant queries, prepare one concrete snippet test;
   avoid rewriting around competitor-name traffic solely from this global export.

**Actions taken:** analyzed the exports, completed live health/indexing checks, refreshed Watching,
and appended this review while preserving the existing uncommitted 29 Aug entry. Only the SEO log
changed. No production edits, build, commit, push, or deployment were needed for this review.

### 2026-09-13 follow-up — Multiple-devices update prepared for deployment approval

**Status: prepared locally; awaiting the user's approval to deploy.** The user requested that the
multiple-devices improvement be completed and presented for approval before deployment, and supplied
a demo video to reuse if useful. This authorizes preparation of the earlier provisional change;
it is not evidence that the query attribution uncertainty has been resolved.

**Prepared changes:**
- Title/H1: `Magic Keyboard on Multiple Devices: What Works (2026)` (53 characters).
- Description: `Use a Magic Keyboard with two Macs? Compare manual pairing, cables, Universal
  Control and switching apps, plus the limits for Trackpad and Mouse.` (145 characters).
- Opening paragraphs retain the one-device-at-a-time answer and explain the available workarounds.
  An in-prose link points readers to the existing how-to guide for setup instructions.
- Open Graph and Article metadata match the new title and description. Original publication date
  remains 10 Jul; modification date is 13 Sep. The blog card and llms.txt entry are aligned, and
  sitemap lastmod is updated for this article and the changed blog hub only. Both URLs already
  appear in the deployment workflow's IndexNow list.
- Added a video demonstration after the switching-app explanation, with a direct free-three-day-
  trial download link and the Mac/network requirements.
- Removed the existing "Rule of thumb" callout at the user's request. The video/trial section now
  leads directly into Common questions. Rebuilt and verified the removal in the approval preview.

**Video:** the supplied `Switchy for mac - demo(ob).mp4` is byte-for-byte identical to the existing
homepage asset (SHA-256 `0b4d1aa9dc6216e4e43e7efba3a0c8e68b85e1d0cf806ea9ea4af4d3d97c02c5`).
Reuse that URL without another video copy. The 1,035,513-byte clip is 23.97 seconds at 1106×720;
its decoded audio samples are all zero. The visible demo shows a Magic Trackpad connecting, so the
caption describes that specific action and does not claim the clip demonstrates all three devices
switching together. A 60,622-byte JPEG poster was extracted from the menu-open frame. Native
playback controls, a text description, explicit dimensions, and `preload="none"` are included.
There is no autoplay, including when reduced motion is enabled.

**Validation:** production build passed. Checked the built preview at widths 320, 390, 768, and
1440 pixels with no page-level horizontal overflow. Reviewed desktop and mobile screenshots.
Video plays and pauses from the keyboard without media errors. No video request is made before
playback; the poster loads. The article, blog hub, stylesheet, poster, video, and trial download
all return HTTP 200 with appropriate content types in the built preview. Article, FAQPage, and
BreadcrumbList JSON-LD parse; title/description consistency, original publication date, matching
built files, and the unchanged 11-URL sitemap were checked. `git diff --check` passes.

**Measurement after approval/deployment:** record the actual deployment date, request indexing for
the retitled article, and compare complete post-recrawl windows with consistent query/device
filters. Baseline: 752 impressions, one click, position 7.90, CTR 0.13% for 5–11 Sep. The video and
trial link affect the on-page experience; GSC alone cannot establish trial or purchase conversion.
No new analytics were added, and combined changes are not a controlled attribution experiment.

### 2026-09-14 — Trackpad and Mouse article assessment

Reviewed device-specific Queries rows in five available exports (1, 8, 16, and 29 Aug; 13 Sep).
Trackpad intent recurs in all five. The 8–14 Aug window includes one click from
`magic trackpad switch between devices` (4 impressions, position 9.5). In 5–11 Sep, the six
non-brand Trackpad switching/multiple-device queries total **11 listed impressions, zero clicks**;
the three Magic Mouse switching queries total **7 listed impressions, zero clicks**. These are
small observed query samples, not estimates of total search demand. Global rows do not establish
which existing page ranked, and the exports do not cover consecutive weeks throughout.

**Recommendation:** a focused Trackpad article is a reasonable first content experiment, with a
Mouse article a lower-priority follow-up. This refines the earlier conservative recommendation:
the latest export alone did not warrant new pages, but repeated Trackpad intent and the available
original demo make one useful, differentiated guide worth considering. Suggested title:
`How to Switch a Magic Trackpad Between Two Macs`. Give it model-specific setup steps, the
existing Trackpad demo, troubleshooting for reconnecting to the wrong Mac, and clear distinctions
between moving a Bluetooth connection and sharing input. Use original screenshots and verify
instructions on the supported hardware before claiming first-hand testing. A Mouse guide would
need its own useful detail about pairing, using another input device during the handoff, and
charging-port limitations. Link each new guide contextually from existing articles if commissioned.

**Final decision:** prioritize improvements to existing pages. Defer both Trackpad and Mouse
articles; the small query samples do not make new content necessary. Measure the revised
multiple-devices page after recrawl, and investigate the comparison page's query-level CTR before
proposing another change. Leave the improving how-to and pairing titles unchanged.

### 2026-09-14 — Approved deployment

The user approved publishing the prepared multiple-devices update with "okay go for it" after
confirming the scope was improvements to the existing article. No new articles are included.
Production build and responsive/video checks passed before approval. The remote main branch
matches the local base commit, and the pre-existing uncommitted 29 Aug SEO log entry will be
preserved separately from this deployment. Live verification will follow the Pages deployment.

**Deployed and verified, 14 Sep:** commit `982b0ebbad856f7d3a18e91d300cb9fa17ea0050` was
pushed to main. [GitHub Pages run 34820891774](https://github.com/benhursenabathi/mangobuns/actions/runs/34820891774)
completed successfully, including the build, deployment, and IndexNow step. The live article,
blog hub, stylesheet, sitemap, llms.txt, and poster match the approved local files byte-for-byte.
The demo video and trial DMG return HTTP 200 with the correct content types. All 11 sitemap URLs
return HTTP 200, matching self-canonicals, and `index, follow`; both robots.txt URLs also return
200. The removed callout is absent from the deployed article. Request Indexing for the retitled
article in GSC, then compare complete windows after Google recrawls it; no SEO uplift is claimed
at deployment time. The pre-existing 29 Aug log entry remains intact and uncommitted.

---

## 2026-09-22 — Clicks hold steady; early improvement on the updated guide

**Data:** `mangobuns.com-Performance-on-Search-2026-09-22.xlsx`, Web / Last 7 days, no
page or query filter. Chart dates are **14–20 Sep 2026**. Previous export (13 Sep) covers
**5–11 Sep**, leaving 12–13 Sep unrepresented. These are equal-length, nonconsecutive windows
with different weekday alignment. Deltas below compare exports, not a clean week-over-week test.
The newest export is fresh; the existing skill parser completed successfully.

**Site-wide, calculated from Chart!A2:E8:** impressions **1,841 → 1,698 (−7.8%)**;
clicks **28 → 28**; CTR **1.52% → 1.65% (+0.13 percentage points)**; approximate average
position **7.71 → 7.59** (lower is better). Position is weighted by daily impressions and is
approximate because exported daily positions are rounded. Pages totals are 1,919 and 1,754
impressions, respectively, and must not replace the site-wide Chart totals. Google's
[aggregation documentation](https://support.google.com/webmasters/answer/17011364?hl=en)
explains the property-versus-page distinction.

**Pages — previous → current:**

| Page | Impressions | Clicks | CTR | Average position |
|---|---:|---:|---:|---:|
| Multiple devices | 752 → 683 | 1 → 4 | 0.13% → 0.59% | 7.90 → 7.53 |
| How-to switching | 497 → 363 | 11 → 6 | 2.21% → 1.65% | 7.51 → 7.09 |
| Comparison | 247 → 206 | 6 → 4 | 2.43% → 1.94% | 7.26 → 6.88 |
| Mac mini + MacBook | 83 → 218 | 1 → 0 | 1.20% → 0% | 8.10 → 8.87 |
| Pairing mode | 217 → 170 | 2 → 0 | 0.92% → 0% | 9.22 → 8.79 |
| Universal Control | 53 → 63 | 0 → 2 | 0% → 3.17% | 7.40 → 8.24 |
| KVM | 20 → 13 | 0 → 2 | 0% → 15.38% | 8.70 → 8.31 |
| Switchy homepage | 39 → 28 | 6 → 9 | 15.38% → 32.14% | 3.31 → 2.39 |
| Mangobuns root | 10 → 6 | 1 → 1 | 10% → 16.67% | 7.60 → 8.50 |
| Privacy | 1 → 1 | 0 → 0 | 0% → 0% | 6.00 → 4.00 |

The blog hub has one impression and zero clicks (position 2.00); it was absent from the prior
Pages table, so no previous value is inferred. Two unexpected how-to URL variants each have
one impression, zero clicks and position 1.00; live findings are recorded below.

**The 14 Sep multiple-devices update:** clicks increased by three despite 9.2% fewer impressions,
and CTR improved by 0.45 percentage points. This is an encouraging early observation, not proof
that the rewrite or video caused an uplift. There are only four clicks in the current window;
it includes deployment day, and Google's actual recrawl date/new-snippet adoption is unverified.
It is not yet a confirmed full post-recrawl window. Keep the new title, intro and demo unchanged
for at least another complete week, with a matched comparison and page-filtered query data.
GSC alone does not establish trial-download or purchase conversion.

**Next existing-page opportunity — Mac mini/MacBook:** impressions grew **163%** to 218,
with zero clicks and position 8.87. This is the strongest new CTR investigation candidate.
No Mac mini/MacBook-specific query appears among the 50 listed global queries, so the searches
responsible for this page's impressions remain unknown. Obtain an exact-page-filtered comparison
and inspect Queries before finalizing a snippet test. A provisional candidate, not applied:

- Current title: `One Keyboard & Mouse for Mac mini and MacBook (2026)`.
- Proposed title: `One Keyboard & Mouse for Mac mini and MacBook: 3 Ways` (53 characters).
- Current description: `Bought a Mac mini to go with your MacBook? You don't need a second
  Magic Keyboard and Mouse. Every way to share one set of Magic devices between both Macs, compared.`
- Proposed description: `Share a Magic Keyboard and Mouse between Mac mini and MacBook. Compare
  three methods, including options for Macs with different Apple Accounts.` (143 characters).
- Rationale: make the three-method comparison explicit and surface the different-account use
  case already covered by the article. Confirm relevance to the page's actual queries first.

**Retain other improving titles:** how-to, comparison, pairing-mode, KVM and the homepage all
improve average position. How-to and comparison lose clicks while impressions also fall; this
export does not establish a snippet failure. Pairing-mode's 170 impressions and zero clicks
deserve monitoring, but its position improves from 9.22 to 8.79. Avoid a simultaneous rewrite.
Universal Control earns two clicks, and KVM earns two from a very small impression sample.

**Queries and device mix:**
- `magic switch`: 62 impressions, zero clicks, position 9.74 (previous 82, one, 9.70).
  `magic switch mac`: 17, zero, 7.35 (previous 24, two, 5.92). These competitor-name searches
  explain the parser's main query-level flag; their serving pages are not established by this
  global export. Get filtered query/page data before changing the comparison page.
- `can magic keyboard connect to multiple devices`: 14 impressions, zero clicks, position
  8.36 (previous 12, zero, 9.25); `can a magic keyboard connect to multiple devices`: ten,
  zero, 6.70; `magic keyboard multiple devices`: six, zero, 7.17. No attribution to the
  retitled page is asserted without a page filter.
- `switch magic keyboard between macs`: four impressions, zero clicks, position 8.25
  (previous nine, zero, 6.67). This differs from the how-to page's improving aggregate rank;
  a single small query row should not drive a whole-page rewrite.
- `switchy mac`: four impressions, three clicks, position 1.00; `what is switchy`: one
  impression and one click. Only four of the site's 28 clicks appear in the exported Queries
  table (204 listed impressions versus 1,698 site-wide). Do not treat the query table as a
  complete demand or branded/non-branded breakdown.
- Desktop clicks: 21 → 25; mobile: seven → three. Desktop CTR: 1.52% → 1.94%; mobile:
  1.60% → 0.79%. Counts are too small, and page/device attribution is missing, to diagnose a
  mobile regression. Both device categories' average positions improve slightly.
- Trackpad-specific queries total **seven listed impressions, zero clicks**; Magic Mouse
  switching/multiple-device queries total **nine listed impressions, zero clicks**. One further
  generic mouse-sharing query has one impression. Continue deferring new Trackpad and Mouse
  articles in line with the user's preference to improve existing pages.

**Health and indexing, checked 22 Sep:** the canonical sitemap contains 11 URLs; all return
HTTP 200, matching self-canonicals, and `index, follow`. Root and compatibility robots.txt return
200; the root file allows crawling and references the canonical sitemap. The deployed guide
still has the approved title and video section, and the removed callout remains absent.

Six watched pages surfaced in `site:` searches. The multiple-devices URL again did not appear
directly in the returned search results, but its 683 GSC impressions and four clicks confirm it
served during the reporting window. All seven watched URLs now have GSC impressions. Google's
[site-operator documentation](https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site)
says the returned list is not exhaustive; do not diagnose deindexing from this omission.
Watching refreshed while preserving original indexed dates. No authenticated URL Inspection
was performed, so the last Google crawl date remains unknown. If the 14 Sep indexing request
was not made, inspect the retitled URL and request indexing for that content update.

**Unexpected URLs:**
- `/switchy/blog/how-to-switch-magic-keyboard-between-mac-devices-3-methods`
- `/switchy/blog/how-to-switch-magic-keyboard-between-macs-3-methods-2026-/`

Both return a real HTTP 404 and the site's `noindex` error page. Neither is in the sitemap,
and neither string occurs in the current public, public-root, src, docs or workflow files
(checked before this log entry was added). The real how-to URL returns 200. Their origin is
unknown; one impression each is insufficient evidence of a duplicate-content problem. Monitor
recurrence and inspect referring URLs in GSC before adding redirects or creating any new pages.

**Actions taken:** completed the export comparison, live health checks and watched-URL searches;
updated Watching and this log. Preserved the previous uncommitted log entries. No site content,
workbook, parser, build, commit, push or deployment changed during this review.

**Priorities:**
1. Keep the multiple-devices experiment stable; confirm its crawl date and compare complete
   post-recrawl windows before judging the result.
2. Investigate the Mac mini/MacBook page's Queries using an exact-page filter and comparison
   dates. Finalize the provisional three-method snippet only if it matches those searches.
3. Keep new articles deferred. For the next export, select **Last 7 days → Compare → Previous
   period**, with no page/query filter for site totals; additionally export exact-page
   comparisons for multiple-devices and Mac mini/MacBook. Preserve device filters across windows.

---

## 2026-09-26 — Visibility grows; preserve the experiment and investigate Mac mini queries

**Data:** `mangobuns.com-Performance-on-Search-2026-09-26.xlsx`, Web / Last 7 days, no
page/query filters or comparison columns. Chart dates are **18–24 Sep**. The 22 Sep export
covers **14–20 Sep**, so the reports share **18–20 Sep**. The three shared daily rows match
exactly across exports. Do not describe the overlapping seven-day totals as independent weeks,
add their clicks together, or interpret repeated URL rows as necessarily new events.

**Latest seven-day snapshot:** 1,802 impressions, 27 clicks, CTR 1.50%, approximate average
position 7.61. The preceding overlapping snapshot had 1,698 impressions, 28 clicks, CTR 1.65%,
position 7.59. Site-wide totals come from Chart, not a sum of Pages or Queries.

**Clean comparison from the daily sheets:** compare **14–17 Sep** with **21–24 Sep**.
Both are Monday–Thursday, seven days apart, with no shared dates. These are four-day samples,
not complete weeks or a controlled test. Sources: 22 Sep workbook Chart!A2:E5 and 26 Sep
workbook Chart!A5:E8.

| Metric | 14–17 Sep | 21–24 Sep | Change |
|---|---:|---:|---:|
| Impressions | 1,088 | 1,192 | +9.6% |
| Clicks | 18 | 17 | −1 (−5.6%) |
| CTR | 1.65% | 1.43% | −0.23 percentage points |
| Approximate average position | 7.60 | 7.63 | Essentially unchanged |

Positions are impression-weighted from rounded daily exports. More visibility has not yet
produced more clicks, but there is no evidence here of a broad ranking decline. A one-click
difference is too small to diagnose a significant performance change.

**Pages — overlapping snapshots, 14–20 Sep → 18–24 Sep:**

| Page | Impressions | Clicks | CTR | Average position |
|---|---:|---:|---:|---:|
| Multiple devices | 683 → 637 | 4 → 3 | 0.59% → 0.47% | 7.53 → 7.33 |
| How-to switching | 363 → 393 | 6 → 4 | 1.65% → 1.02% | 7.09 → 7.10 |
| Comparison | 206 → 122 | 4 → 5 | 1.94% → 4.10% | 6.88 → 6.96 |
| Mac mini + MacBook | 218 → 383 | 0 → 1 | 0% → 0.26% | 8.87 → 8.73 |
| Pairing mode | 170 → 197 | 0 → 1 | 0% → 0.51% | 8.79 → 8.48 |
| Universal Control | 63 → 49 | 2 → 4 | 3.17% → 8.16% | 8.24 → 7.35 |
| KVM | 13 → 29 | 2 → 2 | 15.38% → 6.90% | 8.31 → 8.79 |
| Switchy homepage | 28 → 31 | 9 → 7 | 32.14% → 22.58% | 2.39 → 4.16 |
| Mangobuns root | 6 → 6 | 1 → 0 | 16.67% → 0% | 8.50 → 5.83 |
| Blog hub | 1 → 1 | 0 → 0 | 0% → 0% | 2.00 → 3.00 |

The privacy URL is absent from the latest Pages table; no zero or indexing failure is inferred.
Three unexpected URLs each have one impression and zero clicks; see the health findings below.
Page-level daily breakdowns are not present, so the clean four-day comparison above cannot be
reconstructed for individual pages from these exports.

**Recommendation remains: keep current content stable; obtain targeted data now.**
- Multiple-devices still improves average position, with three clicks and CTR 0.47%. The
  pre-update 5–11 Sep snapshot was one click and CTR 0.13%, but query mix, dates, and Google's
  recrawl timing are not controlled. The latest three versus four clicks is not evidence that
  the update stopped working. Keep the title, intro, and demo unchanged through the planned
  29 Sep review. Confirm Google's last crawl before claiming a post-recrawl result.
- Mac mini/MacBook remains the first page to investigate: 383 impressions, one click, position
  8.73. Visibility and position are improving while CTR remains low. There are no explicit
  `mac mini` or `macbook` queries in the global Queries sheet. Request an exact-page-filtered
  export and inspect Queries before changing the snippet. The provisional 22 Sep proposal
  remains available: title `One Keyboard & Mouse for Mac mini and MacBook: 3 Ways`, with the
  three-method/different-Apple-Accounts description. It is not applied or treated as confirmed
  query targeting.
- Comparison and Universal Control earn more clicks without edits. Leave them alone. Pairing
  gains a click and improves position; leave its title alone too. How-to CTR falls to 1.02%
  while average position stays around 7.1. Watch its page-filtered query/device mix if this
  persists; do not rewrite on a two-click difference in overlapping windows. The homepage's
  rank moves from 2.39 to 4.16 on only 31 impressions, with seven clicks and CTR 22.58%; monitor
  before interpreting this as a sustained loss.

**Notable queries:**
- `can magic keyboard connect to multiple devices`: 16 impressions, zero clicks, position 8.19;
  `can a magic keyboard connect to multiple devices`: ten, zero, 6.30. Existing content covers
  this intent; these global rows do not prove which URL served it.
- `magic keyboard switch between devices`: eight impressions, zero clicks, position 8.38;
  `magic device switch`: eight, zero, 8.62. Map the query to Pages before proposing another title.
- `magic switch`: 17 impressions, zero clicks, position 10.59 (previous rolling snapshot:
  62, zero, 9.74). `magic switch mac`: 11, one click, position 8.18. Competitor-name visibility
  changes may be part of the mix, but cannot be attributed to the comparison page here.
- `switchy mac`: three impressions, two clicks, position 1.00. The 59 listed query rows account
  for only 173 impressions and four clicks versus 1,802 impressions and 27 site-wide clicks.
  Treat listed queries as a partial sample, not a complete demand breakdown.
- Trackpad switching/multiple-device queries total 14 listed impressions and no clicks; another
  broad keyboard/trackpad query has one impression. Magic Mouse switching/multiple-device queries
  total nine impressions and no clicks; another generic mouse-sharing query has two. These
  small, overlapping samples do not justify new articles. Keep the user's existing-page focus.
- The parser emits no zero-click CTR flag this time because no zero-click query meets its
  20-impression threshold. This does not mean all pages have healthy CTR: manual page review
  still identifies Mac mini and multiple-devices as low-CTR pages with hundreds of impressions.

**Health and indexing, checked 26 Sep:** all 11 canonical sitemap pages return HTTP 200,
matching self-canonicals, and `index, follow`. Both robots.txt files return 200. The approved
multiple-devices title/demo remain live and the removed callout is absent. Six watched pages
surface in `site:` search; multiple-devices does not surface directly, but its 637 impressions
and three clicks confirm serving during the reporting window. All seven watched URLs have
GSC impressions. As recorded in the 22 Sep review, `site:` results are not exhaustive.
Watching refreshed while retaining original indexed dates. No authenticated URL Inspection
was performed, and no claim is made about Google's current indexed title or last crawl date.

**Unexpected URL follow-up:** a new export row is
`https://mangobuns.com/blog/how-to-switch-magic-keyboard-between-macs/` (missing `/switchy/`).
It and both variants recorded on 22 Sep return proper HTTP 404 responses with `noindex`.
None appears in the sitemap or current public, public-root, src or workflow links. The real
how-to guide remains healthy. The two repeated rows may be the same impressions within the
shared dates; these exports do not establish recurring new hits. The new missing-prefix URL
has one impression and zero clicks. Keep these on the watch list; inspect referring URLs if
they recur in a non-overlapping window before introducing redirects.

**Actions:** ran the existing parser, reconciled overlapping daily data, checked all sitemap
URLs plus the three unexpected URLs, refreshed Watching, and appended this review. Preserved
all earlier uncommitted log history. No website content, source workbook, parser, build,
commit, push or deployment changed.

**Next actions:**
1. Obtain Mac mini/MacBook's exact-page-filtered Queries export with **Last 7 days → Compare →
   Previous period**; this is the immediate information needed before a useful snippet change.
2. Keep the 14 Sep multiple-devices update stable; inspect its Google crawl date if available.
3. Review around 29 Sep using a site-wide comparison export and the two page-filtered exports
   (multiple-devices and Mac mini/MacBook). Add no new articles on this evidence.

---

## 2026-10-01 — Switchy 2.0 (Send) shipped; a new-content case finally exists

**Data:** `mangobuns.com-Performance-on-Search-2026-10-01.xlsx`, Web / Last 7 days, no filter.
Chart dates **22–28 Sep 2026** (single window, no compare). Cleanest non-overlapping baseline
is the 22 Sep export (14–20 Sep); 21 Sep is unrepresented.

**Site-wide (Chart):** impressions **1,698 → 1,918 (+13%)**; clicks **28 → 34 (+21%)**;
CTR **1.65% → 1.77%**; impression-weighted position **7.59 → 7.75** (slightly worse).
Devices: desktop 1,390 imp / 28 clicks (pos 7.62); mobile 501 / 6 (8.10); tablet 27 / 0.

**Pages (current window; 26 Sep export values in brackets, overlapping windows):**

| Page | Impr | Clicks | Pos |
|---|---:|---:|---:|
| Multiple devices | 672 [637] | 6 [3] | 7.7 [7.33] |
| How-to switching | 442 | 7 | 7.2 |
| Mac mini + MacBook | 422 [383] | 2 [1] | 8.6 [8.73] |
| Pairing mode | 202 [197] | 2 [1] | 8.8 [8.48] |
| Comparison | 127 | 4 | 6.5 |
| Switchy homepage | 49 [31] | 10 [7] | 4.6 [4.16] |
| Universal Control | 40 [49] | 3 [4] | 7.8 [7.35] |
| KVM | 22 [29] | 0 [2] | 9.0 [8.79] |

Multiple-devices doubled clicks with stable position — the 14 Sep update is holding; keep it
unchanged. Homepage clicks keep climbing (10 at pos 4.6).

**Queries:** parser CTR flag: `can magic keyboard connect to multiple devices` 20 imp, 0 clicks,
pos 7.5 (existing content covers it). Competitor-name cluster (`magic switch*`) 39 imp combined,
pos 8.3–9.8, 0 clicks. Still no `mac mini` / `macbook` query in the global sheet despite the
Mac mini page's 422 impressions — its queries remain anonymised long tail.

**2.0 launch content assessment:** Switchy 2.0 (build 93) adds **Send / Send all devices** —
push devices from the Mac you're on to another Mac, solving the "desktop Mac has no input device
left" problem. Commit b88f557 added the desktop Send section to the landing page. No blog post,
llms.txt or schema mentions Send yet; homepage JSON-LD still says `softwareVersion: 1.1.6`.
SERP spot-check for "Mac mini without keyboard and mouse" / "use MacBook as keyboard for Mac mini"
returns Apple Support, MacPaw and forum threads (Apple Discussions, MacRumors) — no dedicated,
current guide. This is the first evidence-backed new-article case since July.
Caveat recorded: the app repo's `Docs/Architecture/Remote-Send-Reliability.md` and
`Docs/Qualification/Three-or-More-Mac-Qualification.md` say physical Mac mini qualification is
still pending and advise not naming Mac mini publicly; the release notes say "desktop Mac".
Needs the user's call before any Mac-mini-specific copy ships.

**Proposed (not applied):**
1. Update `/switchy/blog/one-keyboard-mouse-mac-mini-macbook/` with a Send section (the page
   already earns 422 imp/wk for this exact setup) + the pending 22 Sep title/description test +
   `dateModified`.
2. New post targeting "Mac mini without keyboard and mouse" / headless-desk intent (setup cable
   trick, wired fallback, Universal Control, Screen Sharing, Switchy Send), wired into hub,
   sitemap, llms.txt, IndexNow list, plus an in-prose link from the Mac mini + multiple-devices
   posts.
3. Bump homepage `softwareVersion` to 2.0 and add Send to llms.txt.
Not recommended: a "Switchy 2.0 released" announcement post — no search demand for it.

**Health:** all 11 sitemap URLs return 200. `site:mangobuns.com` via the web-search tool returned
unrelated results (tool limitation, not de-indexing): every watched URL has GSC impressions this
window, which is the stronger serving signal. Watching table unchanged.

**Applied 2026-10-01 (user approved: say "desktop Mac", Mac mini only as the example; make no
claims about sleeping/locked Macs):**
- New post `/switchy/blog/mac-mini-without-keyboard-mouse/` — title `Use a Mac mini Without a
  Keyboard or Mouse: 4 Ways (2026)`; Article + FAQPage (5 Q) + BreadcrumbList; wired into the hub,
  sitemap, llms.txt and the IndexNow list.
- Mac mini + MacBook post: title → `One Keyboard & Mouse for Mac mini and MacBook: 3 Ways`;
  description → "Share one Magic Keyboard and Mouse between a Mac mini and MacBook. Three methods
  compared, including sending devices back to a mini with no keyboard."; Send paragraph under
  Option 3; in-prose link to the new post; dateModified 2026-10-01. **Baseline for the snippet
  test:** 422 imp, 2 clicks, pos 8.6 (22–28 Sep).
- How-to post: in-prose link to the new post (Method 1) + Send mention in the Switchy bullet.
- Homepage: `softwareVersion` 1.1.6 → 2.0; Intel FAQ no longer pins a version; new FAQ "Can I
  send devices to a Mac that has no keyboard or mouse?" in App.jsx, static fallback and JSON-LD.
- Multiple-devices post deliberately untouched (its 14 Sep snippet test is still running).

---

## 2026-10-01 (cloud routine, API) — Same window via the API: true week-over-week confirms growth; log only

**Data:** Search Console API (`fetch_gsc.py`), property `https://mangobuns.com/switchy/`, Web.
Current **22–28 Sep**, previous **15–21 Sep** — the first clean, non-overlapping
week-over-week comparison in this log (earlier xlsx entries had overlapping windows). Same
current window as the xlsx entry above; the totals agree to within 5 impressions.

**Site-wide:** impressions **1,666 → 1,913 (+15%)**; clicks **26 → 34 (+31%)**; CTR
**1.56% → 1.78%**; impression-weighted position **7.57 → 7.77** (slightly worse — more
impressions at the margins, not a ranking loss on core pages). Daily: 289/3, 335/5, 301/5,
278/10, 208/3, 224/4, 278/4. Devices: desktop 1,386 / 28 (7.64), mobile 500 / 6 (8.12),
tablet 27 / 0.

**Pages (prev → current):**

| Page | Impr | Clicks | Pos |
|---|---:|---:|---:|
| Multiple devices | 647 → 672 | 4 → 6 | 7.4 → 7.7 |
| How-to switching | 372 → 442 | 4 → 7 | 7.1 → 7.2 |
| Mac mini + MacBook | 236 → 422 | 1 → 2 | 8.9 → 8.6 |
| Pairing mode | 178 → 202 | 1 → 2 | 8.6 → 8.8 |
| Comparison | 172 → 127 | 5 → 4 | 6.9 → 6.5 |
| Switchy homepage | 27 → 49 | 8 → 10 | 2.6 → 4.6 |
| Universal Control | 61 → 40 | 1 → 3 | 8.2 → 7.8 |
| KVM | 18 → 22 | 2 → 0 | 8.4 → 9.0 |
| Blog hub | 1 → 3 | 0 → 0 | 2.0 → 3.0 |
| Privacy | 1 → 2 | 0 → 0 | 4.0 → 3.0 |

**Notable queries (page ← query, from the API pairs):**
- Multiple devices ← `can magic keyboard connect to multiple devices` 20 imp, 0 clicks, pos 7.5
  (only parser CTR flag); `can a magic keyboard…` 12 / 0 / 7.3; `can the magic keyboard…`
  6 / 0 / 5.5; `apple keyboard multiple devices` 6 / 0 / 9.8; `magic trackpad multiple devices`
  6 / 0 / 10.7. The page still converts its question-style cluster poorly, but clicks are up
  and Google only recrawled it on 25 Sep, so post-update data is ~4 days.
- Comparison ← `magic switch mac` 15 / 0 / 8.7, `magic switch app` 11 / 0 / 9.8, `magic switch`
  10 / 0 / 8.5, `switchmymagic` 7 / 0 / 3.6, `magic device switch` 4 / 0 / 9.0. Competitor-brand
  navigational queries; the title already leads with "Switchy vs Magic Switch vs SwitchMyMagic".
- Mac mini + MacBook ← `how to use one mouse two mac` 4 / 0 / 14.2 — first query the API ties to
  this page; the rest of its 422 impressions are anonymised long tail.
- Homepage ← `switchy mac` 4 / 2 / 1.2. Homepage avg position 2.6 → 4.6 comes with more clicks
  (8 → 10) on a small sample; monitor.

**Indexing (URL Inspection API, 2026-10-01):** all 10 established URLs `Submitted and
indexed`, Google-selected canonical = own URL. Multiple-devices recrawled 25 Sep (first
confirmed post-retitle crawl). Mac mini + MacBook last crawled 29 Aug — Google has not yet seen
today's retitle, so the snippet-test clock effectively starts at its next crawl. New post
`mac-mini-without-keyboard-mouse` was already crawled at 20:40 UTC today and is
`Crawled - currently not indexed` — expected for a same-day page; Request Indexing and
re-check ~15 Oct.

**Health:** all 12 sitemap URLs return HTTP 200 (now including the new post).
`--submit-sitemap` returns HTTP 400 "Could not process sitemap" because the service account's
property is the URL-prefix `https://mangobuns.com/switchy/`, which cannot own the root
`/sitemap.xml`. Skipped per the skill; resubmit manually in the domain/root property if one exists.

**Decision: log only — no site changes this week.**
- New post: the weekly budget was used today (`mac-mini-without-keyboard-mouse`).
- Mac mini + MacBook: snippet changed today; experiment window runs to at least 15 Oct
  (baseline 422 imp / 2 clicks / pos 8.6).
- Multiple devices: the 14 Sep experiment window has technically closed, but clicks are
  improving (4 → 6) and only ~4 days of post-recrawl data exist. Leave it; re-evaluate the
  question-style CTR on 8 Oct with a full post-recrawl week. Baseline: 672 imp / 6 clicks /
  pos 7.7 / CTR 0.89%.
- How-to, pairing, Universal Control: clicks up — leave alone. How-to also got an in-prose link
  today.
- Comparison: rejected a retitle for `magic switch*` queries — the title already front-loads the
  competitor names, these are navigational searches where the competitor's own site holds #1,
  and the page's overall position improved (6.9 → 6.5).
- KVM: 2 → 0 clicks on 22 impressions — noise.
- Homepage: edited today (softwareVersion/FAQ); no further change.

**Next (8 Oct):** first look at the new post's indexing and impressions; multiple-devices
question-cluster CTR with a full post-recrawl week; whether Google has recrawled the Mac mini
page; homepage position.
