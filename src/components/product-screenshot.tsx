import { ImageSquareIcon } from "@phosphor-icons/react"
import { useState } from "react"

import { cn } from "@/lib/utils"

interface ProductScreenshotProps {
  src: string
  alt: string
  className?: string
}

export function ProductScreenshot({ src, alt, className }: ProductScreenshotProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading")

  return (
    <div className={cn("screenshot-surface relative overflow-hidden", className)}>
      <img
        src={src}
        alt={status === "ready" ? alt : ""}
        aria-hidden={status !== "ready"}
        loading="lazy"
        decoding="async"
        className={cn(
          "size-full object-cover object-top transition-opacity duration-200",
          status === "ready" ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setStatus("ready")}
        onError={() => setStatus("missing")}
      />

      {status !== "ready" ? (
        <div
          className={cn(
            "absolute inset-0 grid place-items-center",
            status === "loading" && "screenshot-skeleton",
          )}
          role="img"
          aria-label={`${alt}. Screenshot asset not added yet.`}
        >
          {status === "missing" ? (
            <div className="max-w-xs px-6 text-center">
              <ImageSquareIcon aria-hidden="true" className="mx-auto size-7 text-brand" weight="regular" />
              <p className="mt-3 text-sm font-medium text-foreground">Hive screenshot ready to replace</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{src.replace("/screenshots/", "")}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
