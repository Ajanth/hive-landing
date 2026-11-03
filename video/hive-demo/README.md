# Hive product film

An editable local Hyperframes 0.9.8 project for the dark landing-page hero. Seven real Hive 4.9 feature beats play in 14.1 seconds at 60fps. Each scene establishes the full application, smoothly zooms toward its action, then returns to the full application before the cut. The Board drag stays wide throughout so pickup, all three state columns and the completed drop remain visible.

```bash
npm ci
npm run ingest -- --board-drag /absolute/board-physical.mov --board-drag-crop 1900:980:0:40 --board-drag-start 3.7
npm run ingest -- --running-thread /absolute/running-terminal.mov --running-thread-crop 1900:980:0:40 --running-thread-start 9
npm run ingest -- --chat /absolute/chat.mov --chat-crop 1900:980:0:40 --chat-start 7.2 --chat-speed 1.4
npm run ingest -- --terminal /absolute/terminal.mov --terminal-crop 1900:980:0:40 --terminal-start 3.7
npm run ingest -- --voice /absolute/voice.mov --voice-crop 1900:980:0:40 --voice-start 7
npm run ingest -- --note /absolute/note.mov --note-crop 1900:980:0:40 --note-start 3.4
npm run ingest -- --reminder /absolute/reminder.mov --reminder-crop 1900:980:0:40 --reminder-start 0.5
npm run lint
npm run check
npm run review
npm run dev
npm run render
npm run poster
```

The source masters were captured on the external Dell monitor while operating Hive through agent-desktop. These commands preserve the delivered action windows and rates. Every source uses the same full-app crop, removing only the 40px native OS titlebar. Ingest preserves the native 1900 × 980 product pixels inside 1900 × 1070 graphite padding, writes silent H.264 at 60fps, verifies the exact frame count and records source/output hashes in `assets/sources.json`. No app navigation, sidebar, control or column is removed from the normalized clips.

`shots.json` owns the cut list. Each scene HTML owns its explicit camera timing and target. `object-fit: contain` keeps the entire app visible at scale 1; the focus zooms use a paused seek-safe GSAP timeline and always return to that overview. The note’s recorded native Focus mode hides navigation itself; the editorial framing still preserves the complete application window. `SPEC.md`, `STORYBOARD.md` and `REVIEW.md` document the design and evidence.

Normalized clips, the local font and GSAP runtime travel with the editable project. Raw masters stay outside the checkout. Rendering is local, with no cloud media upload or fabricated product state. The website loads only the rendered MP4 and full-app poster, not the Hyperframes runtime. Silence is intentional for the muted-autoplay hero.

Delivery is 1920 × 1080, 60fps, 846 frames, 14.1 seconds. The webpage supplies Play/Pause, Replay and fullscreen. The integration owner copies `renders/hive-product-demo.mp4` and `renders/hive-product-demo-poster.webp` to the website’s public media directory. Cache, thumbnails, node_modules and rendered outputs are ignored.
