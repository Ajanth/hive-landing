"use client"

import { useEffect, useState } from "react"
import { MoonIcon, SunIcon } from "@phosphor-icons/react"

import { DownloadButton } from "@/components/download-button"

export function SiteHeader() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme ?? "dark")

  useEffect(() => {
    const preference = matchMedia("(prefers-color-scheme: dark)")
    function followSystem() {
      try { if (localStorage.getItem("hive-theme")) return } catch { /* System preference still works without storage. */ }
      const next = preference.matches ? "dark" : "light"
      document.documentElement.dataset.theme = next
      setTheme(next)
    }
    preference.addEventListener("change", followSystem)
    return () => preference.removeEventListener("change", followSystem)
  }, [])

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark"
    document.documentElement.dataset.theme = next
    setTheme(next)
    try { localStorage.setItem("hive-theme", next) } catch { /* The toggle also works when storage is disabled. */ }
  }

  return (
    <header className="site-header section-shell">
      <a className="wordmark" href="#" aria-label="Hive home">
        <img src="/hive-app-icon.webp" alt="" width={28} height={28} />
        Hive
      </a>
      <nav aria-label="Main navigation">
        <a href="#product">Product</a>
        <a href="#workflow">Workflow</a>
        <a className="nav-github" href="https://github.com/Ajanth/hive-public" target="_blank" rel="noreferrer">GitHub</a>
      </nav>
      <div className="header-actions">
        <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
          {theme === "dark" ? <SunIcon size={19} aria-hidden="true" /> : <MoonIcon size={19} aria-hidden="true" />}
        </button>
        <DownloadButton compact />
      </div>
    </header>
  )
}
