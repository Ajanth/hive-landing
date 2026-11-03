# Hive landing page

A dark product-led page for people using OpenCode on a Mac. Four sections total: introduction and approved film, Board, Chat and Terminal, then Notes and Reminders. A compact text-only footer follows. No footer logo, separate FAQ, icon sculptures, bento grid, or closing panel.

Design variance 6, motion intensity 5, visual density 3. Retain self-hosted Geist and the Hive indigo accent (#5865d8 and its lighter tints) against neutral graphite. Native CSS and the existing React/Tailwind stack implement the design; no new runtime dependencies.

## Visual direction

Borrow the generous containment and concise editorial rhythm of Cursor and Codex, and the fine edges and graphite depth of ScryClip’s approved designs. Use a broad oblique indigo paint wash with slow transform motion. The wash frames the product and stays subordinate to it. Keep text on dark regions. Do not reuse the darkened Opal raster backdrop.

Use a left-aligned, two-line introduction with a short paragraph and direct download. The wide hero stage contains the complete 16:9 film with breathing room. The scene description beside its controls is a complete sentence synchronized to the current action. Keep its height stable across scenes. Use restrained corners: 12px stages, 8px product windows, pill download buttons, and 8px controls.

Below the film, show short product stories with genuine product captures. Board is a copy/media row, Chat/Terminal reverses the scale and uses two real product windows, and Notes/Reminders is a broad visual with copy above it. Vary the composition without adding ornamental card shells.

## Approved film and captions

The approved film is already 25% slower than the original at 0.75× speed: 18.8 seconds, 1128 frames, 1920 × 1080 / 60fps. Preserve the encoded MP4, full-app establishing views, zooms, pullbacks, and seven action windows. Do not apply another slowdown. SHA-256: 75d1b6fa10fc2e09c1fa81efae22a03a01ba82999c57744dbd2d092f7757ae76.

The seven captions describe the real Board drag, running thread progress, built-in Chat, Terminal Chat, voice Listening, Markdown note Focus mode, and reminder. Avoid a transcription-success claim. The real chats use DeepSeek Flash. Static captures are extracted from the existing footage; no new recording is needed.

## Interaction and verification

Keep one video element, near-viewport loading, explicit Play/Pause, Replay, fullscreen, and retry/fallback controls. Respect Reduced Motion and Save-Data. Pause offscreen and in hidden tabs. Changing captions must follow seeks, replay, and loops without unsolicited screen-reader announcements. Reduced Motion freezes the paint wash and section entrances. Preserve visible focus and the release-manifest download flow.

Check desktop, 390px and 320px layouts, all captions over a playback loop, pause/replay/fullscreen, motion preferences, downloads, lint, and production build. Obtain independent visual and code critiques before handoff. Keep the implementation in its task worktree; the permanent checkout remains on main.

## References

- https://openai.com/codex/ and the user’s supplied screenshots, November 4, 2026.
- https://cursor.com/home and its official deployed CSS, November 4, 2026.
- ScryClip ROG-171 Design/frozen/2026-11-02-approved Graphite mock designs.
