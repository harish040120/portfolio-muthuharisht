"use client"

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
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {patents.map((patent, i) => (
            <motion.div
              key={patent.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card group relative overflow-hidden p-6"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10" aria-hidden="true" />
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <FileText size={20} />
                </div>
                <h3 className="font-clash text-lg font-semibold text-white group-hover:text-primary transition-colors">
                  {patent.title}
                </h3>
                <div className="mt-3 flex items-center gap-3">
                  <span className="rounded-full bg-accent/10 px-3 py-1 font-jetbrains text-xs text-accent">
                    {patent.status}
                  </span>
                  <span className="font-jetbrains text-xs text-white/30">
                    {patent.publicationNumber}
                  </span>
                </div>
                <p className="mt-4 font-inter text-sm leading-relaxed text-white/50">
                  {patent.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
