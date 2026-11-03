"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import {
  ArrowsInSimpleIcon,
  ArrowsOutSimpleIcon,
  ArrowCounterClockwiseIcon,
  PauseIcon,
  PlayIcon
} from "@phosphor-icons/react"

const VIDEO_URL = "/videos/hive-product-demo.mp4"
const POSTER_URL = "/videos/hive-product-demo-poster.webp"

type SavingConnection = EventTarget & { saveData?: boolean }

export function HeroVideo() {
  const film = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const intent = useRef<"auto" | "play" | "pause">("auto")
  const conditions = useRef({
    near: false,
    visible: false,
    reducedMotion: false,
    saveData: false
  })
  const [sourceEnabled, setSourceEnabled] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const [retry, setRetry] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [fullscreenFailed, setFullscreenFailed] = useState(false)
  const caption = useId()

  const synchronizePlayback = useCallback(() => {
    const element = video.current
    if (!element?.getAttribute("src")) return
    const { visible, reducedMotion, saveData } = conditions.current
    const automaticPlaybackAllowed = !reducedMotion && !saveData
    if (
      document.hidden ||
      !visible ||
      intent.current === "pause" ||
      (intent.current === "auto" && !automaticPlaybackAllowed)
    ) {
      element.pause()
      return
    }
    void element.play().catch((error: unknown) => {
      if (
        error instanceof DOMException &&
        (error.name === "AbortError" ||
          (intent.current === "auto" && error.name === "NotAllowedError"))
      )
        return
      setFailed(true)
      setPlaying(false)
    })
  }, [])

  useEffect(() => {
    const element = film.current
    const media = video.current
    if (!element) return
    const motion = matchMedia("(prefers-reduced-motion: reduce)")
    const connection = (
      navigator as Navigator & { connection?: SavingConnection }
    ).connection
    function updatePreferences() {
      conditions.current.reducedMotion = motion.matches
      conditions.current.saveData = connection?.saveData === true
      if (conditions.current.near && !motion.matches && !connection?.saveData)
        setSourceEnabled(true)
      synchronizePlayback()
    }
    function updateFullscreen() {
      setExpanded(document.fullscreenElement === film.current)
    }
    updatePreferences()
    const visibility = new IntersectionObserver(
      ([entry]) => {
        conditions.current.visible =
          entry.isIntersecting && entry.intersectionRatio >= 0.1
        synchronizePlayback()
      },
      { threshold: [0, 0.1] }
    )
    const loading = new IntersectionObserver(
      ([entry]) => {
        conditions.current.near = entry.isIntersecting
        updatePreferences()
      },
      { rootMargin: "240px 0px" }
    )
    visibility.observe(element)
    loading.observe(element)
    motion.addEventListener("change", updatePreferences)
    connection?.addEventListener("change", updatePreferences)
    document.addEventListener("visibilitychange", synchronizePlayback)
    document.addEventListener("fullscreenchange", updateFullscreen)
    return () => {
      visibility.disconnect()
      loading.disconnect()
      motion.removeEventListener("change", updatePreferences)
      connection?.removeEventListener("change", updatePreferences)
      document.removeEventListener("visibilitychange", synchronizePlayback)
      document.removeEventListener("fullscreenchange", updateFullscreen)
      media?.pause()
    }
  }, [synchronizePlayback])

  useEffect(() => {
    if (sourceEnabled) synchronizePlayback()
  }, [sourceEnabled, retry, synchronizePlayback])

  function togglePlayback() {
    if (playing) {
      intent.current = "pause"
      video.current?.pause()
    } else {
      intent.current = "play"
      setSourceEnabled(true)
      synchronizePlayback()
    }
  }

  function replay() {
    if (video.current) video.current.currentTime = 0
    intent.current = "play"
    setSourceEnabled(true)
    synchronizePlayback()
  }

  function retryVideo() {
    intent.current = "play"
    setFailed(false)
    setSourceEnabled(true)
    setRetry((attempt) => attempt + 1)
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement === film.current)
        await document.exitFullscreen()
      else await film.current?.requestFullscreen()
    } catch {
      setFullscreenFailed(true)
      if (video.current) video.current.controls = true
    }
  }

  return (
    <figure className="hero-film" ref={film} aria-label="Hive product demo">
      <div className="film-screen">
        <video
          ref={video}
          src={
            sourceEnabled
              ? `${VIDEO_URL}${retry ? `?retry=${retry}` : ""}`
              : undefined
          }
          poster={POSTER_URL}
          width={1920}
          height={1080}
          preload={sourceEnabled ? "auto" : "none"}
          muted
          loop
          playsInline
          aria-label="Hive product walkthrough"
          aria-describedby={caption}
          onCanPlay={synchronizePlayback}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => {
            setFailed(true)
            setPlaying(false)
          }}
        >
          <a href={VIDEO_URL}>Open the Hive product demo</a>
        </video>
        {failed && (
          <div className="film-error" role="status">
            <p>The product demo couldn’t load.</p>
            <div>
              <button onClick={retryVideo}>Try again</button>
              <a href={VIDEO_URL} target="_blank" rel="noreferrer">
                Open video
              </a>
            </div>
          </div>
        )}
      </div>
      <figcaption className="film-caption" id={caption}>
        <div className="film-description">
          <strong>Hive, in motion.</strong>
          <span>
            Board, Chat, Terminal, voice, Notes, and Reminders. Captured in Hive
            with demo work.
          </span>
        </div>
        <div className="film-controls" aria-label="Product demo controls">
          <button
            className="film-play"
            onClick={togglePlayback}
            disabled={failed}
            aria-label={playing ? "Pause product demo" : "Play product demo"}
          >
            {playing ? (
              <PauseIcon size={17} weight="fill" aria-hidden="true" />
            ) : (
              <PlayIcon size={17} weight="fill" aria-hidden="true" />
            )}
            <span>{playing ? "Pause" : "Play"}</span>
          </button>
          <button
            onClick={replay}
            disabled={failed}
            aria-label="Replay product demo"
            title="Replay"
          >
            <ArrowCounterClockwiseIcon size={18} aria-hidden="true" />
          </button>
          {document.fullscreenEnabled && (
            <button
              onClick={() => void toggleFullscreen()}
              aria-label={
                expanded
                  ? "Exit fullscreen product demo"
                  : "View product demo fullscreen"
              }
              title={expanded ? "Exit fullscreen" : "Fullscreen"}
            >
              {expanded ? (
                <ArrowsInSimpleIcon size={18} aria-hidden="true" />
              ) : (
                <ArrowsOutSimpleIcon size={18} aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </figcaption>
      {fullscreenFailed && (
        <p className="film-notice" role="status">
          Use the video’s native controls to expand the film.
        </p>
      )}
    </figure>
  )
}
