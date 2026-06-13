"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { patents } from "@/data/patents"
import { FileText } from "lucide-react"

export default function Patents() {
  return (
    <section id="patents" className="relative z-10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-clash text-3xl font-bold text-white md:text-5xl">
            <span className="gradient-text">Patents</span>
          </h2>
          <p className="mt-2 font-jetbrains text-xs text-white/30">
            FILED — {patents.length} PUBLISHED APPLICATIONS
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {patents.map((patent, i) => (
            <PatentCard key={patent.title} patent={patent} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PatentCard({
  patent,
  index,
}: {
  patent: (typeof patents)[number]
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const descRef = useRef<HTMLParagraphElement>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="patent-card group relative overflow-hidden rounded-xl border border-white/[0.06] bg-surface/60 backdrop-blur-sm transition-all duration-300 hover:border-secondary/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]"
    >
      {/* Blueprint grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      {/* Corner coordinate markers */}
      <span className="absolute left-2 top-2 font-jetbrains text-[9px] text-secondary/30" aria-hidden="true">
        [{(index + 1) * 10}.00]
      </span>
      <span className="absolute right-2 top-2 font-jetbrains text-[9px] text-secondary/30" aria-hidden="true">
        [{(index + 1) * 10}.99]
      </span>
      <span className="absolute bottom-2 left-2 font-jetbrains text-[9px] text-secondary/30" aria-hidden="true">
        [{(index + 1) * 10 + 1}.00]
      </span>
      <span className="absolute bottom-2 right-2 font-jetbrains text-[9px] text-secondary/30" aria-hidden="true">
        [{(index + 1) * 10 + 1}.99]
      </span>

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-all duration-300 group-hover:bg-secondary/20 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <FileText size={20} />
          </div>

          {/* Publication stamp */}
          <div className="flex flex-col items-end gap-1">
            <div className="rotate-[-6deg] rounded border border-secondary/30 bg-secondary/10 px-3 py-1 font-jetbrains text-xs font-medium text-secondary/70 transition-all duration-300 group-hover:rotate-0 group-hover:border-secondary/50 group-hover:text-secondary">
              {patent.publicationNumber}
            </div>
            <span className="rounded-full bg-accent/10 px-3 py-1 font-jetbrains text-xs text-accent">
              {patent.status}
            </span>
          </div>
        </div>

        <h3 className="mt-4 font-clash text-lg font-semibold text-white transition-colors duration-300 group-hover:text-secondary">
          {patent.title}
        </h3>

        <p
          ref={descRef}
          className="mt-3 font-inter text-sm leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/70"
        >
          {patent.description}
        </p>

        {/* Dashed divider */}
        <div className="mt-4 border-t border-dashed border-white/10" />

        {/* Bottom metadata bar */}
        <div className="mt-3 flex items-center justify-between font-jetbrains text-[10px] text-white/20">
          <span>CLASS: G06F / H04L</span>
          <span>STATUS: {patent.status.toUpperCase()}</span>
        </div>
      </div>
    </motion.div>
  )
}
