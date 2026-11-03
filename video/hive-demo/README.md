# Hive product film

An editable, local Hyperframes 0.9.8 project for the dark Hive landing-page hero. The composition uses real Hive 4.9 screen recordings supplied by the capture workflow. It does not recreate product UI or animate still screenshots as a substitute for footage.

```bash
npm ci
npm run ingest -- --chat /absolute/chat.mov --chat-crop 2880:1524:112:172
npm run ingest -- --board /absolute/board.mov --board-crop 2880:1524:112:172
npm run ingest -- --voice /absolute/voice-take2.mov --voice-crop 2880:1524:112:172
npm run lint
npm run check
npm run review
npm run dev
npm run render
npm run poster
```

The clips preserve native cropped pixel resolution in silent H.264 with 16:9 graphite padding and are listed with source hashes in `assets/sources.json`. The source filenames, dimensions and durations remain visible there; camera anchors and source offsets live in the scene HTML. `SPEC.md` and `STORYBOARD.md` describe the edit. `REVIEW.md` records the visual review and validation.

Chat shows composing a real draft. Board shows starring and menu inspection. Voice shows the actual Listening state and measured waveform; the film excludes the transcription result. The three source windows play at their recorded rate after source trims. Silence is intentional for a muted autoplay hero.

Rendering is local. There are no cloud uploads, paid generation calls or fabricated product states. The master is 1920 × 1080 at 30fps. `renders/hive-product-demo.mp4` is the web deliverable and `renders/hive-product-demo-poster.webp` is extracted from that rendered file. The small normalized recordings and source-hash ledger travel with the editable project. Renderer caches, node_modules and rendered outputs are ignored by Git; the raw capture masters should be preserved outside the source checkout with the delivered media.

The motion geometry adapts Hyperframes’ `ui-focus-zoom` and `cut-the-curve` registry primitives from commit `9ceced05e280b0046e4e7b90a74c145cb4ec3161`; their fake skeleton examples and halo/filter treatment are not used. GSAP 3.15.0 and Geist’s existing project font are local assets, so delivery rendering does not depend on a CDN.
