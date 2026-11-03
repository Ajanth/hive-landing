# 75% playback review

Verified 2026-11-03. The full-app film is uniformly slowed to 75% of its previous speed: 18.8 seconds,1128frames,60fps. Exact scene frame durations are [192,136,176,176,144,144,160]. The seven original source masters, hashes, raw windows, full-app crops, focus targets and easing are unchanged. Media rates are previous×0.75 (Chat1.05×; all others0.75×); every camera, label, hold and cut time is previous÷0.75.

Verification:

- Programmatic comparison against `8225a41` confirms unchanged raw hashes/windows/crops/dimensions, uniformly scaled media/camera/label timing, unchanged focus targets and exact normalized60fps frame counts totaling1128.
- Ingest syntax and Git whitespace checks pass. Hyperframes lint reports zero errors/warnings.
- Browser-backed Hyperframes check passes: `ok:true`, `browserSkipped:false`. Its expected `film_silent` craft warning reflects the intentionally silent muted-autoplay hero.
- Six representative source snapshots and the corresponding encoded frames were inspected at retimed establishing, drop, running, Chat, Voice and final pullback instants. Full-app framing and focus/pullback geometry are preserved. Evidence: `.hyperframes/artifacts/slow-framing/contact-sheet.jpg` and `.hyperframes/artifacts/encoded-slow/representative.png`.
- Hyperframes delivery render passes. FFprobe confirms H.264,yuv420p,1920×1080,60/1fps,1128frames,18.800000s,video-only. Full FFmpeg decode is clean. `moov` precedes `mdat` for fast-start playback.
- Poster remains an encoded full-app opening frame, retimed from0.05s to approximately0.066667s.

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| `renders/hive-product-demo.mp4` | 7,806,164 | `75d1b6fa10fc2e09c1fa81efae22a03a01ba82999c57744dbd2d092f7757ae76` |
| `renders/hive-product-demo-poster.webp` | 28,856 | `2463f0af5c71dbe737d26d055af55d4a8d08088b876571f7bc55ffb0910cb57b` |

The same editable source preview remains running at http://localhost:5187/#project/hive-demo. No recording, Hive/model call or new media generation was performed. The integration owner copies the final MP4 and poster into the landing page. Local source remains editable in the preview or HyperFrames desktop app.
