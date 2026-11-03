# Product film review

Reviewed 2026-11-03. Final source is the real Hive 4.9 Chat, Board and Voice recordings in `assets/sources.json`. The final film is 27 seconds at 1920 × 1080, 30fps, 810 frames. All product pixels come from those recordings.

## Visual verdict

Accepted for the landing-page hero. The app is present on the first frame. Chapter labels sit outside its picture; the film has no logo card or imitation player chrome. The camera establishes the workspace, moves into the control being used, holds for reading, and returns to context before each directional cut. Text holds still during product actions. The native crop removes window shadow and the macOS recording indicator.

Inspected the final six-beat sheet, both five-frame seam sheets, and the 360px-wide phone sheet. The Chat draft and Board menus are legible in the close views. The small full-workspace views establish context; detailed UI reading on a phone benefits from the page's full-screen action. No missing media, clipped chapter text, OS recording pill or false app state was visible. Directional entrance crops at scene boundaries are intentional. The final native-resolution source refresh preserves 2880 × 1524 pixels before graphite padding to 2880 × 1620, improving Chat close-up clarity.

Also decoded and inspected the actual delivered MP4 at 4.7s (Chat draft), 14.55s (Board menu and starred task), and 22.95s (native voice recording control and measured waveform). The WebP poster is the encoded 4.7s film frame.

## Scope of the footage

- Chat shows composing an authored draft; no assistant reply is claimed.
- Board shows a real star and menu inspection; no completed card move is claimed.
- Voice shows native Listening and its measured waveform. No transcription result or accuracy claim is included. The setup and stop takes are excluded.
- Source windows play at their recorded rate after explicit trims: Chat 1.8–12.0s, Board 4.4–13.1s, Voice 4.2–12.3s. Camera movement is editorial reframing, not reconstructed UI.
- Silence is deliberate for a muted autoplay hero. There is no narration, music, sound-effect track or fabricated waveform.

## Verification

- `node --check scripts/prepare-media.mjs`: passed.
- `hyperframes lint --json`: zero errors, warnings or info; four HTML files scanned.
- `hyperframes check --snapshots --json`: `ok: true`, `browserSkipped: false`; lint, runtime, layout, motion, contrast, craft and audio checks passed. Ten of ten contrast samples passed. The check inspected 216 craft samples.
- Expected check findings: `film_silent` warning and `audio_none` info for the silent hero; `container_overflow` info for the Board's clipped directional entrance; `motion_blur_no_movers` info because the root composition itself is a scene host. None is a missing product action or render failure.
- `hyperframes snapshot --review`: passed; six beats, two seams, sixteen total frames, phone sheet.
- `npm run render`: passed, local hardware GPU screenshot rendering, all 810 frames captured and validated.
- `npm run poster`: passed, FFmpeg extraction followed by local `cwebp` encoding.
- FFprobe: H.264, yuv420p, 1920 × 1080, 30/1 fps, 810 frames, 27.000000s, video-only. `moov` precedes `mdat` for fast-start playback.
- Full FFmpeg decode of the delivered MP4: passed without errors.

Machine reports and review sheets are in the ignored `.hyperframes/artifacts/` cache. The source specification, storyboard, provenance ledger, normalized footage, local font and GSAP runtime are retained with this editable project. Renders are ignored and should be copied to the website's media directory by the integration owner.

## Delivery

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| `renders/hive-product-demo.mp4` | 2,814,092 | `18cd037dd0ae83ab9a5216ebe2e92346017a9d22727ad3bb097042882bd7a90b` |
| `renders/hive-product-demo-poster.webp` | 35,656 | `9bfcb7d621a72f6190a9409ac7e7be3e0ee9ab61f1bcddfd9e1b71a6e5884854` |

Editable preview: `http://localhost:5186/#project/hive-demo`. Start again with `npm run dev` if it is stopped. The source and media are entirely local; no cloud upload or paid service was used.
