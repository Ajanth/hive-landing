import { DesktopIcon } from "@phosphor-icons/react"

import { useRelease } from "@/components/release-provider"

export function DownloadButton({ compact = false }: { compact?: boolean }) {
  const { isLoading, release } = useRelease()

  return (
    <a
      className={`download-button${compact ? " download-button-compact" : ""}`}
      href={release?.downloadUrl ?? (isLoading ? undefined : "https://github.com/Ajanth/hive-public/releases")}
      aria-disabled={isLoading ? true : undefined}
      aria-busy={isLoading}
      title={isLoading ? "Checking the latest release" : release ? undefined : "Browse available releases on GitHub"}
    >
      <DesktopIcon size={19} weight="regular" aria-hidden="true" />
      Download for macOS
    </a>
  )
}
