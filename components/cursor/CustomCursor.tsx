"use client"

import { useEffect, useRef } from "react"

const TRAIL_LENGTH = 5
const LERP = (a: number, b: number, t: number) => a + (b - a) * t

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const trailsRef = useRef<HTMLDivElement[]>([])
  const mouse = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const trailPositions = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 })))
  const visible = useRef(false)
  const hovering = useRef(false)
  const hue = useRef(195)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768
    if (isMobile) return

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (!visible.current) {
        visible.current = true
        ring.current.x = e.clientX
        ring.current.y = e.clientY
        trailPositions.current.forEach((t) => { t.x = e.clientX; t.y = e.clientY })
      }
    }

    const onEnter = () => { visible.current = true }
    const onLeave = () => { visible.current = false }

    const onHoverStart = () => { hovering.current = true }
    const onHoverEnd = () => { hovering.current = false }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseenter", onEnter)
    document.addEventListener("mouseleave", onLeave)

    const hoverables = document.querySelectorAll("a, button, [role='button'], input, textarea, select, [data-hoverable]")
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onHoverStart)
      el.addEventListener("mouseleave", onHoverEnd)
    })

    let raf: number
    const animate = () => {
      const mx = mouse.current.x
      const my = mouse.current.y
      const isVisible = visible.current
      const isHovering = hovering.current

      ring.current.x = LERP(ring.current.x, mx, 0.15)
      ring.current.y = LERP(ring.current.y, my, 0.15)

      for (let i = TRAIL_LENGTH - 1; i >= 1; i--) {
        trailPositions.current[i].x = LERP(trailPositions.current[i].x, trailPositions.current[i - 1].x, 0.35)
        trailPositions.current[i].y = LERP(trailPositions.current[i].y, trailPositions.current[i - 1].y, 0.35)
      }
      trailPositions.current[0].x = LERP(trailPositions.current[0].x, ring.current.x, 0.3)
      trailPositions.current[0].y = LERP(trailPositions.current[0].y, ring.current.y, 0.3)

      const targetHue = isHovering ? 170 : 195
      hue.current = LERP(hue.current, targetHue, 0.08)

      const outer = ringRef.current
      const inner = dotRef.current
      if (outer) {
        outer.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px) scale(${isHovering ? 1.6 : isVisible ? 1 : 0})`
        outer.style.opacity = isVisible ? "1" : "0"
        outer.style.borderColor = `hsl(${hue.current}, 90%, 65%)`
        outer.style.boxShadow = isHovering
          ? `0 0 12px 2px hsla(${hue.current}, 90%, 65%, 0.5), inset 0 0 8px hsla(${hue.current}, 90%, 65%, 0.2)`
          : `0 0 6px hsla(${hue.current}, 90%, 65%, 0.25)`
      }
      if (inner) {
        inner.style.transform = `translate(${mx - 4}px, ${my - 4}px) scale(${isHovering ? 0.5 : 1})`
        inner.style.opacity = isVisible ? "1" : "0"
      }

      trailsRef.current.forEach((trail, i) => {
        if (trail) {
          const alpha = ((TRAIL_LENGTH - i) / TRAIL_LENGTH) * 0.35
          const size = ((TRAIL_LENGTH - i) / TRAIL_LENGTH) * 6
          trail.style.transform = `translate(${trailPositions.current[i].x - size / 2}px, ${trailPositions.current[i].y - size / 2}px)`
          trail.style.width = `${size}px`
          trail.style.height = `${size}px`
          trail.style.opacity = isVisible ? String(alpha) : "0"
        }
      })

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseenter", onEnter)
      document.removeEventListener("mouseleave", onLeave)
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverStart)
        el.removeEventListener("mouseleave", onHoverEnd)
      })
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden="true">
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailsRef.current[i] = el }}
          className="absolute left-0 top-0 rounded-full bg-primary mix-blend-screen"
          style={{ opacity: 0, width: 6, height: 6 }}
        />
      ))}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-[36px] w-[36px] rounded-full border border-primary/60 mix-blend-difference transition-[width,height] duration-150"
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-[8px] w-[8px] rounded-full bg-primary mix-blend-screen"
      />
    </div>
  )
}
