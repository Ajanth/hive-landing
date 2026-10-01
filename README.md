# Hive landing page

A landing page for [Hive](https://github.com/Ajanth/hive-public), a local macOS workspace for visualizing and organizing agent work.

The hero keeps Hive's wordmark, indigo palette, and galaxy. Five linked callouts explain notes, reminders, tasks, GitHub, and the board. Below it, a keyboard-accessible product tour shows Hive's own onboarding scenes, followed by context features, the repository workflow, privacy, FAQs, and a download section. The page explicitly identifies OpenCode as the currently supported history source.

Geist is self-hosted. A theme toggle follows system preference until a user selects light or dark. The entire page uses the same semantic color tokens and shape system: 8px controls and 12px elevated surfaces. Image provenance and the generated icon prompt are documented in [docs/image-assets.md](docs/image-assets.md).

## Development

```bash
npm install
npm run dev
```

Run `npm run lint` and `npm run build` before publishing. `npm run preview` serves the production build.

## Animation

`src/lib/galaxy-scene.ts` owns the desktop point cloud and animation loop, which also steps `src/lib/feature-orbit.ts`. Star orbits and displacement run in a vertex shader. Pointer events only record coordinates; smoothing, card springs, and wake sampling run once per frame, without React renders. Surface position is read while interacting so coordinates remain accurate after scrolling. Cards protect the hero text and their neighbors, settle under hover or keyboard focus, and the board responds with less motion.

Three.js loads separately from the hero copy and cards. At widths below 768px, `src/lib/galaxy-mobile.ts` draws 650 stars using Canvas2D at 30fps and avoids downloading WebGL. Both renderers cap pixel density, pause when hidden or offscreen, honor reduced motion, and dispose their resources on unmount. Breakpoint changes replace the canvas and renderer. Mobile shows three callouts, with all five capabilities explained further down the page.

CSS sequences the hero entrance, and isolated Motion components reveal sections and crossfade the product tour. Reduced motion disables entrances, springs, animated transitions, and smooth scrolling. The tour provides loading and error states with a retry action; horizontal image panning preserves readable product details on small screens.

If WebGL is unavailable, the page shows a responsive still captured from the same scene. These fallback images only load when needed.

## Content

Page copy lives in `src/App.tsx`, orbit callouts in `src/components/feature-orbit.tsx`, and tour content in `src/components/product-tour.tsx`. Every download CTA reads the same public manifest at `https://ajanth.github.io/hive-public/release.json`, which the Hive release workflow updates with the latest signed DMG URL after each release. If the manifest cannot load, the CTA opens the public releases page.
