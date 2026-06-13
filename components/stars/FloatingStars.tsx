"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  alpha: number
  alphaTarget: number
  speed: number
  twinkleSpeed: number
  twinklePhase: number
  hue: number
  flash: number
}

function FloatingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    let animId: number
    const stars: Star[] = []
    const STAR_COUNT = 50

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.3 + 0.05,
        alphaTarget: Math.random() * 0.4 + 0.1,
        speed: Math.random() * 0.12 + 0.02,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.85 ? 200 + Math.random() * 40 : 185 + Math.random() * 10,
        flash: 0,
      })
    }

    let time = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.016

      for (const s of stars) {
        s.y += s.speed
        if (s.y > canvas.height + 5) {
          s.y = -5
          s.x = Math.random() * canvas.width
        }

        s.twinklePhase += s.twinkleSpeed
        const twinkle = Math.sin(s.twinklePhase) * 0.5 + 0.5
        s.alpha += (s.alphaTarget * twinkle - s.alpha) * 0.05

        if (s.flash > 0) {
          s.alpha = Math.min(s.alpha + s.flash, 1)
          s.flash *= 0.92
          if (s.flash < 0.01) s.flash = 0
        }

        if (Math.random() < 0.0003) {
          s.flash = 0.6
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${s.hue}, 90%, 70%, ${s.alpha})`
        ctx.fill()

        if (s.size > 1.5 && s.alpha > 0.2) {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${s.hue}, 90%, 70%, ${s.alpha * 0.08})`
          ctx.fill()
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />
}

export { FloatingStars }
