# Switchy Discoverability Playbook

Goal: grow organic traffic to mangobuns.com/switchy/ before any manual marketing push.
Last updated: 2026-07-10 (alongside the on-site SEO changes in the same commit).

## Where things stand (July 2026 audit)

- The **blog post** (`/switchy/blog/how-to-switch-magic-keyboard-between-macs/`) ranks around **#5** for "switch magic keyboard between two macs app". The **compare page** is also indexed. The **main landing page was not surfacing** in `site:mangobuns.com` results — the content pages are the growth engine, the homepage converts.
- Competitors in the SERP: magic-switch.com (#1), switchmymagic.com, plus free GitHub apps (MonkeySwitcher, MagicSwitch) and MacRumors/Alfred forum threads.
- On-site technical SEO is now in good shape (sitemaps unified, blog hub created, structured data fixed, 1200×630 OG image, IndexNow automated on deploy, llms.txt, custom 404).

## 1. Right after deploying (15 minutes, highest impact)

In **Google Search Console** (property already verified via `google7a8a921fc93f98b8.html`):

1. **Sitemaps** → confirm `https://mangobuns.com/sitemap.xml` is submitted; resubmit it so Google sees the 4 new URLs.
2. **URL Inspection → Request Indexing** for each new/changed page (this is the fastest lever Google gives you):
   - `https://mangobuns.com/switchy/`
   - `https://mangobuns.com/switchy/blog/`
   - `https://mangobuns.com/switchy/blog/universal-control-vs-switching-devices/`
   - `https://mangobuns.com/switchy/blog/kvm-switch-for-two-macs/`
   - `https://mangobuns.com/switchy/blog/one-keyboard-mouse-mac-mini-macbook/`
3. **Indexing → Pages**: check why `/switchy/` itself isn't ranking. Look for "Crawled – currently not indexed" or "Duplicate without user-selected canonical". If it's listed as indexed, the issue is ranking, not indexing — the new internal links from 4 blog pages will help.

**Bing Webmaster Tools** (one-time, ~5 min): sign up at bing.com/webmasters and use **"Import from Google Search Console"** — one click, no new verification. Bing powers DuckDuckGo, Yahoo, Ecosia, and the search behind ChatGPT/Copilot. The deploy workflow now pings **IndexNow** automatically, which Bing consumes — but the property must exist for it to matter.

## 2. Listings and backlinks (the biggest ranking lever)

The domain has almost no backlinks; competitors win on domain authority. Each listing below is a real referral channel *and* a backlink. Do them once, in roughly this order:

1. **AlternativeTo** (alternativeto.net) — register Switchy as an app; add it as an alternative to Magic Switch, SwitchMyMagic, and Universal Control. "X alternative" searches land here, and AI assistants scrape it heavily when recommending apps.
2. **Homebrew cask** — **viable again as of v1.1.4 build 70 (2026-07-10)**: the app now has a 3-day trial + Lemon Squeezy license activation (5-Mac limit), i.e. the free-download/paid-activation model Homebrew supports. Plan for a dedicated session:
   - The DMG is now served first-party at `https://mangobuns.com/switchy/downloads/Switchy.dmg` (stable name, avoids Homebrew's <75-star GitHub notability audit). **Release-process note: every stable release must refresh `public/downloads/Switchy.dmg`** — add this to the switchy-build skill. For the cask itself, also publish a *versioned* copy (e.g. `Switchy-1.2.0.dmg`) per release so `brew` checksums stay stable.
   - Update `docs/homebrew-cask-switchy.rb.draft` (URL → mangobuns.com versioned path, new sha256, drop `verified:`), run `brew style`/`brew audit --new`/`brew install --cask` locally, then PR to homebrew/homebrew-cask.
3. **MacUpdate** (macupdate.com) — free developer listing.
4. **macmenubar.com** and similar curated menu-bar-app directories — Switchy is a perfect fit.
5. **GitHub `mangobuns` repo** (already public with homepage set): add topics — `macos`, `magic-keyboard`, `magic-mouse`, `magic-trackpad`, `bluetooth`, `menubar-app`, `macos-app`. GitHub topic pages are indexed and browsed. Consider a public `switchy` repo for release notes/issue tracking even if the source stays private — public repos rank for "switchy mac" queries and give users a support channel.
6. **Ask your existing customers** (you have organic, paying users!) for reviews on AlternativeTo/MacUpdate. A short post-purchase email works. Once real third-party reviews exist, `aggregateRating` can be added to the SoftwareApplication schema — never before (Google penalizes fabricated review markup).

## 3. Content roadmap (one post ≈ one query cluster)

Live now: keyboard-switching guide, Universal Control comparison, KVM guide, Mac mini setup guide. Next highest-volume clusters, in priority order:

1. **"Magic Keyboard not connecting to Mac"** — troubleshooting posts pull far more volume than product queries; soft CTA at the end.
2. **"Universal Control not working"** — same pattern; we already rank-adjacent with the comparison post.
3. **"How to unpair / forget a Magic Keyboard"** — step-by-step with screenshots.
4. **"Best Mac mini accessories (2026)"** — listicle including Magic devices + Switchy.
5. A **60-second demo video on YouTube** — video results appear for "switch magic keyboard between macs"; embed it on the landing page with `VideoObject` schema. The `Macbook A.mp4` hero footage is a good starting asset.

Rules that made the current pages work — keep following them: one intent per page, honest comparisons that name competitors, FAQ schema where the page genuinely answers questions, internal links between every related page, and dates in titles ("2026") for freshness signals.

## 4. Community (do genuinely, later)

The MacRumors thread "Best way to switch Magic keyboard and trackpad between Macs" ranks on page 1 for the money query. When you're ready for manual marketing: participate there and in r/macapps / r/mac **transparently as the developer** ("I built Switchy because…"). Honest dev posts do well; astroturfing gets deleted and damages the domain by association. Product Hunt launch: the new 1200×630 OG image and llms.txt are already in place for it.

## 5. Performance (Core Web Vitals feed rankings)

Known, not yet done (deliberately left out of the autonomous SEO pass to avoid destabilizing a revenue site):

- The JS bundle is **436 KB (149 KB gzip)** — three.js + GSAP + framer-motion, mostly for the 3D trackpad. Lazy-load the three.js scene (`React.lazy`/dynamic `import()`) so first paint doesn't pay for it.
- `Macbook A.mp4` is **3.8 MB** — re-encode (H.265/AV1 or lower bitrate H.264) and ensure `preload="none"` or lazy loading.
- Run `npx update-browserslist-db@latest` occasionally.
- Sanity-check with PageSpeed Insights after each change; mobile LCP is the number to watch.

## 6. Monitoring loop (weekly, 5 minutes)

1. GSC → Performance: which queries get impressions? Pages sitting at position 8–20 are one title-tweak or one internal link away from page 1.
2. GSC → Pages: confirm the 4 new URLs get indexed within ~2 weeks; re-request if not.
3. `site:mangobuns.com` spot check.
4. When a post ranks but gets few clicks → rewrite its `<title>`/meta description (that's CTR, not ranking).

## Technical reference (what was changed on-site, July 2026)

- Fixed corrupted em dash (`��`) in the homepage's crawlable FAQ text (was live in production).
- Created `/switchy/blog/` hub (was a 404 linked from every footer).
- 3 new content pages (Universal Control, KVM, Mac mini) with Article/FAQ/Breadcrumb JSON-LD, interlinked with the existing post + compare page.
- Unified both sitemaps (root = canonical, 9 URLs); refreshed `lastmod`.
- SoftwareApplication schema: version 1.0 → 1.1.4, added offer URL, real screenshot.
- New `og-image.png` (1200×630) used by all pages' OG/Twitter cards (was a square icon).
- `public-root/404.html` (custom 404), `public-root/llms.txt` (AI-crawler summary).
- Deploy workflow now copies the new root files and pings IndexNow (key `11e6eddaf51420669ed293a8c2ced8d7.txt` served at domain root) after every deploy.
