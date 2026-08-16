"use client"

import { useState, type DragEvent } from "react"
import { X, Search, Loader2, Link2 } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { isTauri, openExternalUrl, bilibiliSearch, type BilibiliResult } from "@/lib/tauri"

function BilibiliIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.764-1.56 3.76-1.004.995-2.264 1.52-3.773 1.573H5.333c-1.51-.054-2.769-.578-3.773-1.573C.556 20.111.036 18.857 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.264-1.52 3.773-1.574h.854L8.08 2.347c.219-.226.471-.338.756-.338.285 0 .537.112.756.338l2.374 2.307h2.107l2.374-2.307c.219-.226.471-.338.756-.338.285 0 .537.112.756.338l1.854 2.306Zm-.854 1.92-.012-.002h-9.894l-.012.002c-1.126.04-2.051.41-2.773 1.109-.723.698-1.09 1.622-1.102 2.77v7.093c.013 1.148.38 2.072 1.102 2.77.722.698 1.647 1.069 2.773 1.109h13.368c1.126-.04 2.051-.411 2.773-1.109.722-.698 1.089-1.622 1.102-2.77v-7.093c-.013-1.148-.38-1.958-1.102-2.77-.722-.812-1.647-1.07-2.773-1.11Zm-1.84 5.44c.424 0 .786.147 1.085.442.3.294.45.65.45 1.069v.062c0 .419-.15.775-.45 1.07-.3.294-.661.441-1.085.441-.424 0-.786-.147-1.085-.442-.3-.294-.45-.65-.45-1.069v-.062c0-.419.15-.775.45-1.069.3-.295.661-.442 1.085-.442Zm-8.587 0c.424 0 .786.147 1.085.442.3.294.45.65.45 1.069v.062c0 .419-.15.775-.45 1.07-.3.294-.661.441-1.085.441-.424 0-.786-.147-1.085-.442-.3-.294-.45-.65-.45-1.069v-.062c0-.419.15-.775.45-1.069.3-.295.661-.442 1.085-.442Z"
        fill="currentColor"
      />
    </svg>
  )
}

const BILIBILI_HOME = "https://www.bilibili.com/"
const BILIBILI_EMBED = "https://player.bilibili.com/player.html"

function extractBvid(value: string): string | null {
  const patterns = [/video\/(BV[\w]+)/, /(?:^|\/)(BV[\w]{10})(?:[?&#/]|$)/, /\bBV[\w]{10}\b/]
  for (const p of patterns) {
    const match = value.match(p)
    if (match) return match[1]
  }
  return null
}

function getDroppedText(dataTransfer: DataTransfer): string {
  const uriList = dataTransfer.getData("text/uri-list")
  if (uriList) return uriList

  const plain = dataTransfer.getData("text/plain")
  if (plain) return plain

  const html = dataTransfer.getData("text/html")
  const href = html.match(/href=["']([^"']+)["']/i)?.[1]
  return href ?? html
}

function hasLinkPayload(dataTransfer: DataTransfer): boolean {
  return Array.from(dataTransfer.types).some((type) =>
    ["text/uri-list", "text/plain", "text/html"].includes(type)
  )
}

export function MusicWidget() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<BilibiliResult[]>([])
  const [bvid, setBvid] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const { t } = useI18n()
  const searchEnabled = isTauri()
  const dropHint = t("music.dropHint")
  const dropReady = t("music.dropReady")
  const dropInvalid = t("music.dropInvalid")

  const playVideo = (id: string) => {
    setBvid(id)
    setResults([])
    setError(null)
    setQuery("")
  }

  const handleSearch = async () => {
    const q = query.trim()
    if (!q) return

    const id = extractBvid(q)
    if (id) {
      playVideo(id)
      return
    }

    if (!searchEnabled) {
      setError(t("music.invalidLink"))
      return
    }

    setLoading(true)
    setError(null)
    try {
      const items = await bilibiliSearch(q)
      setResults(items)
      if (items.length === 0) setError(t("music.noResults"))
    } catch {
      setError(t("music.searchError"))
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setBvid(null)
    setResults([])
    setQuery("")
    setError(null)
    setDragActive(false)
  }

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    if (!hasLinkPayload(event.dataTransfer)) return
    event.preventDefault()
    setDragActive(true)
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    if (!hasLinkPayload(event.dataTransfer)) return
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
    setDragActive(true)
  }

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return
    setDragActive(false)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    if (!hasLinkPayload(event.dataTransfer)) return
    event.preventDefault()
    setDragActive(false)

    const id = extractBvid(getDroppedText(event.dataTransfer))
    if (id) {
      playVideo(id)
    } else {
      setError(dropInvalid)
    }
  }

  return (
    <div
      className={`glass-tile music-widget widget-span-2 relative overflow-hidden p-0 ${dragActive ? "music-widget-drop-active" : ""}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {dragActive && (
        <div className="pointer-events-none absolute inset-3 z-20 flex items-center justify-center rounded-2xl border border-pink-400/50 bg-background/80 px-4 text-center text-sm font-medium text-foreground shadow-lg backdrop-blur-md">
          <span className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-pink-500" />
            {dropReady}
          </span>
        </div>
      )}

      <div className="music-widget-header flex items-center justify-between gap-2 px-5 pb-3 pr-14 pt-5">
        <button
          type="button"
          onClick={() => void openExternalUrl(BILIBILI_HOME)}
          className="dashboard-widget-title dashboard-widget-title-link"
          title={t("music.title")}
        >
          <BilibiliIcon className="h-4 w-4 text-pink-500" />
          <span>{t("music.title")}</span>
        </button>
        {(bvid || results.length > 0) && (
          <button
            type="button"
            onClick={reset}
            className="music-close-button flex h-7 w-7 items-center justify-center rounded-lg bg-muted"
            aria-label={t("music.close")}
          >
            <X className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        )}
      </div>

      {!bvid && (
        <div className="music-search-row flex gap-2 px-5 pb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && void handleSearch()}
            placeholder={searchEnabled ? t("music.searchPlaceholder") : t("music.paste")}
            className="dashboard-control music-search-input min-w-0 flex-1 px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/55 focus-visible:ring-2 focus-visible:ring-ring/35"
          />
          <button
            type="button"
            onClick={() => void handleSearch()}
            disabled={loading || !query.trim()}
            className="music-search-button flex shrink-0 items-center gap-1.5 rounded-xl bg-pink-500/90 px-4 py-2 text-sm font-medium text-white transition-[background-color,opacity,transform] hover:bg-pink-500 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            {searchEnabled ? t("music.search") : t("music.play")}
          </button>
        </div>
      )}

      {error && <p className="px-5 pb-2 text-xs text-muted-foreground">{error}</p>}

      {bvid ? (
        <div className="music-player overflow-hidden border-t border-border/50 bg-black/90">
          <div className="relative h-full min-h-0 w-full">
            <iframe
              title={t("music.title")}
              src={`${BILIBILI_EMBED}?bvid=${bvid}&autoplay=1&high_quality=1&danmaku=0&page=1`}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      ) : results.length > 0 ? (
        <ul className="music-results custom-scrollbar space-y-1.5 overflow-y-auto px-5 pb-5 pr-3">
          {results.map((video) => (
            <li key={video.id}>
              <button
                type="button"
                onClick={() => setBvid(video.id)}
                className="flex w-full items-center gap-3 rounded-xl border border-transparent p-1.5 text-left transition-colors hover:border-border/60 hover:bg-foreground/5 focus-visible:border-ring focus-visible:outline-none"
              >
                <img
                  src={video.thumbnail}
                  alt=""
                  loading="lazy"
                  className="aspect-video h-12 w-[4.25rem] shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{video.title}</p>
                  {video.channel && (
                    <p className="truncate text-xs text-muted-foreground">{video.channel}</p>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="dashboard-control music-empty mx-5 mb-5 flex items-center justify-center px-4 text-center text-xs text-muted-foreground">
          {searchEnabled ? dropHint : t("music.empty")}
        </div>
      )}
    </div>
  )
}
