# Hive landing page

A dark-only landing page for [Hive](https://github.com/Ajanth/hive-public), a local macOS workspace for OpenCode conversations, code, and context.

The page combines a recorded product film in the main hero with mixed-size bento stories, the repository workflow, privacy, FAQs, and a download close. Hive’s existing navigation brand stays; the large icon above the hero headline is removed. See [DESIGN.md](DESIGN.md) for the design decisions.

## Development

```bash
npm ci
npm run dev
```

Run `npm run lint` and `npm run build` before publishing. `npm run preview` serves the production build. The app is a static Vite build and requires no server-side runtime.

## Product film and interaction

The 14.1-second, 60fps film and WebP poster are ready in `public/videos/`. Seven quick beats show a real card drag, running thread progress, built-in Chat, Terminal Chat, voice recording, a note, and a reminder. Full-app views and smooth focus zooms preserve the workspace around each action. Its editable source and local render instructions are in [video/hive-demo/README.md](video/hive-demo/README.md).

`src/App.tsx` owns page content. `src/components/hero-video.tsx` owns a single 16:9 video element using `/videos/hive-product-demo.mp4` and `/videos/hive-product-demo-poster.webp`. The production composition uses real Hive recordings and is authored in Hyperframes. The text caption identifies demo work; it does not imply private user sessions appear in the film.

The player provides keyboard-accessible Play/Pause, Replay, and fullscreen controls. It loads its source only near the viewport and plays automatically only while visible and motion/data preferences allow it. Reduced Motion and Save-Data leave the poster visible until the user presses Play. Offscreen or hidden-tab playback pauses. Autoplay rejection leaves the explicit Play control available; failed media has a retry and direct-video link. Expanding reuses the same video element. Native details elements provide accessible FAQs.

The entire page stays dark regardless of system appearance or a previously saved theme choice. There is no theme toggle or theme storage. Below-fold product images load only their dark versions. Geist is self-hosted. A native IntersectionObserver reveals sections once; CSS handles the brief opening sequence. Reduced Motion removes entrance motion and transitions. Reduced Transparency uses opaque navigation. No WebGL, scroll listeners, analytics, or telemetry are included.

The supported runtime is OpenCode. Board, Chat, Terminal, Reminders, and Notes are current Hive surfaces. Product capture provenance is documented in [docs/image-assets.md](docs/image-assets.md).

## Downloads

Every download CTA reads the same public manifest at `https://ajanth.github.io/hive-public/release.json`, which the release workflow updates with the latest signed DMG. The public releases page remains usable while the manifest loads or if it cannot load.
