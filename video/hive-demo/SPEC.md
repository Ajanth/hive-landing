# Hive product film — another 30% slower

Retiming of verified commit 83a1719: slow its 18.8-second film by approximately another 30%, preserving the full-app establishing/focus/pullback geometry and all seven actual action windows. Delivery is 26.85 seconds, 1611 frames at 60fps, 1920 × 1080. Cumulative cuts are rounded to whole frames; this is within one frame of exact 0.70× playback.

## Exact cut schedule

Cumulative frames: `[0,274,469,720,971,1177,1383,1611]`.

| Beat | Start frame | Duration frames | Film time | Raw playback rate |
| --- | ---: | ---: | --- | --- |
| Board | 0 | 274 | 0.000000–4.566667s | 0.525547445255× |
| In progress | 274 | 195 | 4.566667–7.816667s | 0.523076923077× |
| Chat | 469 | 251 | 7.816667–12.000000s | 0.736254980080× |
| Terminal | 720 | 251 | 12.000000–16.183333s | 0.525896414343× |
| Voice | 971 | 206 | 16.183333–19.616667s | 0.524271844660× |
| Notes | 1177 | 206 | 19.616667–23.050000s | 0.524271844660× |
| Reminders | 1383 | 228 | 23.050000–26.850000s | 0.526315789474× |

Each source rate is `unchangedRawWindow / (newFrameDuration / 60)`. Every GSAP camera/label duration and local start time is multiplied by `newFrameDuration / previousFrameDuration`. Easing and focus targets are unchanged. This preserves synchronization while keeping exact raw source windows despite the one-frame cut rounding.

## Preserved content and framing

The seven actions remain the physical Done → Now drag/drop, native running blue progress, actual built-in Chat exchange, actual Terminal Chat, Listening/timer/waveform, rich Markdown note and scheduled standalone workspace reminder. Board stays wide through the whole drag. All other scenes establish the whole app, temporarily focus on the action, then pull back before the cut. The note’s navigation is hidden only by the app’s own recorded Focus mode.

All normalized clips preserve the complete 1900 × 980 product image using only the OS-titlebar crop `1900:980:0:40`, in 1900 × 1070 graphite padding. `object-fit: contain` preserves the complete app at overview scale. No source window, crop, camera target, UI content or feature order changes. No recording, app call, model/provider call or fabricated UI. Silence remains intentional for the muted hero.

## Bounded verification

Verify all raw hashes/windows/crops against 83a1719, exact per-shot media/camera ratios, 1611 normalized frames and contiguous cut times. Run lint and browser-backed Hyperframes checks, render, fully decode the MP4, inspect representative full-app/focus/pullback frames, and generate a full-app opening poster. The same 5187 source preview remains running.
