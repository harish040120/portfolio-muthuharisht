"use client"

import { motion } from "framer-motion"
import { certifications } from "@/data/certifications"
import { Award, BadgeCheck } from "lucide-react"

export default function Certifications() {
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

        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card group flex items-start gap-4 p-6"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-all">
                <Award size={20} />
              </div>
              <div>
                <h3 className="font-clash text-lg font-semibold text-white group-hover:text-primary transition-colors">
                  {cert.name}
                </h3>
                <p className="mt-1 font-space text-sm text-primary/70">{cert.provider}</p>
                {cert.score && (
                  <div className="mt-3 flex items-center gap-2">
                    <BadgeCheck size={14} className="text-accent" />
                    <span className="font-jetbrains text-sm text-accent">{cert.score}</span>
                    {cert.date && (
                      <span className="font-inter text-xs text-white/30">• {cert.date}</span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
