import { DesktopIcon } from "@phosphor-icons/react"

import { useRelease } from "@/components/release-provider"
import { Galaxy } from "@/components/galaxy"

export default function App() {
  const { isLoading, release } = useRelease()
  const downloadLabel = release
    ? "Download for macOS"
    : isLoading
      ? "Checking release…"
      : "Download unavailable"

  return (
    <main className="hero">
      <div className="hero-copy">
        <div className="wordmark">Hive</div>
        <h1>
          <span>Your agent work.</span>
          <span>In one place.</span>
        </h1>
        <p className="hero-description">
          A local workspace to visualize and organize your agent sessions,
          context, and next steps.
        </p>
        <a
          className="download-button"
          href={release?.downloadUrl}
          aria-disabled={release ? undefined : true}
        >
          <DesktopIcon size={22} weight="regular" aria-hidden="true" />
          {downloadLabel}
        </a>
      </div>
      <Galaxy />
    </main>
  )
}
