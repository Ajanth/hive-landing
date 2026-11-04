# Hive landing page

A dark product-led page for people using OpenCode on a Mac. Five sections total: introduction and film, Board, Chat and Terminal, Notes, then a dedicated Reminders section. A compact text-only footer follows. No footer logo, separate FAQ, icon sculptures, bento grid, or closing panel.

Design variance 6, motion intensity 5, visual density 3. Retain self-hosted Geist and the Hive indigo accent (#5865d8 and its lighter tints) against neutral graphite. Native CSS and the existing React/Tailwind stack implement the design; no new runtime dependencies.

## Visual direction

Borrow the generous containment and concise editorial rhythm of Cursor and Codex, and the fine edges and graphite depth of ScryClip’s approved designs. Use a broad oblique indigo paint wash with slow transform motion. The wash frames the product and stays subordinate to it. Keep text on dark regions. Do not reuse the darkened Opal raster backdrop.

Use a left-aligned, two-line introduction with a short paragraph and direct download. The wide hero stage contains the complete 16:9 film with breathing room. The scene title and complete sentence appear above the video, synchronized to the current action, with controls alongside. Keep its height stable across scenes. Use restrained corners: 12px stages, 8px product windows, pill download buttons, and 8px controls.

Below the film, show short product stories with genuine product captures. Board is a copy/media row, Chat/Terminal reverses the scale and uses two real product windows, Notes is a broad visual with copy above it, and Reminders has a dedicated copy/media row. Vary the composition without adding ornamental card shells.

## Approved film and captions

The film runs about 30% slower than the approved 18.8-second cut: 26.85 seconds, 1611 frames, 1920 × 1080 / 60fps. Preserve the full-app establishing views, zooms, pullbacks, and seven original action windows. Frame-aligned cuts are 0, 274, 469, 720, 971, 1177, 1383, and 1611. Retiming is baked into the media and editable source.

The seven captions describe the real Board drag, running thread progress, built-in Chat, Terminal Chat, voice Listening, Markdown note Focus mode, and reminder. Avoid a transcription-success claim. The real chats use DeepSeek Flash. Static captures are extracted from the existing footage; no new recording is needed.

## Interaction and verification

Keep one video element, near-viewport loading, explicit Play/Pause, Replay, fullscreen, and retry/fallback controls. Respect Reduced Motion and Save-Data. Pause offscreen and in hidden tabs. Changing captions must follow seeks, replay, and loops without unsolicited screen-reader announcements. Reduced Motion freezes the paint wash and section entrances. Preserve visible focus and the release-manifest download flow.

Check desktop, 390px and 320px layouts, all captions over a playback loop, pause/replay/fullscreen, motion preferences, downloads, lint, and production build. Obtain independent visual and code critiques before handoff. Keep the implementation in its task worktree; the permanent checkout remains on main.

## References

- https://openai.com/codex/ and the user’s supplied screenshots, November 4, 2026.
- https://cursor.com/home and its official deployed CSS, November 4, 2026.
- ScryClip ROG-171 Design/frozen/2026-11-02-approved Graphite mock designs.
