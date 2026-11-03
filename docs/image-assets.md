# Hive landing page assets

## Hero product film

`public/videos/hive-product-demo.mp4` is a silent 14.1-second Hyperframes film made from real Hive 4.9 application recordings captured on the Dell U2419HC display November 3, 2026. It is H.264, 1920 × 1080, 60fps, with fast-start metadata. The WebP poster is extracted from the rendered film.

Seven short beats show a persisted Done-to-Now pointer drag, a running thread's animated blue progress border, an actual built-in Chat exchange, the same conversation in Terminal Chat, native voice Listening and its measured waveform, a rich Markdown note entering Focus mode, and a scheduled reminder. The real chat responses use OpenCode's DeepSeek V4.1 Flash Free model. All sample work was authored for the demo. Task creation and setup are excluded; no transcription success is claimed. Every clip retains the full application content, trimming only the native OS titlebar. Animated focus zooms start from and return to that complete app view without reconstructing product UI.

The editable project, normalized source clips, source hashes, storyboard, and verification notes are in [`video/hive-demo`](../video/hive-demo/README.md). Hyperframes 0.9.8 is pinned in that isolated development package; the website does not load its runtime. Raw capture masters remain outside the checkout.

## Supporting product captures

The three `public/images/hive-{board,notes,focus}-dark.webp` files show the real Hive 4.9 WebUI components at source commit `9e935570` from Hive’s `origin/main`, captured November 3, 2026. They are 1280 × 720 browser captures, encoded as WebP at quality 94. Only dark captures are shipped.

These are product illustrations using authored sample work, not private user sessions. No interface is generated or reconstructed in landing-page HTML.

A temporary local Vite entry mounted the actual `App` through `HiveBridgeClient` and the existing `BoardAppTransport`. The existing `card`/`twoProjectSnapshot` fixtures supplied the board shape; authored Meridian/Studio project names, session titles, and notes replaced test placeholders. Native data and OpenCode servers were not connected. The product source was extracted into a scratch directory without changing a permanent Hive checkout.

- `board`: current navigation, project/worktree controls and Now/Queue/Done board.
- `notes`: current shared Notes library with authored notes and filters.
- `focus`: current visual Markdown editor with the sample note linked to its project, worktree and conversation. This name describes the landing-page view; it does not claim that the product’s Focus mode toggle is enabled.

## Opal material backdrop

`public/images/hive-opal-field.webp` is an original 1672 × 941 image generated with the built-in image generation tool, then encoded as WebP at quality 83. The dark-only page dims and desaturates it with CSS. It contains no text, brand mark or product UI. The original Hive app icon remains in the navigation and favicon; the large hero icon is removed.

Final generation prompt:

```text
Use case: stylized-concept. Asset type: wide atmospheric background texture for Hive, a modern Mac productivity app landing page. Create an exquisitely subtle abstract macro photograph / high-end 3D material study of translucent opaline glass sheets curving in a soft, spacious wave. Silver-white pearlescent light, cool mist, very restrained periwinkle and indigo at the outer edges, soft shadows that reveal real dimensional layers, almost tactile frosted glass with microscopic fine grain. Landscape 16:9 composition. Quiet pale center for dark headline text; more material detail in lower right and left edges, clean upper middle, no discrete objects. It should feel like an original Apple studio material photograph: smooth, dimensional, luminous, understated, contemporary. No stars, no galaxy, no planets, no neon, no circles, no hexagons, no geometry grid, no text, no logo, no UI, no mockup, no watermark. The result must be a beautiful photographic atmospheric surface, not a flat CSS radial gradient.
```

The old galaxy stills, onboarding strips, and generated orbit icon have been retired along with their renderers.
