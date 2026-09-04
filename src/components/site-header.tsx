import { DownloadSimpleIcon, GithubLogoIcon } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { DOWNLOAD_URL, GITHUB_URL, navigation } from "@/content/landing"

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2.5 rounded-md"
          aria-label="Hive home"
        >
          <img
            src="/hive-app-icon.webp"
            width={32}
            height={32}
            alt=""
            className="size-8 rounded-lg"
          />
          <span className="text-sm font-semibold tracking-[-0.02em]">Hive</span>
        </a>

        <nav className="ml-auto hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            <GithubLogoIcon aria-hidden="true" className="size-4" weight="regular" />
            GitHub
          </a>
        </nav>

        <Button
          size="lg"
          nativeButton={false}
          render={<a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" />}
          className="ml-auto h-9 px-3.5 md:ml-4"
        >
          <DownloadSimpleIcon data-icon="inline-start" aria-hidden="true" />
          <span className="hidden sm:inline">Download for macOS</span>
          <span className="sm:hidden">Download</span>
        </Button>
      </div>
    </header>
  )
}
