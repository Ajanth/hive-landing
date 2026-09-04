# Hive landing page

Public landing page for [Hive](https://github.com/Ajanth/hive-public), the free macOS command center for OpenCode.

The site explains how Hive turns local OpenCode history into a Board, searchable transcripts, durable context, and repository-aware delivery tools. It uses the same restrained violet and graphite visual language as the app.

## Stack

- React 19 and TypeScript
- Vite 8
- Tailwind CSS 4
- shadcn/ui with Base UI primitives
- Motion
- Phosphor Icons
- Geist Variable

## Development

```bash
npm install
npm run dev
```

Use `npm run lint` and `npm run build` before publishing changes.

## Product screenshots

The page remains complete when screenshots are absent and shows intentional placeholders. To add current Hive captures, place WebP images at:

- `public/screenshots/hive-board.webp`
- `public/screenshots/hive-conversation.webp`
- `public/screenshots/hive-delivery.webp`

The prepared frames use cover cropping from the top edge. Capture each image with the important content away from the extreme bottom edge.

## Content sources

Product claims are based on the current Hive onboarding experience and product documentation. The page describes only the shipped OpenCode integration and distinguishes local built-in behavior from optional Linear and repository network activity.
