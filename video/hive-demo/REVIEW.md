# Another30% slowdown review

Verified 2026-11-04. The prior18.8-second full-app film is slowed by approximately another30% to26.85 seconds,1611frames,60fps. Cumulative cuts are [0,274,469,720,971,1177,1383,1611]; per-scene frames are [274,195,251,251,206,206,228]. This whole-frame schedule differs from exact0.70× playback by less than one frame.

Raw source hashes, sourceStart/sourceWindow values, crops and output dimensions are unchanged against83a1719. Per-shot media rates equal rawWindow/(newFrames/60); every camera and label timing scales by newFrames/previousFrames. Focus targets, easing and complete-app framing are unchanged. No recording, app or provider call was performed.

Verification: ingest syntax, Git whitespace and Hyperframes lint pass. Browser-backed Hyperframes check passes (`ok:true`,`browserSkipped:false`); the expected `film_silent` warning reflects the intentionally silent hero. Exact source/frame/timing comparisons pass. Six representative source and encoded frames retain the wide Board/drop, running and Chat focus, Voice control and final full-app overview. Evidence is in `.hyperframes/artifacts/slow70-framing/contact-sheet.jpg` and `.hyperframes/artifacts/encoded70/representative.png`.

The Hyperframes delivery render passes. FFprobe confirms H.264,yuv420p,1920×1080,60/1fps,1611frames,26.850000s,video-only. Full FFmpeg decode is clean; `moov` precedes `mdat` for fast-start playback. The poster remains the full-app opening frame at its correspondingly retimed instant.

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| `renders/hive-product-demo.mp4` | 10,407,521 | `bacafb3f5ec3ad1981f8187329da276c36aada613df9dda2a83b1a70ffd19867` |
| `renders/hive-product-demo-poster.webp` | 29,000 | `4a7e004bcadc43d7309f4d7c52fbb1cc1677ea4243fce8264b093d1fb1acaf53` |

The same editable source preview remains running at http://localhost:5187/#project/hive-demo. The integration owner copies final media to the landing page and updates external captions/VTT against the exact frame schedule above. The source remains editable in the preview or HyperFrames desktop app.
