# Hive landing page

A dark-only marketing page for people building with OpenCode on a Mac. Keep the spacious, product-led pacing of the Codex landing page and the material depth of ScryClip’s approved Graphite reference. Preserve Hive’s navigation wordmark, Geist typography, and indigo identity. Remove the large app icon above the hero headline.

Design variance: 7. Motion intensity: 6. Visual density: 4. The page uses existing React, CSS, and Tailwind dependencies, with a native IntersectionObserver for section entrances. The hero product film is authored with Hyperframes from real Hive recordings.

## Latest direction

The hero uses a recorded product film with seven quick action beats: a smooth card drag between Board states, the animated blue border of a running thread, built-in Chat, Terminal Chat, voice recording, one note, and one reminder. Skip task creation, idle setup, and long typing or menu sequences. Dark appearance is the only page appearance; system settings and old theme storage must have no effect.

The video composition targets 14.1 seconds at 1920 × 1080 / 60 fps, with roughly two seconds per action. All seven beats use real Hive recordings from the external Dell display. The Chat exchanges use DeepSeek Flash; the blue progress and voice waveform are actual product states. Short camera follows and cuts keep the action readable without idle holds, fabricated interface states, or synthetic responses.

## Composition and implementation

1. A dark material backdrop, concise introduction, and direct download.
2. A large 16:9 product film with a single reusable video element, Play/Pause, Replay, and fullscreen controls. Its caption identifies the demo work.
3. Four mixed-size bento stories: organization, Markdown context, reminders, and repository workflow. Supporting product images use dark captures only.
4. Open workflow explanation, local-first privacy, FAQs, download close, and footer.

Use coherent indigo, neutral graphite, subtle material lighting, and selective contact shadows. Generous corners follow the supplied ScryClip reference. Outer cards stay still on hover. Entrances, press feedback, and the product film carry motion. Avoid scroll hijacking. Reduced Motion removes entrances and requires explicit video playback. Save-Data also requires explicit playback. Pause media offscreen or when its tab is hidden. Reduced Transparency uses opaque navigation.

The video source must remain unloaded until near the viewport or explicitly requested. Browser autoplay rejection must leave a usable Play control. Media failure exposes retry and a direct-video link. Fullscreen reuses the existing media element, avoiding a second stream. Keep loading/error states in the same frame geometry to prevent layout shifts.

Preserve the release manifest, Product/Workflow anchors, skip link, visible focus, and accurate privacy details. OpenCode remains the shipped runtime integration. Keep the permanent checkout on main; implementation lives in the assigned task worktree.

## References

- https://chatgpt.com/codex/ (visually inspected November 3, 2026).
- https://github.com/heygen-com/hyperframes
- ScryClip `ROG-171/Design/frozen/2026-11-02-approved` and `DESIGN.md`.
- Hive release 4.9 and its current WebUI design system.

## Verification boundary

Run lint, TypeScript/production build, dark-only and 320px layout checks, video control/visibility/preference/error checks, downloads, and independent review after the final media is integrated. Historical gallery/theme measurements do not verify the revised video page. No deployment is implied by a local preview or build.
