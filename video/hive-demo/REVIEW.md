# Full-app camera review

Reviewed 2026-11-03. Accepted for integration after restoring the original full-app establishing → smooth focus zoom → pullback camera language. The seven feature beats remain 14.1 seconds at 1920 × 1080, 60fps, 846 frames. No new recording or desktop interaction was performed for this revision.

## Full-app fidelity

All seven clips were re-ingested from the preserved Dell masters with exactly `1900:980:0:40`. Only the native OS titlebar is trimmed. Every normalized clip is 1900 × 1070 and retains the complete 1900 × 980 product UI inside graphite padding. Master SHA-256 values, source time windows and playback rates were verified unchanged against `ba0924b`.

Every scene uses `object-fit: contain`. The overview is exactly `xPercent:0,yPercent:0,scale:1`; at that state the full app and its window edges fit inside the product viewport. Product sidebars, controls, columns and conversations are not permanently cropped out. Detail views are temporary reversible camera transforms on the full source.

The Board stays at overview scale through the entire physical drag, preserving all three columns, pickup, motion and persisted Done → Now drop. Each remaining scene establishes the complete app, moves toward its action with `power2.inOut`, holds briefly, and returns to the complete app at least 0.2 seconds before the cut. Sliding fragments and permanent isolated-card/composer views were removed. Exact focus targets and local camera times are recorded in `SPEC.md`.

The note enters the product’s actual Focus mode during the recording. That native mode hides navigation itself; the end frame still shows the complete recorded window and its Focus toolbar. No navigation is invented or overlaid.

## Required-action coverage

- Board: one real pointer drag from Done to Now, with the destination retained after release; no task creation.
- In progress: the actual thread card during the real request, with native blue rim animation and blue status dot. The source evidence distinguishes that moving rim from a static selection border.
- Chat: one real built-in Chat prompt and answer arrival. The source window runs at 1.4×; no message or response is fabricated.
- Terminal: the real OpenCode terminal conversation and completed response with native scrolling. The full app, project navigation and terminal context establish and return around the temporary focus view.
- Voice: native Listening, timer and changing measured waveform in the same real conversation; no transcription-result claim.
- Notes: the authored rich Markdown note and its native Focus-mode transition; note creation is excluded.
- Reminders: one real scheduled standalone reminder in the selected workspace, scoped to `hive-landing-rewrite`; it is not attached to a chat thread. Its complete Reminders workspace establishes and returns.

## Start / focus / end proof

Before rendering, inspected all 21 exact snapshots below across three contact sheets. Board is full-app in all three. Each other row visibly proves full app → focus → full app. The parent and independent reviewer also accepted these framing sheets before the delivery render.

| Scene | Start | Middle | End |
| --- | ---: | ---: | ---: |
| Board | 0.05s | 1.20s | 2.35s |
| In progress | 2.45s | 3.25s | 4.05s |
| Chat | 4.15s | 5.20s | 6.25s |
| Terminal | 6.35s | 7.40s | 8.45s |
| Voice | 8.55s | 9.40s | 10.25s |
| Notes | 10.35s | 11.20s | 12.05s |
| Reminders | 12.15s | 13.10s | 14.05s |

Pre-render evidence: `.hyperframes/artifacts/full-app-start-focus-end/contact-sheet-1.jpg` through `contact-sheet-3.jpg`. Also inspected the Hyperframes beat sheet, all six seam sheets and the 360px phone sheet. There are no blank scenes or accidental source losses. Fine text in full-app phone overviews benefits from the website’s fullscreen control; focus views provide the feature detail.

After rendering, extracted the same 21 instants from the actual delivered MP4 into seven three-frame strips at `.hyperframes/artifacts/encoded-full-app/proof-01.png` through `proof-07.png` and inspected all seven. The overview/focus/overview pattern and wide Board drag survive encoding. The poster is the encoded 0.05-second opening full-app establishing frame, with every Board column and application edge intact.

## Source windows

Every row uses the same complete-app crop `1900:980:0:40`.

| Beat | Raw basename | Source window | Rate |
| --- | --- | --- | --- |
| board-drag | `board-physical.mov` | 3.7–6.1s | 1× |
| running-thread | `running-terminal.mov` | 9–10.7s | 1× |
| chat | `chat.mov` | 7.2–10.28s | 1.4× |
| terminal | `terminal.mov` | 3.7–5.9s | 1× |
| voice | `voice.mov` | 7–8.8s | 1× |
| note | `note.mov` | 3.4–5.2s | 1× |
| reminder | `reminder.mov` | 0.5–2.5s | 1× |

Full source and normalized-clip SHA-256 values, dimensions, source windows and rates remain in `assets/sources.json`. The raw masters are preserved outside the worktrees. Silence is deliberate for the muted-autoplay hero; no audio, artificial waveform, blue progress or UI was generated.

## Verification

- `node --check scripts/prepare-media.mjs`: passed.
- All seven normalized clips: native full-app dimensions, 60fps and exact expected frame counts verified. Source masters/windows/rates match `ba0924b`.
- Hyperframes lint: eight HTML files, zero errors or warnings.
- `hyperframes check --snapshots --json`: `ok:true`, `browserSkipped:false`; zero errors or warnings in lint, runtime, layout, motion, contrast, craft and audio. Five of five contrast samples pass; 113 craft samples inspected. Expected informational findings are `motion_blur_no_movers` on the root scene host and `audio_none` for the silent hero.
- `hyperframes snapshot --review`: passed, 14 beat frames, six seams, 44 total frames plus phone sheet.
- Delivery render: all 846 frames captured and validated locally with hardware GPU screenshots.
- FFprobe: H.264, yuv420p, 1920 × 1080, 60/1fps, 846 frames, 14.100000s, video-only. MP4 `moov` precedes `mdat` for fast-start playback.
- Full FFmpeg decode of the delivered MP4: passed without errors.
- WebP poster: extracted from the final encoded film at 0.05s and encoded with local `cwebp`; visually inspected as a complete app frame.

## Delivery

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| `hive-product-demo.mp4` | 6,443,583 | `aab0fd9b35da9564ba0e9008bfd33051c744e6fdb5f328e82c31bb3f247e0a66` |
| `hive-product-demo-poster.webp` | 29,314 | `a151411854a883e7e7d7de4df5ec712b5e658b1a41c850377d0114a4f3846bf9` |

The existing editable preview remains at `http://localhost:5187/#project/hive-demo` on the same source project. The parent opened it before rendering; it reloads source edits. The CLI also offers editing through the HyperFrames desktop app: https://hyperframes.studio/studio/download?src=cli.

The scenes, full-app normalized media, local font/runtime, cut list and provenance travel with this editable project. Renderer caches and review sheets are ignored; MP4 and poster are copied separately into the website’s public media directory by the integration owner.
