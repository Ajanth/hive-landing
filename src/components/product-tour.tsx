"use client"

import { useState, type KeyboardEvent } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { BookmarkSimpleIcon, ColumnsIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"

const scenes = [
  { id: "board", label: "Organize", Icon: ColumnsIcon, title: "See what’s now. Know what’s next.", description: "Bring sessions and tasks into Now, Queue, and Done. Keep each thread connected to its project and worktree.", alt: "Hive’s board tour with Now, Queue, and Done columns, session cards, and worktree context." },
  { id: "context", label: "Keep context", Icon: BookmarkSimpleIcon, title: "Turn conversations into something useful.", description: "Save a decision, bookmark a message, or set a reminder. The source conversation stays within reach.", alt: "Hive’s context tour connects a conversation to a saved note, bookmark, reminder, and optional Linear issue." },
  { id: "search", label: "Find it again", Icon: MagnifyingGlassIcon, title: "Pick up the thinking, not just the thread.", description: "Search your OpenCode history to recover the work and the context you saved along the way.", alt: "Hive’s search tour showing matching OpenCode sessions alongside the decision saved from a conversation." },
] as const

export function ProductTour() {
  const [selected, setSelected] = useState(0)
  const scene = scenes[selected]

  function selectScene(index: number) {
    if (index === selected) return
    setSelected(index)
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index
    if (event.key === "ArrowRight") next = (index + 1) % scenes.length
    else if (event.key === "ArrowLeft") next = (index + scenes.length - 1) % scenes.length
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = scenes.length - 1
    else return
    event.preventDefault()
    selectScene(next)
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("button")[next].focus()
  }

  return (
    <div className="product-tour">
      <div className="tour-tabs" role="tablist" aria-label="Explore Hive">
        {scenes.map(({ id, label, Icon }, index) => (
          <button key={id} id={`tour-tab-${id}`} role="tab" aria-selected={selected === index} aria-controls="tour-panel" tabIndex={selected === index ? 0 : -1} onClick={() => selectScene(index)} onKeyDown={(event) => navigate(event, index)}>
            <Icon size={18} aria-hidden="true" /> {label}
          </button>
        ))}
      </div>
      <div className="tour-panel" role="tabpanel" id="tour-panel" aria-labelledby={`tour-tab-${scene.id}`} tabIndex={0}>
        <div className="tour-description" aria-live="polite">
          <h3>{scene.title}</h3>
          <p>{scene.description}</p>
        </div>
        <div className="tour-visual">
          <AnimatePresence mode="wait" initial={false}>
            <ScenePreview key={scene.id} scene={scene} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function ScenePreview({ scene }: { scene: typeof scenes[number] }) {
  const [imageState, setImageState] = useState<"loading" | "ready" | "error">("loading")
  const [retry, setRetry] = useState(0)
  const reducedMotion = useReducedMotion()

  return (
    <motion.div className="tour-image-layer" aria-busy={imageState === "loading"} initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.28 }}>
      {imageState === "loading" && <div className="tour-skeleton" aria-hidden="true" />}
      <img key={retry} src={`/images/hive-${scene.id}.webp${retry ? `?retry=${retry}` : ""}`} alt={scene.alt} width={1120} height={368} loading="lazy" hidden={imageState === "error"} onLoad={() => setImageState("ready")} onError={() => setImageState("error")} />
      {imageState === "error" && <div className="tour-error" role="status"><p>The product preview couldn’t load.</p><button onClick={() => { setImageState("loading"); setRetry(retry + 1) }}>Try again</button></div>}
    </motion.div>
  )
}
