import { GithubLogoIcon } from "@phosphor-icons/react"

import { GITHUB_URL, navigation } from "@/content/landing"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 py-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
        <a href="#top" className="flex items-center gap-2 text-sm font-semibold">
          <img src="/hive-app-icon.webp" width={28} height={28} alt="" className="size-7 rounded-md" />
          Hive
        </a>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 md:ml-auto" aria-label="Footer navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
              {item.label}
            </a>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <GithubLogoIcon aria-hidden="true" className="size-4" />
            Releases and issues
          </a>
        </nav>
      </div>
    </footer>
  )
}
