"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const images = [
  { src: "/images/1.jpeg", alt: "Snapshot 1" },
  { src: "/images/2.jpeg", alt: "Snapshot 2" },
  { src: "/images/3.jpeg", alt: "Snapshot 3" },
  { src: "/images/4.jpeg", alt: "Snapshot 4" },
  { src: "/images/5.jpeg", alt: "Snapshot 5" },
  { src: "/images/6.jpeg", alt: "Snapshot 6" },
]

const CARD_WIDTH = 280
const CARD_HEIGHT = 200
const GAP = 16
const ITEM_TOTAL = CARD_WIDTH + GAP
const BASE_DURATION = 25

const doubled = [...images, ...images]

export default function ArtifactMarquee() {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768)
  }, [])

  return (
    <section className="relative z-10 overflow-hidden py-12">
      <div className="section-container">
        <div className="mb-8">
          <h2 className="font-clash text-3xl font-bold text-white md:text-5xl">
            <span className="gradient-text">Snapshot Cache</span>
          </h2>
          <p className="mt-2 font-inter text-sm text-white/30">
            Moments captured along the way
          </p>
        </div>
      </div>

      {/* Marquee track */}
      <div
        className="relative flex items-center"
        style={{ height: CARD_HEIGHT + 40 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex"
          style={{ gap: GAP }}
          animate={isMobile ? {} : { x: [0, -(ITEM_TOTAL * images.length)] }}
          transition={{
            x: {
              duration: isHovered ? BASE_DURATION * 4 : BASE_DURATION,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {(isMobile ? images : doubled).map((img, i) => (
            <ArtifactCard key={`${img.src}-${i}`} img={img} />
          ))}
        </motion.div>
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050816] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050816] to-transparent z-10" />
    </section>
  )
}

function ArtifactCard({ img }: { img: (typeof images)[number] }) {
  const [isCardHovered, setIsCardHovered] = useState(false)

  return (
    <motion.div
      className="relative flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/[0.06] bg-surface/50"
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      animate={{
        rotateX: isCardHovered ? 4 : 0,
        rotateY: isCardHovered ? -4 : 0,
        scale: isCardHovered ? 1.08 : 1,
        z: isCardHovered ? 30 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{
        boxShadow: "0 20px 40px rgba(0,212,255,0.15), 0 0 60px rgba(0,212,255,0.05)",
      }}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute top-2 left-2 h-2 w-2 rounded-full bg-primary/40" />
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        initial={{ top: 0, opacity: 0 }}
        animate={{
          top: isCardHovered ? "100%" : "0%",
          opacity: isCardHovered ? [0, 1, 1, 0] : 0,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </motion.div>
  )
}
