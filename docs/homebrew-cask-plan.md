# Homebrew Cask Plan — Switchy

Status: ready to execute (licensing shipped in v1.1.4 build 70 on 2026-07-10 made this viable).
Cask draft (audit-tested except for the URL change below): `docs/homebrew-cask-switchy.rb.draft`.

## Why this is worth doing

- **Distribution to the exact target demographic.** Multi-Mac users skew developer/power-user, and
  Homebrew is how that demographic installs Mac apps. `brew install --cask switchy` is zero-friction:
  no browser, no DMG-dragging. The cask installs the app; the 3-day trial and in-app Lemon Squeezy
  purchase work exactly as with a manual download — Homebrew never touches licensing.
- **Discovery inside the ecosystem.** `brew search switchy` / `brew search keyboard`, plus the
  auto-generated page at `formulae.brew.sh/cask/switchy` (indexed by Google, links our homepage —
  a high-authority backlink that also feeds the homepage-ranking goal in the SEO playbook).
- **Legitimacy signal.** Being in homebrew-cask reads as "real, maintained software" to developers
  and to the directory/AI-recommendation ecosystem that scrapes it.

## How users find the install command

1. **Our site (primary):** after the cask is merged, add the one-liner next to the download button
   (homepage download/CTA area and the FAQ trial answer):
   `brew install --cask switchy`
   Developers who see a brew one-liner on a product page trust and use it; everyone else ignores it.
2. **Homebrew itself:** `brew search`, `formulae.brew.sh` (indexed), and analytics-driven lists that
   surface new casks.
3. **Third-party roundups** ("best brew casks", awesome-lists) that scrape the cask repo over time.

## Blockers found in the first attempt (2026-07-10) and their fixes

1. ~~Paid download, no license activation~~ → **fixed** by build 70 (trial + LS keys).
2. **GitHub notability audit**: `brew audit --new` rejects github.com download URLs from repos with
   <75 stars. Fix: serve the cask's DMG from mangobuns.com (first-party domain, no audit, no
   `verified:` stanza needed). The trial DMG already lives there; the cask needs a *versioned* copy.
3. **Version ambiguity**: short version 1.1.4 spans many builds (59–70). A cask URL keyed on
   "1.1.4" breaks when a same-version build ships (sha changes, URL doesn't). Fix below.

## Execution steps (next session)

1. **Versioned download copies.** From the next stable release, `switchy-build` step 7 also writes
   `public/downloads/Switchy-{VERSION}.{BUILD}.dmg` (e.g. `Switchy-1.1.5.71.dmg`) alongside the
   stable-named `Switchy.dmg`. Old versioned copies stay forever (Homebrew may fetch them for
   rollbacks; each is ~3.4 MB in the repo — acceptable; prune very old ones if the repo ever nears
   GitHub Pages' 1 GB soft limit). Backfill build 70 now with `Switchy-1.1.4.70.dmg` if submitting
   before the next release.
2. **Update the cask draft** (`docs/homebrew-cask-switchy.rb.draft`):
   - `version "1.1.4,70"` (short,build)
   - `url "https://mangobuns.com/switchy/downloads/Switchy-#{version.csv.first}.#{version.csv.second}.dmg"`
     (no `verified:` — homepage domain matches)
   - fresh `sha256` of the versioned file
   - keep: Sparkle livecheck with `item.channel.nil?` filter (ignores beta channel),
     `auto_updates true`, `depends_on macos: :sonoma`, zap paths
     (`~/Library/HTTPStorages/com.mangobuns.Switchy`, `~/Library/Preferences/com.mangobuns.Switchy.plist`).
3. **Local validation** (all must pass before the PR):
   ```bash
   git clone --filter=tree:0 https://github.com/Homebrew/homebrew-cask \
     "$(brew --repository)/Library/Taps/homebrew/homebrew-cask"
   # copy cask to Casks/s/switchy.rb inside the tap, then:
   export HOMEBREW_NO_INSTALL_FROM_API=1
   brew style --fix homebrew/cask/switchy
   brew audit --new --cask switchy
   brew livecheck --cask switchy        # should print 1.1.4,70
   brew install --cask switchy --appdir=/tmp/brew-test   # avoid clobbering /Applications/Switchy.app
   ```
4. **Submit**: fork Homebrew/homebrew-cask (`gh repo fork`), branch, single commit
   `switchy 1.1.4 (new cask)`, PR using the repo's PR template with only truthfully-checked boxes.
   Respond to CI/maintainer feedback (common asks: livecheck simplification, desc wording).
   Afterwards: `brew untap homebrew/cask homebrew/core` to restore normal brew operation.
5. **After merge**:
   - Add `brew install --cask switchy` to the homepage download area + FAQ, and to the SEO log.
   - Future version bumps: `brew bump-cask-pr switchy --version X.Y.Z,BUILD` after each stable
     release (or let Homebrew's autobump/livecheck open it) — works automatically as long as the
     versioned DMG exists at the constructed URL, which step 1 guarantees.

## Risks

- Maintainers occasionally push back on new casks from small vendors even when audits pass;
  a working trial, notarized app, and real homepage make acceptance likely. If rejected, we can
  self-host a tap (`benhursenabathi/homebrew-switchy` → `brew install benhursenabathi/switchy/switchy`)
  and still put the one-liner on the site — most of the funnel benefit, none of the gatekeeping.
