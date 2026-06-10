"use client"

import { motion } from "framer-motion"
import { educationData } from "@/data/education"
import { GraduationCap } from "lucide-react"

export default function Education() {
  return (
    <section id="education" className="relative z-10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-clash text-3xl font-bold text-white md:text-5xl">
            <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary via-secondary to-accent md:left-1/2 md:-translate-x-px" aria-hidden="true" />

          {educationData.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`relative mb-12 pl-16 md:w-1/2 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}
            >
              <div className={`absolute left-4 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#050816] ring-2 ring-primary md:${i % 2 === 0 ? "left-auto right-[-1.75rem]" : "left-[-1.75rem]"} ${i % 2 === 0 ? "md:right-[-1.75rem] md:left-auto" : "md:left-[-1.75rem]"}`}>
                <GraduationCap size={16} className="text-primary" />
              </div>
              <div className="glass-card p-6">
                <h3 className="font-clash text-lg font-semibold text-white">{edu.degree}</h3>
                <p className="mt-1 font-space text-sm text-primary">{edu.institution}</p>
                <p className="mt-1 font-inter text-xs text-white/40">{edu.duration}</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-jetbrains text-sm text-primary">
                  {edu.score} {edu.scoreLabel}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
