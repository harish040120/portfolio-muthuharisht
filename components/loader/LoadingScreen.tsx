"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const loadingMessages = [
  "Initializing AI Systems",
  "Loading Research",
  "Loading Projects",
  "Launching Portfolio",
]

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [dismissed, setDismissed] = useState(false)

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
          <div className="relative mb-12 flex items-center justify-center" aria-hidden="true">
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
                    initial={{ opacity: 0.3, scale: 0.5 }}
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
                const angle2 = ((i + 1) % 6 * 60 - 90) * (Math.PI / 180)
                return (
                  <motion.line
                    key={`conn-${i}`}
                    x1={60 + 42 * Math.cos(angle1)}
                    y1={60 + 42 * Math.sin(angle1)}
                    x2={60 + 42 * Math.cos(angle2)}
                    y2={60 + 42 * Math.sin(angle2)}
                    stroke="#00D4FF"
                    strokeWidth="1"
                    initial={{ opacity: 0.1 }}
                    animate={{ opacity: [0.1, 0.5, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                  />
                )
              })}
            </svg>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-space text-sm tracking-widest text-primary/80 mb-6"
            >
              {loadingMessages[messageIndex]}
            </motion.p>
          </AnimatePresence>

          <div className="h-[2px] w-64 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <button
            onClick={handleSkip}
            className="mt-8 cursor-pointer text-xs text-white/30 transition-colors hover:text-white/60"
            aria-label="Skip loading animation"
          >
            Skip →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
