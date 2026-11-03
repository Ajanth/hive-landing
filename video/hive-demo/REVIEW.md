# Product montage review

Reviewed 2026-11-03. Accepted for landing-page integration. The final edit is14.1seconds,1920 × 1080,60fps,846frames. Every product pixel comes from real Hive4.9 application recordings captured on the external Dell monitor through agent-desktop; the film does not reconstruct UI.

## Required-action verdict

- Board opens on a real pointer drag of “Prepare the next release” from Done to Now. The card crosses the columns and remains in Now after release. A wider camera follow was verified at0.3,0.5,0.65 and0.9s to keep the moving card visible. The final encoded drop is visible at2.2s. No task-creation sequence appears.
- In progress shows the real “Calmer workspace five-point plan” thread card during the actual DeepSeek request. Its blue rim travels around different edges and the native blue dot is present. Source frames across8.6–12.5s establish animation rather than a static selection border; the delivered source window is9–10.7s.
- Built-in Chat shows a real prompt and the actual five-point answer arriving. Waiting and subsequent idle footage are removed. The3.08-second source window plays at1.4× in2.2seconds.
- Terminal shows the actual OpenCode terminal conversation and its30-item response, with native scrolling. It uses the full Terminal-view capture, cropped to exclude the shared project sidebar, TUI onboarding/MCP sidebar and bottom path status. It does not claim that the completed reply is still generating.
- Voice shows native Listening, timer and a genuinely changing measured waveform in the same real conversation. No transcription result or accuracy claim is included.
- Notes shows the authored rich Markdown note “Keep the good thinking” with headings, emphasis, blockquote and checklist, around the real Focus-mode reflow. Note creation is excluded.
- Reminders shows one real scheduled standalone reminder in the selected workspace, scoped to `hive-landing-rewrite`. It is not attached to the chat thread. The native card is tightly cropped onto graphite padding; adjacent creation controls are excluded. No reminder-creation sequence appears.

## Pacing and frame review

Seven beats last1.7–2.4seconds each. There is no idle intro, outro, long typing hold or menu tour. Feature labels use a quiet72px bottom rail rather than the previous large chapter header. Directional arrivals last0.22seconds; the reminder camera settles in0.24seconds. The Board follow runs0.22–0.77s at1.3× view scale. Other useful crops hold still while their real actions play.

Inspected the final14-frame beat sheet, all six five-frame seam sheets and the360px phone sheet. There are no blank shots, OS recording indicators, unrelated project sidebars or overlaid imitation UI. Detail reading on a phone benefits from the webpage’s fullscreen control; the montage remains recognizable at phone width. Rechecked the actual final encoded MP4 at0.65/2.2s for drag/drop,2.7/3.5s for blue-rim movement,5.8s for the Chat reply,7.8s for Terminal,9.5s for Voice,11.5s for Notes and13s for the scheduled reminder. The WebP poster is the encoded0.65-second moving-card frame.

## Source windows

| Beat | Raw source basename | Source window | Rate | Film time |
| --- | --- | --- | --- | --- |
| board-drag | `board-physical.mov` | 3.7–6.1s | 1× | 2.4s |
| running-thread | `running-terminal.mov` | 9–10.7s | 1× | 1.7s |
| chat | `chat.mov` | 7.2–10.28s | 1.4× | 2.2s |
| terminal | `terminal.mov` | 3.7–5.9s | 1× | 2.2s |
| voice | `voice.mov` | 7–8.8s | 1× | 1.8s |
| note | `note.mov` | 3.4–5.2s | 1× | 1.8s |
| reminder | `reminder.mov` | 0.5–2.5s | 1× | 2s |

Complete source and normalized-clip SHA-256 values, dimensions, crop and explicit padding dimensions live in `assets/sources.json`. Raw masters are preserved outside the checkout. Silence is deliberate for the muted-autoplay hero; no fabricated voice, waveform, messages or progress animation was added.

## Verification

- `node --check scripts/prepare-media.mjs`: passed. Positive trim/rate encoding and negative time/crop/speed bounds were exercised in a temporary harness outside the deliverable.
- Hyperframes lint: zero errors or warnings, eight HTML files scanned.
- Final `hyperframes check --snapshots --json`: `ok:true`, `browserSkipped:false`; zero errors and warnings in lint, runtime, layout, motion, contrast, craft and audio. Five of five contrast samples pass;113 craft samples inspected. Expected informational findings are `motion_blur_no_movers` on the root scene host and `audio_none` for the silent hero.
- Final `hyperframes snapshot --review`: passed; seven scenes,14 beat frames, six seams,44 total frames plus phone sheet. The updated opening follow was rechecked before the final render.
- Final delivery render: all846frames captured and validated locally with hardware GPU screenshots; no upload or generation service.
- FFprobe: H.264,yuv420p,1920 × 1080,60/1fps,846frames,14.100000s, video-only. MP4 `moov` precedes `mdat` for fast-start playback.
- Full FFmpeg decode of the final MP4: passed without errors.
- WebP poster: extracted from the final encoded film at0.65s, then encoded with local `cwebp`.

## Delivery

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| `hive-product-demo.mp4` | 1,367,846 | `c3d418baeedd056ecd4c05e7d57e6f1662712fdefb5253eebb3bef3274836099` |
| `hive-product-demo-poster.webp` | 33,170 | `b72b7542cfb3fd2d83171751fdfb2e7f0bc5da9f84bae233d9254d0221cd4350` |

Editable preview: `http://localhost:5187/#project/hive-demo` (background server verified before delivery). The parent opened this preview in Codex before rendering. The same source remains editable; the CLI also offers the HyperFrames desktop app’s Edit with Framey workflow at https://hyperframes.studio/studio/download?src=cli.

Machine reports and review sheets are in the ignored `.hyperframes/artifacts/` cache. The editable scenes, cut list, provenance, local font/runtime and normalized footage travel with the project. Rendered MP4/poster are copied separately to the website’s public media directory by the integration owner.
