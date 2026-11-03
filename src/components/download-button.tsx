import { AppleLogoIcon, ArrowDownIcon } from "@phosphor-icons/react"

import { useRelease } from "@/components/release-provider"

export function DownloadButton({ compact = false }: { compact?: boolean }) {
  const { isLoading, release } = useRelease()

  return (
    <a
      className={`download-button${compact ? " download-button-compact" : ""}`}
      aria-label={compact ? "Download for macOS" : undefined}
      href={
        release?.downloadUrl ?? "https://github.com/Ajanth/hive-public/releases"
      }
      aria-busy={isLoading}
      title={
        isLoading
          ? "Checking the latest release"
          : release
            ? undefined
            : "Browse available releases on GitHub"
      }
    >
      {compact ? (
        <ArrowDownIcon size={15} aria-hidden="true" />
      ) : (
        <AppleLogoIcon size={19} weight="fill" aria-hidden="true" />
      )}
      <span>{compact ? "Download" : "Download for macOS"}</span>
    </a>
  )
}
