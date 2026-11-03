# Hive, in motion — 75% playback

Uniformly slow the verified full-app film to 75% speed, from 14.1 to 18.8 seconds. Delivery remains 1920 × 1080 at 60fps, now 1128 frames. All recorded actions, camera moves, labels, holds and cut times take exactly 4/3 as long. Feature order, camera paths, full-app framing, source masters and raw action windows are preserved.

## Exact frame schedule

| Beat | Start frame | Duration frames | Film time, rounded |
| --- | ---: | ---: | --- |
| Board drag | 0 | 192 | 0–3.200s |
| In progress | 192 | 136 | 3.200–5.467s |
| Chat | 328 | 176 | 5.467–8.400s |
| Terminal | 504 | 176 | 8.400–11.333s |
| Voice | 680 | 144 | 11.333–13.733s |
| Notes | 824 | 144 | 13.733–16.133s |
| Reminders | 968 | 160 | 16.133–18.800s |

`shots.json` records the exact 60fps cut schedule. Original frame durations [144,102,132,132,108,108,120] become [192,136,176,176,144,144,160]. Media rates become 0.75× for all beats except Chat, which becomes 1.05× instead of 1.4×. These new output durations/rates consume the same original raw time windows.

## Full-app camera contract

Every clip retains the complete 1900 × 980 application crop `1900:980:0:40`, removing only the native OS titlebar. Native product pixels are retained inside 1900 × 1070 graphite padding. No product sidebar, control, column or conversation is permanently cropped.

Every scene uses `object-fit: contain`. At overview `{xPercent:0,yPercent:0,scale:1}`, the complete app fits inside the 1920 × 1008 product viewport above the 72px label rail. Focus is the same reversible wrapper transform as the previous verified film, with unchanged `power2.inOut` easing and targets. Each focused shot returns to the full app before its cut; Board stays wide through the entire drag.

Local camera timings below are rounded for reading; scene HTML retains the scaled values.

| Beat | Unchanged focus (x,y,scale) | Slower zoom | Slower pullback |
| --- | --- | --- | --- |
| Board | Full app throughout | None | None |
| In progress | 17%,49%,2.35× | 0.187–0.720s | 1.413–2.000s |
| Chat | 60%,48%,1.70× | 0.240–0.880s | 2.027–2.667s |
| Terminal | 49%,49%,1.50× | 0.240–0.880s | 2.027–2.667s |
| Voice | 60%,89%,2.50× | 0.187–0.760s | 1.520–2.133s |
| Notes | 50%,28%,1.85× | 0.187–0.760s | 1.520–2.133s |
| Reminders | 52%,23%,2.05× | 0.213–0.827s | 1.760–2.400s |

Label arrival changes from 0.12 to 0.16 seconds. The note’s native Focus mode still hides its own navigation during the same source action; the editorial framing continues to preserve the complete recorded window.

## Required actions and verification

Retain the actual Done → Now card drag/drop, native running blue progress, real built-in Chat exchange, actual Terminal Chat, native Listening/waveform, rich Markdown note and scheduled standalone workspace reminder. No new capture, app/model call, task creation or fabricated UI. Silence remains intentional for the muted-autoplay hero.

Verify raw source hashes/windows/crops unchanged; every media rate is its previous value ×0.75; all durations and camera/label/cut times are their previous value ÷0.75. Run lint and browser-backed composition checks, inspect representative full-app/focus/pullback frames, render H.264, verify 18.8 seconds/1128 frames at60fps, and fully decode the MP4. The poster remains a full-app establishing frame at the correspondingly retimed opening instant.
