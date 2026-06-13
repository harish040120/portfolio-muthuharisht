"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const loadingMessages = [
  "Initializing AI Systems",
  "Loading Research",
  "Loading Projects",
  "Launching Portfolio",
]

function TypewriterText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    setDisplayed("")
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(blink)
  }, [])

  return (
    <span className="font-mono">
      {displayed}
      <span className={`ml-0.5 inline-block w-[2px] h-[1em] bg-primary align-middle transition-opacity ${cursorVisible ? "opacity-100" : "opacity-0"}`} />
    </span>
  )
}

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  const [scanPos, setScanPos] = useState(0)
  const scanRef = useRef<number | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 8 + 2
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setDismissed(true)
            setTimeout(() => onComplete?.(), 300)
          }, 600)
          return 100
        }
        return Math.min(next, 100)
      })
    }, 250)

    return () => clearInterval(timer)
  }, [onComplete])

  useEffect(() => {
    if (progress < 25) setMessageIndex(0)
    else if (progress < 50) setMessageIndex(1)
    else if (progress < 75) setMessageIndex(2)
    else if (progress < 99) setMessageIndex(3)
  }, [progress])

  useEffect(() => {
    const animate = () => {
      setScanPos((prev) => {
        const next = prev + 1.5
        return next > 110 ? -10 : next
      })
      scanRef.current = requestAnimationFrame(animate)
    }
    scanRef.current = requestAnimationFrame(animate)
    return () => {
      if (scanRef.current) cancelAnimationFrame(scanRef.current)
    }
  }, [])

  const handleSkip = () => {
    setProgress(100)
    setDismissed(true)
    setTimeout(() => onComplete?.(), 300)
  }

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050816]"
          role="progressbar"
          aria-valuenow={progress}
          aria-label="Loading"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative mb-10"
            aria-hidden="true"
          >
            <svg width="120" height="120" viewBox="0 0 120 120">
              <text x="60" y="68" textAnchor="middle" fill="#00D4FF" fontSize="36" fontWeight="bold" fontFamily="'Clash Display', sans-serif">MH</text>
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const angle = (i * 60 - 90) * (Math.PI / 180)
                const cx = 60 + 42 * Math.cos(angle)
                const cy = 60 + 42 * Math.sin(angle)
                const delay = i * 0.3
                return (
                  <motion.circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="5"
                    fill="#00D4FF"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay, ease: "easeInOut" }}
                  />
                )
              })}
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const angle1 = (i * 60 - 90) * (Math.PI / 180)
                const angle2 = (((i + 1) % 6) * 60 - 90) * (Math.PI / 180)
                return (
                  <motion.line
                    key={`conn-${i}`}
                    x1={60 + 42 * Math.cos(angle1)}
                    y1={60 + 42 * Math.sin(angle1)}
                    x2={60 + 42 * Math.cos(angle2)}
                    y2={60 + 42 * Math.sin(angle2)}
                    stroke="#00D4FF"
                    strokeWidth="1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.1, 0.4, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                  />
                )
              })}
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="h-5 mb-6 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-space text-sm tracking-widest text-primary/80"
              >
                <TypewriterText text={loadingMessages[messageIndex]} speed={25} />
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="relative h-[2px] w-64 overflow-hidden rounded-full bg-white/10"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{ left: `${scanPos}%` }}
            />
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={handleSkip}
            className="mt-8 cursor-pointer text-xs text-white/30 transition-colors hover:text-white/60"
            aria-label="Skip loading animation"
          >
            Skip →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
