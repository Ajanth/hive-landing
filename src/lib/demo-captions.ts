export const DEMO_SCENES = [
  {
    start: 0,
    end: 274 / 60,
    title: "Move work into Now",
    caption:
      "Move a card from Done to Now to bring work back into focus."
  },
  {
    start: 274 / 60,
    end: 469 / 60,
    title: "Follow a running thread",
    caption:
      "Follow a running thread as its blue progress indicator marks active work."
  },
  {
    start: 469 / 60,
    end: 720 / 60,
    title: "Chat with OpenCode",
    caption:
      "Use OpenCode through Hive’s built-in Chat while keeping the project in view."
  },
  {
    start: 720 / 60,
    end: 971 / 60,
    title: "Continue in Terminal",
    caption:
      "Switch between Terminal and Chat while staying with the same piece of work."
  },
  {
    start: 971 / 60,
    end: 1177 / 60,
    title: "Speak with voice input",
    caption:
      "Speak while the Listening indicator and waveform show voice input is active."
  },
  {
    start: 1177 / 60,
    end: 1383 / 60,
    title: "Keep a Markdown note",
    caption:
      "Write a Markdown note in Focus to keep project details close at hand."
  },
  {
    start: 1383 / 60,
    end: 1611 / 60,
    title: "Attach a reminder",
    caption:
      "Set a reminder with its project and worktree attached for the next step."
  }
] as const

export function getDemoSceneIndex(currentTime: number) {
  return Math.max(
    0,
    DEMO_SCENES.findLastIndex((scene) => currentTime >= scene.start)
  )
}
