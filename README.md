# Hive landing page

A single-screen landing page for [Hive](https://github.com/Ajanth/hive-public), a local macOS workspace for visualizing and organizing agent work.

The near-black hero uses Hive's wordmark, native indigo button tokens, and a sparse Three.js galaxy. Five matte cards sit around its rim: notes, reminders, task creation, GitHub, and a miniature Kanban board. The 1,200 stars (650 on mobile) drift with steady brightness. Moving the pointer disperses nearby stars and gently repels the cards. Product positioning is agent-neutral; the page does not claim universal integration support.

## Development

```bash
npm install
npm run dev
```

Run `npm run lint` and `npm run build` before publishing. `npm run preview` serves the production build.

## Animation

`src/lib/galaxy-scene.ts` owns one point cloud and one animation loop, which also steps `src/lib/feature-orbit.ts`. Star orbits and displacement run in a vertex shader. Pointer events only record coordinates; smoothing, card springs, and wake sampling run once per frame, without React renders or layout reads on mouse movement. Trail strength reaches zero before a slot is reused. Cards protect the hero text and their neighbors, and the Kanban board responds with less motion.

Three.js loads separately from the hero copy and cards. The renderer caps pixel density, pauses when the page is hidden or offscreen, and disposes its resources on unmount. Reduced motion keeps the cards and galaxy still. Card layout still updates on resize while paused. The desktop hero fits one viewport; mobile stacks the copy above a smaller orbit.

If WebGL is unavailable, the page shows a responsive still captured from the same scene. These fallback images only load when needed.

## Content

Hero copy lives in `src/App.tsx`, feature content in `src/components/feature-orbit.tsx`, and the macOS download destination in `src/content/landing.ts`. It currently points to the public GitHub releases page. Replace it with the signed installer URL when a release is available.
