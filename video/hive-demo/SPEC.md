# Hive, in motion — full-app camera

Restore the original full-application camera language while retaining the fast seven-beat montage: 14.1 seconds, 1920 × 1080, 60fps, 846 frames. The full application establishes each feature, the camera smoothly zooms toward the real action, and the full application returns before the cut. The Board remains wide throughout its physical drag so all state columns and the pickup/drop stay visible.

## Source fidelity

Every clip is re-ingested from the original 1900 × 1020 Dell recording with exactly `1900:980:0:40`: only the native OS titlebar is trimmed. No product sidebar, control, column, conversation, composer or card is permanently cropped. All normalized sources are 1900 × 1070 with neutral graphite padding; source time windows and rates are unchanged.

The video uses `object-fit: contain`. At the overview state `{ xPercent: 0, yPercent: 0, scale: 1 }`, the entire recorded app fits inside the 1920 × 1008 product viewport. A quiet 72px bottom rail holds the feature label. Focus is a reversible GSAP camera transform on the containing wrapper, never a destructive source crop. All UI colors, conversations, running progress, waveform and card motion remain recorded pixels.

Notes enters the app’s real Focus mode during its source window. That native mode hides navigation; the complete recorded window and its Focus-mode toolbar remain visible at the ending overview. Navigation is not reconstructed or overlaid.

## Timeline and camera

Camera times below are local to each scene. Zoom and pullback use the old `power2.inOut` geometry from commit `7707847`, adapted to the shorter beats. Focus coordinates are percentages of the complete source. Each focused scene starts at full scale, holds the action briefly and settles back to full scale at least 0.2 seconds before its end. No sliding scene fragments, permanent macro crops, drifting camera or fake UI.

| Beat | Film time | Focus (x, y, scale) | Zoom | Pullback |
| --- | --- | --- | --- | --- |
| Board drag | 0–2.4s | Full app throughout | None; preserve the entire physical motion | Full app throughout |
| In progress | 2.4–4.1s | 17%, 49%, 2.35× | 0.14–0.54s | 1.06–1.50s |
| Chat | 4.1–6.3s | 60%, 48%, 1.70× | 0.18–0.66s | 1.52–2.00s |
| Terminal | 6.3–8.5s | 49%, 49%, 1.50× | 0.18–0.66s | 1.52–2.00s |
| Voice | 8.5–10.3s | 60%, 89%, 2.50× | 0.14–0.57s | 1.14–1.60s |
| Notes | 10.3–12.1s | 50%, 28%, 1.85× | 0.14–0.57s | 1.14–1.60s |
| Reminders | 12.1–14.1s | 52%, 23%, 2.05× | 0.16–0.62s | 1.32–1.80s |

## Required actions

- A real pointer drag of one card from Done to Now, with the persisted destination state visible.
- One running thread card with genuinely animated blue progress during the real request.
- A real built-in Chat exchange and answer arrival.
- A real Terminal Chat exchange and native scrolling.
- Native voice Listening, timer and changing measured waveform; no transcription claim.
- One rich Markdown note and its native Focus-mode transition.
- One scheduled standalone reminder in the selected workspace; it is not attached to a chat thread.

No task-creation sequence, idle introduction, long typing hold or outro. Silence remains deliberate for the muted-autoplay landing-page hero. Labels use local Geist at 36px/500, #C7C5CD on #181818.

## Acceptance and proof

Before the delivery render, inspect a start, middle and end frame for all seven scenes. The Board must be full-app in all three; each other scene must prove full app → temporary focus → full app. Then run Hyperframes lint/check/review and inspect beat, seam and phone sheets. Decode the final H.264 MP4 and inspect encoded establishing/focus/pullback frames. The poster must come from the opening full-app establishing frame, not an isolated card or composer.
