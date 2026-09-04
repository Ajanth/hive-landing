import {
  AlarmIcon,
  ArrowRightIcon,
  BookmarkSimpleIcon,
  ChatTextIcon,
  FolderOpenIcon,
  MagnifyingGlassIcon,
  NotePencilIcon,
  StackIcon,
} from "@phosphor-icons/react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

const scenes = [
  {
    id: "organize",
    label: "Organize",
    caption: "Every OpenCode session has a place.",
  },
  {
    id: "continuity",
    label: "Keep context",
    caption: "Turn one useful message into the next action.",
  },
  {
    id: "delivery",
    label: "Recover",
    caption: "Find the decision and continue from there.",
  },
] as const

type SceneId = (typeof scenes)[number]["id"]

const sceneTransition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
}

function OrganizeScene({ animated }: { animated: boolean }) {
  const lanes = ["Now", "Queue", "Done"]

  return (
    <div className="stage-art stage-art--board">
      <div className="stage-workspace">
        <FolderOpenIcon aria-hidden="true" weight="regular" />
        <span>Hive / main</span>
        <span className="ml-auto">3 sessions</span>
      </div>
      <div className="stage-board">
        {lanes.map((lane) => (
          <div key={lane} className="stage-board__lane">
            <div className="stage-board__label">{lane}</div>
            <div className="stage-board__ghost" />
            <div className="stage-board__ghost stage-board__ghost--short" />
          </div>
        ))}
        <motion.div
          className="stage-board__moving-card"
          animate={animated ? { x: ["0%", "108%", "216%"] } : { x: "0%" }}
          transition={
            animated
              ? {
                  duration: 4.6,
                  ease: [0.65, 0, 0.35, 1],
                  times: [0, 0.5, 1],
                }
              : undefined
          }
        >
          <p>Refine onboarding</p>
          <div>
            <NotePencilIcon aria-hidden="true" />
            <BookmarkSimpleIcon aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const continuityArtifacts = [
  { label: "Note", Icon: NotePencilIcon },
  { label: "Bookmark", Icon: BookmarkSimpleIcon },
  { label: "Reminder", Icon: AlarmIcon },
] as const

function ContinuityScene({ animated }: { animated: boolean }) {
  return (
    <div className="stage-art stage-art--continuity">
      <motion.div
        className="stage-message"
        initial={animated ? { opacity: 0, x: -16 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={sceneTransition}
      >
        <div className="stage-message__source">
          <ChatTextIcon aria-hidden="true" />
          OpenCode conversation
        </div>
        <p>How should recap refresh failures work?</p>
        <strong>Keep the last good recap visible until a refresh succeeds.</strong>
      </motion.div>
      <motion.div
        className="stage-connector"
        initial={animated ? { opacity: 0, scaleX: 0 } : false}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ ...sceneTransition, delay: 0.2 }}
      />
      <div className="stage-artifacts">
        {continuityArtifacts.map(({ label, Icon }, index) => (
          <motion.div
            key={label}
            className="stage-artifact"
            initial={animated ? { opacity: 0, x: 18 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...sceneTransition, delay: 0.18 + index * 0.12 }}
          >
            <Icon aria-hidden="true" />
            <div>
              <span>{label}</span>
              <p>{index === 0 ? "Keep last good recap visible." : "Saved with its source thread"}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const searchResults = [
  "Repair recap refresh state",
  "Keep context during retries",
  "Add recap controls",
] as const

function DeliveryScene({ animated }: { animated: boolean }) {
  return (
    <div className="stage-art stage-art--delivery">
      <motion.div
        className="stage-search"
        initial={animated ? { opacity: 0, x: -16 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={sceneTransition}
      >
        <div className="stage-search__field">
          <MagnifyingGlassIcon aria-hidden="true" />
          <span>recap refresh fallback</span>
        </div>
        <div className="stage-search__results">
          {searchResults.map((result, index) => (
            <motion.div
              key={result}
              className={cn("stage-search__result", index === 0 && "is-selected")}
              initial={animated ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...sceneTransition, delay: 0.12 + index * 0.09 }}
            >
              <span>{result}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="stage-delivery-arrow"
        initial={animated ? { opacity: 0, x: -8 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...sceneTransition, delay: 0.42 }}
      >
        <ArrowRightIcon aria-hidden="true" />
      </motion.div>
      <motion.div
        className="stage-saved-context"
        initial={animated ? { opacity: 0, x: 16 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...sceneTransition, delay: 0.5 }}
      >
        <div>
          <StackIcon aria-hidden="true" />
          Saved context
        </div>
        <span>Decision</span>
        <strong>Keep the last good recap visible.</strong>
        <p>Bookmark and reminder included</p>
      </motion.div>
    </div>
  )
}

function SceneArtwork({ id, animated }: { id: SceneId; animated: boolean }) {
  if (id === "continuity") return <ContinuityScene animated={animated} />
  if (id === "delivery") return <DeliveryScene animated={animated} />
  return <OrganizeScene animated={animated} />
}

export function HeroJourney() {
  const reduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const activeScene = scenes[activeIndex]

  useEffect(() => {
    if (reduceMotion || paused) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % scenes.length)
    }, 5200)

    return () => window.clearInterval(timer)
  }, [paused, reduceMotion])

  return (
    <div
      className="journey-stage"
      role="region"
      aria-label="Hive product story"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="journey-stage__header">
        <div>
          <span>{activeScene.label}</span>
          <p>{activeScene.caption}</p>
        </div>
        <div className="journey-stage__mark" aria-hidden="true">
          H
        </div>
      </div>

      <div className="journey-stage__canvas" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeScene.id}
            className="absolute inset-0"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={sceneTransition}
          >
            <SceneArtwork id={activeScene.id} animated={!reduceMotion} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="journey-stage__controls" aria-label="Choose a Hive story">
        {scenes.map((scene, index) => (
          <button
            key={scene.id}
            type="button"
            aria-pressed={index === activeIndex}
            className={cn(index === activeIndex && "is-active")}
            onClick={() => setActiveIndex(index)}
          >
            {scene.label}
          </button>
        ))}
      </div>
    </div>
  )
}
