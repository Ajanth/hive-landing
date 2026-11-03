# Hive product montage

An editable, local Hyperframes 0.9.8 project for the dark Hive landing-page hero. The 14.1-second edit shows seven quick actions: a Board drag/drop, a running thread, built-in Chat, Terminal Chat, voice recording, one note and one reminder. It uses actual Hive 4.9 recordings from the external Dell monitor.

```bash
npm ci
npm run ingest -- --board-drag /absolute/board-physical.mov --board-drag-crop 1900:980:0:40 --board-drag-start 3.7
npm run ingest -- --running-thread /absolute/running-terminal.mov --running-thread-crop 450:110:60:465 --running-thread-pad 800:450 --running-thread-start 9
npm run ingest -- --chat /absolute/chat.mov --chat-crop 1530:980:370:40 --chat-start 7.2 --chat-speed 1.4
npm run ingest -- --terminal /absolute/terminal.mov --terminal-crop 1240:930:305:40 --terminal-start 3.7
npm run ingest -- --voice /absolute/voice.mov --voice-crop 1000:260:700:760 --voice-start 7
npm run ingest -- --note /absolute/note.mov --note-crop 1900:980:0:40 --note-start 3.4
npm run ingest -- --reminder /absolute/reminder.mov --reminder-crop 400:200:790:130 --reminder-pad 800:450 --reminder-start 0.5
npm run lint
npm run check
npm run review
npm run dev
npm run render
npm run poster
```

These values reproduce the delivered action windows from the recorded source masters. New captures need their own visually verified windows. `shots.json` owns the cut list. Each `--<shot>-start` selects the action, `--<shot>-speed` makes an explicit editorial rate change, and optional `--<shot>-crop width:height:x:y` removes native window chrome. `--<shot>-pad width:height` can center a tight real-control crop on a larger graphite canvas without clipping adjacent controls. Ingest refuses crops and time windows outside the supplied source. Output preserves native cropped pixel resolution, pads to16:9 when necessary, and writes silent H.264 at60fps. The source basename, hash, dimensions, crop, time window and speed are recorded in `assets/sources.json`.

The small normalized clips in `assets/montage` and local font/runtime travel with the editable project. Raw masters stay outside the checkout. Rendering is local; the site loads only the rendered MP4 and poster, not Hyperframes. There are no cloud uploads or fabricated app states.

`SPEC.md` and `STORYBOARD.md` define the edit; `REVIEW.md` records acceptance evidence. Delivery is 1920 × 1080,60fps,846frames, silent for muted autoplay. The webpage provides Play/Pause, Replay and fullscreen inspection. `renders/hive-product-demo.mp4` and its encoded-frame WebP poster are copied to the website by the integration owner. Cache, thumbnails, node_modules and rendered outputs are ignored.
