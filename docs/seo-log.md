# Switchy SEO Log

Weekly entries appended by the `/switchy-seo` skill. Newest at the bottom.

## Watching (indexing status)

| URL | Added | Indexed? |
|---|---|---|
| /switchy/blog/ | 2026-07-10 | Yes — 2026-07-20 (has impressions) |
| /switchy/blog/universal-control-vs-switching-devices/ | 2026-07-10 | Yes — 2026-07-20 (has impressions) |
| /switchy/blog/kvm-switch-for-two-macs/ | 2026-07-10 | Yes — 2026-07-20 (has impressions) |
| /switchy/blog/one-keyboard-mouse-mac-mini-macbook/ | 2026-07-10 | Yes — 2026-07-20 (has impressions) |
| /switchy/blog/magic-keyboard-pairing-mode/ | 2026-07-10 | — (0 impressions + absent from site: search; re-request indexing on 2026-07-24 if still absent) |
| /switchy/blog/magic-keyboard-multiple-devices/ | 2026-07-10 | — (0 impressions + absent from site: search; re-request indexing on 2026-07-24 if still absent) |
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

Data: GSC export for 14–20 Jul 2026 (Last 7 days, no page filter, no compare — so no automatic WoW deltas this week; deltas below are vs the 2026-07-10 page-filtered snapshot where comparable).

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
