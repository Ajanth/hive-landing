export const DOWNLOAD_URL = "https://github.com/Ajanth/hive-public/releases"
export const GITHUB_URL = "https://github.com/Ajanth/hive-public"

export const navigation = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Privacy", href: "#privacy" },
] as const

export const outcomes = [
  {
    title: "Orient",
    body: "See what is active, waiting, finished, or unread without reopening every conversation.",
  },
  {
    title: "Recover",
    body: "Search old sessions and return to the exact message, tool result, or decision you need.",
  },
  {
    title: "Remember",
    body: "Keep notes, bookmarks, reminders, and recaps beside the thread that produced them.",
  },
  {
    title: "Deliver",
    body: "Continue in the right worktree, review changes, and follow pull request checks.",
  },
] as const

export const screenshotSlots = [
  {
    src: "/screenshots/hive-board.webp",
    title: "The Board",
    description: "Now, Queue, and Done turn OpenCode sessions into a workflow you can read at a glance.",
    className: "md:col-span-7 md:row-span-2",
    aspectClassName: "aspect-[16/11] md:h-full md:aspect-auto",
  },
  {
    src: "/screenshots/hive-conversation.webp",
    title: "Conversation",
    description: "Readable transcripts keep prompts, responses, tools, and failures in context.",
    className: "md:col-span-5",
    aspectClassName: "aspect-[16/10]",
  },
  {
    src: "/screenshots/hive-delivery.webp",
    title: "Delivery",
    description: "Worktree, commit, pull request, and CI state stay close to the work.",
    className: "md:col-span-5",
    aspectClassName: "aspect-[16/10]",
  },
] as const
