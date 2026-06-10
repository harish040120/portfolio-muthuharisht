"use client"

import { motion } from "framer-motion"
import { hobbies } from "@/data/hobbies"
import { personal } from "@/data/personal"
import { ExternalLink } from "lucide-react"

export default function Hobbies() {
  return (
    <section id="hobbies" className="relative z-10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-clash text-3xl font-bold text-white md:text-5xl">
            Beyond <span className="gradient-text">Code</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hobbies.map((hobby, i) => (
            <motion.div
              key={hobby.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card group p-6"
            >
              <span className="text-3xl" role="img" aria-label={hobby.name}>
                {hobby.emoji}
              </span>
              <h3 className="mt-4 font-clash text-lg font-semibold text-white group-hover:text-primary transition-colors">
                {hobby.name}
              </h3>
              <p className="mt-2 font-inter text-sm leading-relaxed text-white/50">
                {hobby.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.a
          href={personal.letterboxd}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 transition-all hover:border-primary/30 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]"
          aria-label="Visit Letterboxd profile"
        >
          <span className="text-lg">🎬</span>
          <span className="font-space text-sm text-white">Movie Explorer</span>
          <ExternalLink size={14} className="text-primary" />
        </motion.a>
      </div>
    </section>
  )
}
