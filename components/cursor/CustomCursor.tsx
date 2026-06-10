"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [visible, setVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400 }
  const dotX = useSpring(cursorX, springConfig)
  const dotY = useSpring(cursorY, springConfig)

  const ringConfig = { damping: 30, stiffness: 200 }
  const ringX = useSpring(cursorX, ringConfig)
  const ringY = useSpring(cursorY, ringConfig)

  const onMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
    if (!visible) setVisible(true)
  }, [cursorX, cursorY, visible])

  const onMouseDown = useCallback(() => setIsClicking(true), [])
  const onMouseUp = useCallback(() => setIsClicking(false), [])

  const onMouseEnter = useCallback(() => setVisible(true), [])
  const onMouseLeave = useCallback(() => setVisible(false), [])

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseenter", onMouseEnter)
    document.addEventListener("mouseleave", onMouseLeave)

    const handleHoverStart = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.closest("a, button, input, textarea, [role='button'], [role='navigation']")) {
        setIsHovering(true)
      }
    }
    const handleHoverEnd = () => setIsHovering(false)

    document.addEventListener("mouseover", handleHoverStart)
    document.addEventListener("mouseout", handleHoverEnd)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseover", handleHoverStart)
      document.removeEventListener("mouseout", handleHoverEnd)
    }
  }, [onMouseMove, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave])

  if (!visible) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] h-2 w-2 rounded-full bg-primary"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isClicking ? 0.6 : 1,
        }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full border border-primary/40"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          backgroundColor: isHovering ? "rgba(0, 212, 255, 0.06)" : "transparent",
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ width: { duration: 0.2 }, height: { duration: 0.2 } }}
        aria-hidden="true"
      />
    </>
  )
}
