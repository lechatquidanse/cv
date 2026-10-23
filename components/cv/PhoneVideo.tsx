"use client"

import { useEffect, useRef, useState } from "react"
import { staticFile } from "@/lib/cv/format"
import type { PhoneClip } from "@/lib/cv/types"
import { PauseIcon, PlayIcon } from "./icons"

/**
 * A muted phone-format clip that plays on a loop only while it is on screen.
 * With reduced motion it stays on its poster until the visitor presses Play;
 * the button always lets the visitor pause it (WCAG 2.2.2).
 */
export function PhoneVideo({ clip }: { clip: PhoneClip }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const pausedByVisitor = useRef(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pausedByVisitor.current) video.play().catch(() => undefined)
        else video.pause()
      },
      { threshold: 0.5 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      pausedByVisitor.current = false
      video.play().catch(() => undefined)
    } else {
      pausedByVisitor.current = true
      video.pause()
    }
  }

  return (
    <figure className="relative mx-auto w-[200px] shrink-0 lg:mx-0">
      <video
        ref={videoRef}
        className="aspect-[360/780] w-full rounded-[28px] border border-rule bg-black object-cover"
        poster={staticFile(clip.poster)}
        width={clip.width}
        height={clip.height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={clip.description}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {clip.sources.map((source) => (
          <source key={source.src} src={staticFile(source.src)} type={source.type} />
        ))}
      </video>
      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm"
        aria-label={playing ? "Pause video" : "Play video"}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
    </figure>
  )
}
