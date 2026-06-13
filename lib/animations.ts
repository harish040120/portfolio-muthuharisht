"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const PREFERS_REDUCED =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false

const MATRIX_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*"

/**
 * Matrix decrypt reveal — random characters resolve to final text.
 * Returns a GSAP timeline the caller can place in a ScrollTrigger or play immediately.
 */
export function matrixReveal(
  el: HTMLElement,
  text: string,
  opts?: { duration?: number; delay?: number; stagger?: number; onComplete?: () => void }
): gsap.core.Timeline {
  const tl = gsap.timeline({ delay: opts?.delay ?? 0, onComplete: opts?.onComplete })
  const duration = opts?.duration ?? 1.2
  const finalChars = text.split("")
  const totalFrames = Math.ceil(duration * 30)

  el.textContent = ""
  el.style.visibility = "visible"

  for (let frame = 0; frame < totalFrames; frame++) {
    const progress = frame / totalFrames
    const resolvedCount = Math.floor(progress * finalChars.length)
    let display = ""
    for (let i = 0; i < finalChars.length; i++) {
      if (finalChars[i] === " ") {
        display += " "
      } else if (i < resolvedCount) {
        display += finalChars[i]
      } else {
        display += MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
      }
    }
    tl.set(el, { textContent: display }, (frame / totalFrames) * duration)
  }
  tl.set(el, { textContent: text })
  return tl
}

/**
 * Typewriter — character-by-character reveal with a blinking cursor.
 */
export function typewriter(
  el: HTMLElement,
  text: string,
  opts?: { speed?: number; delay?: number; cursor?: boolean }
): gsap.core.Timeline {
  const tl = gsap.timeline({ delay: opts?.delay ?? 0 })
  const speed = opts?.speed ?? 0.03
  const chars = text.split("")

  el.textContent = ""
  el.style.visibility = "visible"

  if (opts?.cursor !== false) {
    const cursor = document.createElement("span")
    cursor.className = "matrix-cursor"
    cursor.textContent = "█"
    el.appendChild(cursor)
  }

  chars.forEach((char, i) => {
    tl.call(
      () => {
        const cursor = el.querySelector(".matrix-cursor")
        if (cursor) el.insertBefore(document.createTextNode(char), cursor)
        else el.textContent += char
      },
      undefined,
      i * speed
    )
  })

  return tl
}

/**
 * Glow pulse — breathing box-shadow animation.
 */
export function glowPulse(
  el: HTMLElement,
  color: string = "rgba(0,212,255,0.25)",
  opts?: { duration?: number; delay?: number }
): gsap.core.Tween {
  return gsap.fromTo(
    el,
    { boxShadow: `0 0 0px ${color}` },
    {
      boxShadow: `0 0 20px ${color}`,
      duration: opts?.duration ?? 1.5,
      delay: opts?.delay ?? 0,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    }
  )
}

/**
 * Scan line sweep — a horizontal line sweeps down over an element.
 */
export function scanLine(
  el: HTMLElement,
  opts?: { duration?: number; color?: string; delay?: number }
): gsap.core.Timeline {
  const tl = gsap.timeline({ delay: opts?.delay ?? 0 })
  const line = document.createElement("div")
  line.className = "scan-line"
  line.style.cssText = `
    position:absolute;left:0;right:0;height:2px;
    background:${opts?.color ?? "rgba(0,212,255,0.4)"};
    box-shadow:0 0 8px ${opts?.color ?? "rgba(0,212,255,0.4)"};
    pointer-events:none;z-index:50;
  `
  el.style.position = "relative"
  el.style.overflow = "hidden"
  el.appendChild(line)

  tl.fromTo(line, { top: "0%" }, { top: "100%", duration: opts?.duration ?? 1.5, ease: "power2.inOut" })
    .call(() => line.remove())
  return tl
}

/**
 * Safe ScrollTrigger helper — skips if prefers-reduced-motion.
 */
export function safeScrollTrigger(
  trigger: string | Element,
  onEnter: () => void,
  opts?: { start?: string; once?: boolean }
): ScrollTrigger | undefined {
  if (PREFERS_REDUCED) return undefined
  return ScrollTrigger.create({
    trigger,
    start: opts?.start ?? "top 80%",
    once: opts?.once ?? true,
    onEnter,
  })
}

export { gsap, ScrollTrigger }
