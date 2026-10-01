# Hive landing page images

## Product tour

`public/images/hive-board.webp`, `hive-context.webp`, and `hive-search.webp` are browser captures of Hive's real onboarding components: OnboardingOrganizeScene, OnboardingContinuityScene, and OnboardingDeliveryScene. They use the product's existing sample work, rendered from the sibling Hive WebUI source. They are product-tour illustrations rather than screenshots of a user's sessions. The page labels them accordingly.

Each capture is 1120 × 368 pixels and encoded as WebP at quality 94. Source components: `../hive/WebUI/src/features/onboarding/`.

## Icon product render

`public/images/hive-orbit-icon.webp` is an 800 × 800 transparent WebP generated with the built-in image generation tool, using the existing `public/hive-app-icon.webp` as a reference. The original brand asset is preserved.

Final generation prompt:

```text
Use case: product-mockup
Asset type: supporting product image for the Hive macOS landing page.
Input image: the existing Hive app icon is the brand identity reference. Preserve its lowercase h inside a thin hexagonal indigo frame, its square rounded silhouette, and its graphite metal material.
Primary request: create a beautifully restrained, high-end 3D studio render of the Hive icon as a physical graphite-metal app tile, floating at a slight three-quarter angle, with precise machined edges, soft violet-blue edge reflections and a single graceful elliptical brushed-metal orbit passing behind it. The existing logo must remain instantly recognizable. Do not add text or interfaces.
Composition: square composition, icon centered in the middle 65%, three-quarter perspective, generous clean negative space, subtle ambient occlusion, product-photography polish.
Lighting: soft large silver studio light from upper left, muted indigo rim light, no excessive glow, no stars, no haze.
Materials: dark matte graphite, polished bevel, subtly translucent violet inner hexagon.
Constraints: isolated on a truly transparent background. No pedestal, no floor, no extra logos, no letters beyond the existing lowercase h, no caption, no watermark. Elegant, crisp, tactile, understated.
```
