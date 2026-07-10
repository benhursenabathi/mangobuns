# Switchy SEO Log

Weekly entries appended by the `/switchy-seo` skill. Newest at the bottom.

## Watching (indexing status)

| URL | Added | Indexed? |
|---|---|---|
| /switchy/blog/ | 2026-07-10 | — |
| /switchy/blog/universal-control-vs-switching-devices/ | 2026-07-10 | — |
| /switchy/blog/kvm-switch-for-two-macs/ | 2026-07-10 | — |
| /switchy/blog/one-keyboard-mouse-mac-mini-macbook/ | 2026-07-10 | — |
| /switchy/blog/magic-keyboard-pairing-mode/ | 2026-07-10 | — |
| /switchy/blog/magic-keyboard-multiple-devices/ | 2026-07-10 | — |
| /switchy/ (homepage — confirm "URL is on Google" in URL Inspection) | 2026-07-10 | — |

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
