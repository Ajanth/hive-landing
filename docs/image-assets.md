# Hive landing page assets

## Hero product film

`public/videos/hive-product-demo.mp4` is a silent 18.8-second Hyperframes film made from real Hive 4.9 application recordings captured on the Dell U2419HC display November 3, 2026. Footage and composition motion run at 0.75× the previous speed. It is H.264, 1920 × 1080, 60fps, with fast-start metadata. The WebP poster is extracted from the rendered film.

Seven short beats show a persisted Done-to-Now pointer drag, a running thread's animated blue progress border, an actual built-in Chat exchange, the same conversation in Terminal Chat, native voice Listening and its measured waveform, a rich Markdown note entering Focus mode, and a scheduled reminder. The real chat responses use OpenCode's DeepSeek V4.1 Flash Free model. All sample work was authored for the demo. Task creation and setup are excluded; no transcription success is claimed. Every clip retains the full application content, trimming only the native OS titlebar. Animated focus zooms start from and return to that complete app view without reconstructing product UI.

The editable project, normalized source clips, source hashes, storyboard, and verification notes are in [`video/hive-demo`](../video/hive-demo/README.md). Hyperframes 0.9.8 is pinned in that isolated development package; the website does not load its runtime. Raw capture masters remain outside the checkout.

## Supporting product captures

The three `public/images/hive-{board,notes,focus}-dark.webp` files show the real Hive 4.9 WebUI components at source commit `9e935570` from Hive’s `origin/main`, captured November 3, 2026. They are 1280 × 720 browser captures, encoded as WebP at quality 94. Only dark captures are shipped.

These are product illustrations using authored sample work, not private user sessions. No interface is generated or reconstructed in landing-page HTML.

A temporary local Vite entry mounted the actual `App` through `HiveBridgeClient` and the existing `BoardAppTransport`. The existing `card`/`twoProjectSnapshot` fixtures supplied the board shape; authored Meridian/Studio project names, session titles, and notes replaced test placeholders. Native data and OpenCode servers were not connected. The product source was extracted into a scratch directory without changing a permanent Hive checkout.

- `board`: current navigation, project/worktree controls and Now/Queue/Done board.
- `notes`: current shared Notes library with authored notes and filters.
- `focus`: current visual Markdown editor with the sample note linked to its project, worktree and conversation. This name describes the landing-page view; it does not claim that the product’s Focus mode toggle is enabled.

## Film stills for product stories

`public/images/hive-{chat,terminal,reminder}-dark.webp` are real stills extracted at 1.0 seconds from the corresponding normalized clips in `video/hive-demo/assets/montage/`. They are 1900 × 1070 WebP images at quality 90. CSS focuses the supporting stills around the conversation, terminal content, and reminder card. The approved hero film retains its full-app framing.

## Indigo paint wash

The moving background is authored with native CSS gradients and transform animations in `src/index.css`, using Hive’s existing indigo accent and neutral graphite. It follows the film’s playing state, pauses with the media, and remains still under Reduced Motion. No external image or animation runtime is loaded. The old generated Opal field has been retired.

The original Hive app icon remains in the navigation and favicon. No app icon or wordmark appears in the footer.
