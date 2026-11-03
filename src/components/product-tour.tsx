"use client"

import { useState } from "react"

type ProductView = "board" | "notes" | "focus"

const descriptions: Record<ProductView, string> = {
  board:
    "Hive Board showing sample OpenCode sessions organized in Now and Queue.",
  notes:
    "Hive 4.9 shared Notes library with authored sample notes and project filters.",
  focus:
    "Hive 4.9 Markdown editor showing a sample note linked to a project, worktree and conversation."
}

export function ProductImage({
  view,
  decorative = false
}: {
  view: ProductView
  decorative?: boolean
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="product-image" aria-hidden={decorative || undefined}>
      <img
        src={`/images/hive-${view}-dark.webp`}
        alt={decorative ? "" : descriptions[view]}
        width={1280}
        height={720}
        loading="lazy"
        onError={() => setFailed(true)}
        hidden={failed}
      />
      {failed && (
        <div className="image-error">Product preview unavailable.</div>
      )}
    </div>
  )
}
