"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { certifications } from "@/data/certifications"
import { ChevronLeft, ChevronRight } from "lucide-react"

const BASE_INTERVAL_MS = 2000
const MOBILE_INTERVAL_MS = 5000

export default function Certifications() {
  const [current, setCurrent] = useState(0)
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({})
  const [direction, setDirection] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const currentRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768)
  }, [])

  const total = certifications.length

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir)
    setCurrent(idx)
    currentRef.current = idx
  }, [])

  const handlePrev = useCallback(() => {
    const next = currentRef.current === 0 ? total - 1 : currentRef.current - 1
    goTo(next, -1)
  }, [total, goTo])

  const handleNext = useCallback(() => {
    const next = currentRef.current === total - 1 ? 0 : currentRef.current + 1
    goTo(next, 1)
  }, [total, goTo])

  /* Auto-play */
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      const next = currentRef.current === total - 1 ? 0 : currentRef.current + 1
      goTo(next, 1)
    }, isMobile ? MOBILE_INTERVAL_MS : BASE_INTERVAL_MS)
  }, [total, goTo, isMobile])

  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [resetTimer])

  /* Pause on hover */
  const pauseTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  const resumeTimer = useCallback(() => {
    resetTimer()
  }, [resetTimer])

  /* Keyboard nav */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [handlePrev, handleNext])

  const cert = certifications[current]
  const hasImage = cert.image && !failedImages[current]

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  }

  return (
    <section id="certifications" className="relative z-10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-clash text-3xl font-bold text-white md:text-5xl">
            <span className="gradient-text">Certifications</span>
          </h2>
        </motion.div>

        {/* Deck container */}
        <div
          className="relative mx-auto max-w-2xl"
          onMouseEnter={pauseTimer}
          onMouseLeave={resumeTimer}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="glass-card aspect-[4/3] overflow-hidden"
            >
              {hasImage ? (
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cert.image!}
                    alt={cert.name}
                    className="h-full w-full object-cover"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [current]: true }))
                    }
                  />
                </motion.div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-surface" />
              )}

              {/* Bottom gradient + name overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-12">
                <h3 className="font-clash text-base font-semibold text-white sm:text-lg">
                  {cert.name}
                </h3>
                <p className="mt-1 font-space text-xs text-primary/80 sm:text-sm">
                  {cert.provider}
                </p>
                {(cert.score || cert.date) && (
                  <div className="mt-2 flex items-center gap-2">
                    {cert.score && (
                      <span className="rounded-full bg-accent/20 px-2.5 py-0.5 font-jetbrains text-[11px] text-accent">
                        {cert.score}
                      </span>
                    )}
                    {cert.date && (
                      <span className="font-inter text-[11px] text-white/40">
                        {cert.date}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Side navigation arrows */}
          <button
            onClick={() => {
              handlePrev()
              resetTimer()
            }}
            className="absolute -left-5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-surface/80 text-white/60 backdrop-blur-sm transition-all hover:border-primary/30 hover:text-primary"
            aria-label="Previous certification"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => {
              handleNext()
              resetTimer()
            }}
            className="absolute -right-5 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-surface/80 text-white/60 backdrop-blur-sm transition-all hover:border-primary/30 hover:text-primary"
            aria-label="Next certification"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {certifications.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                goTo(i, i > current ? 1 : -1)
                resetTimer()
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-primary"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to certification ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
