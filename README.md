# Hive landing page

A dark-only landing page for [Hive](https://github.com/Ajanth/hive-public), a local macOS workspace for OpenCode conversations, code, and context.

Five focused sections introduce Hive through the product film, Board, Chat and Terminal, Notes, then Reminders. A moving indigo paint wash frames the product; the footer contains only text and links. Hive’s navigation brand stays. See [DESIGN.md](DESIGN.md) for the design decisions.

## Development

```bash
npm ci
npm run dev
```

Use Node 22.18 or later. Run `npm test`, `npm run lint`, and `npm run build` before publishing. `npm run preview` serves the production build. The app is a static Vite build and requires no server-side runtime.

## Product film and interaction

The 26.85-second, 60fps film and WebP poster are ready in `public/videos/`. Seven quick beats show a real card drag, running thread progress, built-in Chat, Terminal Chat, voice recording, a note, and a reminder. The film runs about 30% slower than the previous 18.8-second cut, with full-app views and smooth focus zooms preserving the workspace around each action. Its editable source and local render instructions are in [video/hive-demo/README.md](video/hive-demo/README.md).

`src/App.tsx` owns page content. `src/components/hero-video.tsx` owns a single 16:9 video element using `/videos/hive-product-demo.mp4` and `/videos/hive-product-demo-poster.webp`. The production composition uses real Hive recordings and is authored in Hyperframes. A scene title and complete sentence appear above the video for each of the seven scenes, synchronized to the exact 60fps cut points through `src/lib/demo-captions.ts`. Captions follow seeking, replay, and looping. They reserve a stable height and avoid unsolicited screen-reader announcements; a static accessible description identifies the demo work. A WebVTT track provides the same sentences for native caption controls.

The player provides keyboard-accessible Play/Pause, Replay, and fullscreen controls. It loads its source only near the viewport and plays automatically only while visible and motion/data preferences allow it. Reduced Motion and Save-Data leave the poster visible until the user presses Play. Offscreen or hidden-tab playback pauses. Autoplay rejection leaves the explicit Play control available; failed media has a retry and direct-video link. Expanding reuses the same video element. Pausing the film also pauses both background wash animations; offscreen playback pauses them together.

The entire page stays dark regardless of system appearance or a previously saved theme choice. There is no theme toggle or theme storage. Below-fold product images load only their dark versions. Geist is self-hosted. A native IntersectionObserver reveals sections once. CSS transforms move the broad paint wash without a rendering dependency. Reduced Motion freezes the wash and removes entrance motion and transitions. No WebGL, scroll listeners, analytics, or telemetry are included.

The supported runtime is OpenCode. Board, Chat, Terminal, Reminders, and Notes are current Hive surfaces. Product capture provenance is documented in [docs/image-assets.md](docs/image-assets.md).

## Downloads

Every download CTA reads the same public manifest at `https://ajanth.github.io/hive-public/release.json`, which the release workflow updates with the latest signed DMG. The public releases page remains usable while the manifest loads or if it cannot load.
