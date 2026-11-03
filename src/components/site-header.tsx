import { DownloadButton } from "@/components/download-button"

export function SiteHeader() {
  return (
    <header className="site-header section-shell">
      <a className="wordmark" href="#" aria-label="Hive home">
        <img src="/hive-app-icon.webp" alt="" width={28} height={28} />
        Hive
      </a>
      <nav aria-label="Main navigation">
        <a href="#product">Product</a>
        <a href="#workflow">Workflow</a>
        <a
          className="nav-github"
          href="https://github.com/Ajanth/hive-public"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </nav>
      <div className="header-actions">
        <DownloadButton compact />
      </div>
    </header>
  )
}
