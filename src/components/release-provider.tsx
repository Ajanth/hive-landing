/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'

type Release = {
  version: string
  downloadUrl: string
}

type ReleaseContextValue = {
  isLoading: boolean
  release: Release | null
}

const ReleaseContext = React.createContext<ReleaseContextValue | undefined>(
  undefined,
)

function parseRelease(value: unknown): Release | null {
  if (typeof value !== 'object' || value === null) {
    return null
  }

  const manifest = value as Record<string, unknown>
  if (
    typeof manifest.version !== 'string' ||
    typeof manifest.downloadUrl !== 'string'
  ) {
    return null
  }

  return {
    version: manifest.version,
    downloadUrl: manifest.downloadUrl,
  }
}

export function ReleaseProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<ReleaseContextValue>({
    isLoading: true,
    release: null,
  })

  React.useEffect(() => {
    const controller = new AbortController()

    async function loadRelease() {
      try {
        const response = await fetch('/release.json', {
          cache: 'no-store',
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Release manifest returned ${response.status}`)
        }

        const release = parseRelease(await response.json())
        setState({ isLoading: false, release })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        setState({ isLoading: false, release: null })
      }
    }

    void loadRelease()
    return () => controller.abort()
  }, [])

  return (
    <ReleaseContext.Provider value={state}>{children}</ReleaseContext.Provider>
  )
}

export function useRelease() {
  const context = React.useContext(ReleaseContext)
  if (context === undefined) {
    throw new Error('useRelease must be used within a ReleaseProvider')
  }

  return context
}
