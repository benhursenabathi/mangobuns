# Photo-based bubble handoff

- **Status:** Done
- **Commit:** `4c3c862`
- **Severity:** HIGH
- **Category:** Physicality & origin
- **Estimated scope:** 2 source files + 1 copied image asset; 4–6 hours including responsive feel checks

## Problem

The switching story currently has several competing visual systems: a Three.js MacBook scene, simulated macOS UI, a grid, concentric circles, an orange glow, animated accessory cutouts, and status chrome. That makes the core idea—three accessories moving from one real Mac to another—feel abstract and visually synthetic.

The current component explicitly loads the 3D stage:

```jsx
const MacBookStage = lazy(() => import('./MacBook3D'))
```

and renders it alongside decorative scaffolding:

```jsx
<div className="switch-story__grid" aria-hidden="true" />
<div className="switch-story__orbit" aria-hidden="true" />
<MacBookStage
  macARef={macARef}
  macBRef={macBRef}
  lidStateRef={lidStateRef}
  appearanceRef={appearanceRef}
  onReady={handleStageReady}
/>
<div className="switch-story__arc-glow" ref={lineRef} aria-hidden="true" />
```

The useful part is already present: `updateDevicesAlongArc` calculates a reversible quadratic Bézier path, applies staggered progress to keyboard, trackpad, and mouse, and banks each item with the curve. That motion logic should be retained, but its endpoints should be real positions inside the supplied photograph rather than 3D model bounds.

## Target experience

Use `/Users/benhur/Desktop/Switchy animated move.png` (1672×941) as one quiet, photographic stage. Remove the 3D MacBooks, fake screen UI, grid, orbit rings, and orange arc glow from this section.

The user should perceive one physical action:

1. A translucent bubble forms over the left MacBook lid.
2. The Magic Keyboard emerges inside it and follows a high, smooth arc.
3. Trackpad and mouse follow the same path, staggered in that order.
4. Each bubble gently contracts into the right MacBook lid.
5. Reverse scrolling traces the exact same path back, including the bubble formation/collapse.

Keep the existing narrative copy sequence (`Let go.`, the three `Check.` states, and `All yours.`) and scroll-scrub interaction. Keep the existing final status and scroll prompt for this pass because the request says other aspects should remain the same. Do not add a new background illustration, line, ring, simulated window, or laptop UI.

## Exact motion values

Use deterministic scroll-progress curves rather than time-based entrance springs so the story remains fully reversible.

```js
const PHOTO = {
  aspectRatio: 1672 / 941,
  source: { x: 0.332, y: 0.50 },
  target: { x: 0.685, y: 0.502 },
}

const ARC = {
  travelDuration: 0.42,
  deviceStagger: 0.09,
  bankFactor: 0.18,
  desktopControl: { x: 0.505, y: 0.12 },
  mobileControl: { x: 0.505, y: 0.16 },
  deviceScaleAtLid: 0.68,
  deviceScaleAtApex: 1,
  bubbleInEnd: 0.12,
  bubbleOutStart: 0.86,
  bubbleRestScale: 0.92,
  bubblePeakScale: 1.04,
}
```

- Continue using the current quadratic Bézier calculation and `easeInOutCubic` for path position.
- Preserve the current `scrub: 0.65`, `.42` travel duration, `.09` device stagger, device order, and individual tilts.
- Map outer travel scale from `.68` at each lid to `1` at the arc apex with `0.68 + 0.32 * Math.sin(Math.PI * easedProgress)`.
- Bubble formation, local progress `0 → .12`: opacity `0 → 1`; scale `.92 → 1.04 → 1`. Implement the small overshoot as two deterministic progress ranges, not a time-based spring.
- Bubble absorption, local progress `.86 → 1`: opacity `1 → 0`; scale `1 → .92`.
- Never scale an element to `0`; the smallest scale is `.92` for the bubble and `.68` for the outer travel wrapper.
- Animate only `transform` and `opacity`. Do not animate width, height, top, left, blur, border radius, or box shadow.
- Use full GSAP `transform` output for the moving wrapper; avoid adding Framer Motion shorthand transforms to this section.
- Keep copy transitions on their current scroll positions. If their blur remains, cap it at the existing `3px` and do not add further blur to moving accessories.

## Visual material

The bubble is one restrained glass surface, not a second UI card:

```css
background: rgba(255, 255, 255, 0.72);
border: 1px solid rgba(255, 255, 255, 0.82);
border-radius: 999px;
box-shadow:
  0 20px 50px rgba(50, 48, 58, 0.18),
  inset 0 1px 0 rgba(255, 255, 255, 0.9);
backdrop-filter: blur(16px) saturate(1.08);
```

- Make each bubble circular with `aspect-ratio: 1`, grid centering, and `14%` internal padding.
- Keep the source PNG artwork fully visible inside the bubble; do not recolor it or add labels.
- Replace the current heavy accessory drop shadow with `drop-shadow(0 10px 18px rgba(35, 34, 42, 0.16))`.
- The section background should match the photo edge (`#fff` unless the copied asset samples differently at execution time). Do not add a contrasting card or vignette around the image.
- The photograph must use `object-fit: contain`; never crop a laptop, hand, or lid.

## Repository conventions to preserve

- React functional components and refs in `src/components`.
- GSAP + `ScrollTrigger` for this section's scroll-driven motion.
- BEM-style selectors in `src/index.css`.
- Public assets referenced through `import.meta.env.BASE_URL`.
- Existing `760px` responsive breakpoint and `prefers-reduced-motion` branch.
- Existing `DeviceAsset` component and `Keyboard_transparent.png`, `Trackpad_transparent.png`, and `Mouse_transparent.png` files.

## Implementation steps

### 1. Add the photographic stage asset

Copy:

```text
/Users/benhur/Desktop/Switchy animated move.png
```

to:

```text
public/images/switchy-animated-move.png
```

Keep the original 1672×941 dimensions and PNG quality. Do not re-encode it in this pass.

### 2. Replace the 3D stage in `src/components/SwitchingStory.jsx`

- Remove `lazy`, `Suspense`, `useCallback`, `useState`, and the `MacBook3D` import.
- Remove `LID`, `MACS`, `CONNECTION`, `stageReady`, `handleStageReady`, `lidStateRef`, `appearanceRef`, `macARef`, `macBRef`, and `lineRef`.
- Add `photoStageRef`, `sourceAnchorRef`, and `targetAnchorRef`.
- Render one `.switch-story__photo-stage` containing:
  - the supplied image;
  - an absolute, normalized source anchor at `33.2% 50%`;
  - an absolute, normalized target anchor at `68.5% 50.2%`.
- The anchors are measurement points only: `1px × 1px`, transparent, and `aria-hidden="true"`.
- Set the image source with `${import.meta.env.BASE_URL}images/switchy-animated-move.png`.
- On image load, call `ScrollTrigger.refresh()` so the first path measurement uses the final intrinsic image size.
- Remove the grid, orbit, 3D fallback, `MacBookStage`, and arc-glow markup.
- Keep the existing copy frames, final status, and scroll prompt.
- Wrap each `DeviceAsset` in `.switch-story__device-bubble` so the outer element owns path transform/opacity and the inner element owns the bubble pop/contract transform. Mark the moving visual wrappers `aria-hidden="true"` to prevent repeated screen-reader announcements.
- Remove `aria-live="polite"` from the scroll copy. Add one visually hidden static sentence near the section heading: “Switchy transfers your Magic Keyboard, Trackpad, and Mouse from one Mac to another.” This conveys the same information without announcing every scrubbed frame.

### 3. Retarget the existing Bézier calculation

Inside `updateDevicesAlongArc`:

- Read `sourceAnchorRef` and `targetAnchorRef` bounding rectangles instead of the two 3D MacBook rectangles.
- Calculate both points relative to `sceneRef` exactly as the current code does.
- Remove `ARC.endpointYOffset`; the percentage anchors already sit on the lids.
- Calculate the control point relative to `.switch-story__photo-stage`, then translate it into scene coordinates. This prevents the curve drifting when the photo is centered or enlarged at a breakpoint.
- Continue using `easeInOutCubic`, tangent banking, current tilt values, current device order, and current stagger.
- Apply path translation/rotation/outer scale/outer opacity to `.switch-story__device`.
- Apply reversible bubble scale/opacity to the nested `.switch-story__device-bubble` with a separate `gsap.set`.
- Do not derive the bubble state from scroll direction. Derive it only from local path progress so reversing the scrollbar is mechanically identical.

### 4. Simplify the scroll timeline

- Start timeline construction as soon as the component is mounted; do not wait for a Three.js ready flag.
- Keep `start: 'top top'`, `end: 'bottom bottom'`, `scrub: 0.65`, and `invalidateOnRefresh: true`.
- Remove all MacBook entrance, lid, appearance, and connection-glow tweens.
- Retain only copy-state transitions and final-status reveal.
- Call the path updater from `onUpdate` and `onRefresh` as today.
- On photo `load`, refresh `ScrollTrigger` once; do not attach a persistent resize listener because `invalidateOnRefresh` already covers refreshes.

### 5. Replace section presentation rules in `src/index.css`

- Keep `.switch-story` at `500vh` on desktop and `430vh` at `≤760px` so pacing is unchanged.
- Set the section/sticky background to the photo edge color and remove the grid/orbit/glow rules used only by this section.
- Add a centered photo wrapper:

```css
.switch-story__photo-stage {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(100vw, calc(100vh * 1.7768), 1672px);
  aspect-ratio: 1672 / 941;
  transform: translate(-50%, -50%);
}
```

- At `≤760px`, use `width: min(118vw, calc(92svh * 1.7768))`. The symmetric 9% side overflow makes the laptops legible while keeping both fully visible because they occupy approximately `18%–86%` of the source image.
- Make `.switch-story__photo` fill the wrapper with `display:block; width:100%; height:100%; object-fit:contain`.
- Place the source/target anchors with percentages, not viewport units.
- Keep the copy above the moving devices (`z-index: 20`) and the devices above the photograph (`z-index: 10`).
- Add the bubble material exactly as specified above.
- Remove the `.switch-story__canvas`, `.switch-story__mac*`, `.macbook-view*`, `.switch-story__grid`, `.switch-story__orbit`, and `.switch-story__arc-glow` rules only after confirming none are used by another component. Do not delete shared `.orbit` or `.grid` primitives.
- Preserve the final status and scroll-prompt styles for this pass.

### 6. Reduced motion

For `prefers-reduced-motion: reduce`:

- Keep `.switch-story { height: 100vh; }`.
- Show the photo and the final `All yours.` copy immediately.
- Keep all three traveling bubble wrappers at `opacity: 0` and remove their transforms.
- Show the existing final status without translation.
- Do not run a ScrollTrigger timeline or any spatial motion.
- A short `opacity 200ms var(--ease-out)` is acceptable when the section first appears; no translation, scaling, or path motion.

## Boundaries

- Do not alter the supplied photograph.
- Do not redesign copy, CTA, nav, demo, bento, FAQ, or footer sections.
- Do not uninstall `three`, `@react-three/fiber`, or `@react-three/drei`; dependency cleanup is a separate task and may affect other work.
- Do not delete `src/components/MacBook3D.jsx` or the GLB model in this pass. Remove only this section's import and usage, leaving cleanup reversible.
- Do not change the accessory PNG assets or the shared `DeviceAsset` component.
- Do not introduce Framer Motion into this section.

## Verification

### Mechanical checks

```bash
npm run build
git diff --check
rg -n "MacBookStage|MacBook3D|switch-story__canvas|switch-story__arc-glow" src/components/SwitchingStory.jsx
```

The final `rg` should produce no matches in `SwitchingStory.jsx`.

### Responsive checks

Inspect the existing page at these representative viewports:

- `1319 × 1323` — current annotated desktop context
- `1035 × 1125` — compact desktop/tablet context
- `665 × 862` — current mobile context

At every size, both laptops must remain fully visible, and each endpoint must stay on its corresponding lid after resizing and after `ScrollTrigger.refresh()`.

### Feel check at 10% playback speed

- The keyboard bubble visibly originates on the left lid; there is no one-frame teleport.
- Trackpad and mouse follow at `.09` scroll-progress intervals.
- The curve is one continuous high arc, not three different paths.
- The device banks with the tangent and never snaps rotation at the apex.
- Each bubble grows only to `1.04`, settles, and contracts to `.92`; no rubbery bounce or scale-to-zero flash.
- The device is fully inside the bubble throughout travel.
- The destination absorption lands on the right lid, not beside or below it.
- Reverse scrolling reproduces the same states in the opposite order with no hysteresis.
- The text remains readable above the moving layer; the devices never obscure it.
- The image edge disappears into the section background with no visible card seam.

### Accessibility and motion preferences

- With reduced motion enabled, no accessory translates, scales, banks, or follows a path.
- The static explanatory sentence is available to assistive technology.
- Scrubbing the section does not create repeated live-region announcements.

## Done when

The section shows the supplied two-Mac photograph as its only stage, contains no 3D/custom-computer UI or decorative grid/orbit/glow, and the three real accessory assets emerge in translucent bubbles from the left lid, follow the existing staggered Bézier trajectory, and collapse into the right lid. The interaction is reversible, responsive, build-clean, and has a useful reduced-motion equivalent.
