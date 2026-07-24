# Switchy SEO Log

Weekly entries appended by the `/switchy-seo` skill. Newest at the bottom.

## Watching (indexing status)

| URL | Added | Indexed? |
|---|---|---|
| /switchy/blog/ | 2026-07-10 | Yes — 2026-07-20 (has impressions) |
| /switchy/blog/universal-control-vs-switching-devices/ | 2026-07-10 | Yes — 2026-07-20 (has impressions) |
| /switchy/blog/kvm-switch-for-two-macs/ | 2026-07-10 | Yes — 2026-07-20 (has impressions) |
| /switchy/blog/one-keyboard-mouse-mac-mini-macbook/ | 2026-07-10 | Yes — 2026-07-20 (has impressions) |
| /switchy/blog/magic-keyboard-pairing-mode/ | 2026-07-10 | **Yes — 2026-07-24.** "URL is on Google / Page is indexed". Was "Crawled – currently not indexed" earlier the same day; resolved after Request Indexing + in-prose inbound links shipped. Now watch for first impressions |
| /switchy/blog/magic-keyboard-multiple-devices/ | 2026-07-10 | **Yes — 2026-07-24.** "URL is on Google / Page is indexed". Same story. Content differentiation no longer needed for *indexing*, but still open as a *ranking* concern (query overlap with the how-to page) |
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

*Attribution is genuinely ambiguous — do not over-learn from this.* Request Indexing was submitted
around 20:28 local; the deploy completed 19:47 UTC. Depending on timezone offset the indexing crawl
may predate the links going live, so credit belongs to the re-request, the links, or both. Also
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
   **Check in GSC** that only `https://mangobuns.com/sitemap.xml` is submitted — if the `/switchy/`
   one was ever submitted it will now report a fetch error and should be removed there.

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
