# Hive: keep your momentum

Goal: make the working Hive app feel tangible through its own live Chat, Board and voice-input interactions.

Output: silent hero film, Hyperframes 0.9.8, 1920 × 1080, 30 fps, 27 seconds (810 frames). Silence is intentional for muted autoplay on the marketing page; no voiceover, music, synthetic UI sounds or fabricated waveform is added.

Chosen storyline: follow the same work through conversation, organization and voice input. Alternatives considered and not built: a fast feature montage (too little time for the real controls to read), and an abstract brand film (does not answer the request to record the product).

Material: the recorded Hive 4.9 app is the picture. Preserve its text, state colors, chrome and real actions. No rebuilding the interface in HTML, no screenshots passed off as motion, no invented messages, no fabricated input or waveform. Capture provenance lives in `assets/sources.json` after ingest.

Look: graphite ground `#181818`, white ink `#F3F2F5`, muted ink `#B0ADB8`, Hive indigo from the real interface. Geist variable at 64px/530 for the chapter name and 30px/450 for the short supporting line. Chapter text occupies the outer 96px top band; product footage owns the rest of the frame. No logo icon, decorative particles, 3D app tilt, neon, halos, gradients or fake device frame.

Motion: registry `ui-focus-zoom` camera-servo geometry, without its skeleton or halo; registry `cut-the-curve` directional timing, without CSS filtering the recorded app. Arrivals use `power4.out`, camera moves use `power2.inOut`, exits use `power4.in`. A framing move takes 18–24 frames. Product content plays at its actual rate unless an explicit source trim/rate is recorded in the composition. Text lands and holds still. No breathing/drift loops.

## Shots

| Film time | Picture | Camera and reading | Handoff |
| --- | --- | --- | --- |
| 0–1.05s | Real Chat workspace, already visible on the first frame | Establish the app; chapter “Chat” | Track into the composer |
| 1.05–6.1s | Actual draft composition | 1.85× view; hold while real text is entered | Tighten the view of the authored draft |
| 6.1–8.65s | Actual composer interaction | 2.05× view | Return to workspace scale |
| 8.65–10.2s | Real Chat overview | Brief contextual return | Directional seam into Board |
| 10.2–14.95s | Actual Board star/menu interaction | 1.7× view of the card and action | Follow the real menu |
| 14.95–17.4s | Actual Board menu inspection | 1.9× view | Pull back to show the columns |
| 17.4–18.9s | Real Board overview | Keep the board visible | Directional seam into Voice |
| 18.9–21.3s | Real voice-input flow | 2× view of the native composer and record control | Tighten around Listening and the waveform |
| 21.3–25.8s | Actual listening/waveform recording | 3× macro view; hold on the real measured state | Pull back to the still-listening workspace |
| 25.8–27s | Real listening state in its workspace | 1× context; no end-card obstruction | Loop back into the same app world |

The Chat clip is real draft composition, not assistant generation. It is trimmed from source t=1.8s; actual typing is visible around source t=5–6s; camera anchors follow the lower-center composer. Board starts at source t=4.4s and shows starring and menu inspection, not a completed card move. Voice uses `voice-take2.mov` from source t=4.2s and shows native Listening and its real waveform only. It does not show or claim a transcription result. The setup take, stop take and inaccurate transcription result are excluded.

## Verification

Run Hyperframes lint/check and inspect beat, seam and phone sheets. Check the rendered duration, codec, dimensions and lack of audio with ffprobe. Review decoded MP4 frames, not only browser snapshots. Deliver an H.264 MP4 with fast-start metadata and an actual film frame as the poster. Do not render placeholders into a claimed final asset.
