"use client"

import { motion } from "framer-motion"
import { philosophyStages } from "@/data/philosophy"
import { Crosshair, Search, Wrench, RefreshCw, Rocket } from "lucide-react"

const iconComponents: Record<string, React.ReactNode> = {
  Crosshair: <Crosshair size={20} />,
  Search: <Search size={20} />,
  Wrench: <Wrench size={20} />,
  RefreshCw: <RefreshCw size={20} />,
  Rocket: <Rocket size={20} />,
}

export default function BuildPhilosophy() {
  return (
    <section id="philosophy" className="relative z-10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-clash text-3xl font-bold text-white md:text-5xl">
            Build <span className="gradient-text">Philosophy</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-primary via-secondary to-accent md:left-1/2 md:-translate-x-px" aria-hidden="true" />

          {philosophyStages.map((stage, i) => (
            <motion.div
              key={stage.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`group relative mb-8 pl-20 md:w-1/2 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}
            >
              <div className={`absolute left-2 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#050816] ring-2 ring-primary transition-all group-hover:ring-secondary group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] ${i % 2 === 0 ? "md:left-auto md:right-[-1.5rem]" : "md:left-[-1.5rem]"}`}>
                <span className="text-primary group-hover:text-secondary transition-colors">
                  {iconComponents[stage.icon]}
                </span>
              </div>
              <div className="glass-card p-6 transition-all group-hover:border-primary/20">
                <span className="font-jetbrains text-xs text-primary/50">Step {stage.step}</span>
                <h3 className="mt-1 font-clash text-xl font-semibold text-white group-hover:text-primary transition-colors">
                  {stage.title}
                </h3>
                <p className="mt-2 font-inter text-sm leading-relaxed text-white/50">
                  {stage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
