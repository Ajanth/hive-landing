import { DownloadSimpleIcon } from "@phosphor-icons/react"

import { Galaxy } from "@/components/galaxy"
import { DOWNLOAD_URL } from "@/content/landing"

export default function App() {
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
        <a className="download-button" href={DOWNLOAD_URL}>
          <DownloadSimpleIcon size={20} aria-hidden="true" />
          Download for macOS
        </a>
      </div>
      <Galaxy />
    </main>
  )
}
