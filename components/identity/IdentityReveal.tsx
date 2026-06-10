"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { personal } from "@/data/personal"
import { MapPin, Briefcase, Code2 } from "lucide-react"

export default function IdentityReveal() {
  return (
    <section id="identity" className="relative z-10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-card mx-auto max-w-3xl overflow-hidden p-8 md:p-10"
        >
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-primary/30 shadow-[0_0_30px_rgba(0,212,255,0.15)]"
            >
              <Image
                src="/images/harish-desktop.webp"
                alt="Muthu Harish T"
                width={112}
                height={112}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
            <div className="text-center md:text-left">
              <h3 className="font-clash text-2xl font-semibold text-white">{personal.name}</h3>
              <p className="mt-1 font-space text-sm text-primary">{personal.title}</p>
              <p className="mt-4 font-inter text-sm leading-relaxed text-white/50">
                {personal.personality}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 font-jetbrains text-xs text-white/40">
                  <MapPin size={12} /> {personal.location}
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 font-jetbrains text-xs text-white/40">
                  <Briefcase size={12} /> AI Engineer
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 font-jetbrains text-xs text-white/40">
                  <Code2 size={12} /> System Builder
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
