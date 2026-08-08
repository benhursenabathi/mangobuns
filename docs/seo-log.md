# Switchy SEO Log

Weekly entries appended by the `/switchy-seo` skill. Newest at the bottom.

## Watching (indexing status)

| URL | Added | Indexed? |
|---|---|---|
| /switchy/blog/ | 2026-07-10 | Yes — 2026-07-20 (has impressions) |
| /switchy/blog/universal-control-vs-switching-devices/ | 2026-07-10 | Yes — 2026-07-20 (has impressions) |
| /switchy/blog/kvm-switch-for-two-macs/ | 2026-07-10 | Yes — 2026-07-20 (has impressions) |
| /switchy/blog/one-keyboard-mouse-mac-mini-macbook/ | 2026-07-10 | Yes — 2026-07-20 (has impressions) |
| /switchy/blog/magic-keyboard-pairing-mode/ | 2026-07-10 | **Yes — 2026-07-24.** Confirmed serving 2026-08-01: 128 impr, pos 30.7 |
| /switchy/blog/magic-keyboard-multiple-devices/ | 2026-07-10 | **Yes — 2026-07-24.** Confirmed serving 2026-08-01: 160 impr, pos 18.4. Ranking concern remains (interleaved with the how-to page at the same position) |
| /switchy/ (homepage) | 2026-07-10 | Yes — 2026-07-20 (18 impr, pos 2.6) |

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
