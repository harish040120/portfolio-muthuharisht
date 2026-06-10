"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "@/data/projects"
import { ChevronLeft, ChevronRight, Award } from "lucide-react"

export default function ProjectsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const navigate = (dir: number) => {
    setDirection(dir)
    setActiveIndex((prev) => {
      const next = prev + dir
      if (next < 0) return projects.length - 1
      if (next >= projects.length) return 0
      return next
    })
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 200 : -200, scale: 0.95 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir: number) => ({ opacity: 0, x: dir < 0 ? 200 : -200, scale: 0.95 }),
  }

  const project = projects[activeIndex]

  return (
    <section id="projects" className="relative z-10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-clash text-3xl font-bold text-white md:text-5xl">
            <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="flex items-center gap-4 overflow-hidden">
            <button
              onClick={() => navigate(-1)}
              className="glass hidden h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-all hover:border-primary/30 md:flex"
              aria-label="Previous project"
            >
              <ChevronLeft size={20} className="text-white/60" />
            </button>

            <div className="relative min-h-[400px] w-full">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={project.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="glass-card p-6 md:p-8"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: project.color }} />
                    <h3 className="font-clash text-2xl font-bold text-white md:text-3xl">{project.title}</h3>
                  </div>

                  {project.status && (
                    <div className="mb-4 flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-400 w-fit">
                      <Award size={12} />
                      {project.status}
                    </div>
                  )}

                  <p className="mb-6 font-inter text-sm leading-relaxed text-white/60 md:text-base">
                    {project.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="mb-2 font-clash text-xs font-semibold uppercase tracking-wider text-white/40">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/5 px-3 py-1 font-jetbrains text-xs text-white/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.patent && (
                    <p className="mb-4 font-inter text-xs text-primary/50">{project.patent}</p>
                  )}

                  <div className="flex gap-3">
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 font-space text-xs text-white/60 transition-all hover:border-primary/30 hover:text-primary"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        Source
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={() => navigate(1)}
              className="glass hidden h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-all hover:border-primary/30 md:flex"
              aria-label="Next project"
            >
              <ChevronRight size={20} className="text-white/60" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > activeIndex ? 1 : -1); setActiveIndex(i) }}
                className={`h-2 rounded-full transition-all ${
                  i === activeIndex ? "w-6 bg-primary" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          <div className="mt-4 flex justify-center gap-3 md:hidden">
            <button
              onClick={() => navigate(-1)}
              className="glass flex h-10 w-10 items-center justify-center rounded-full"
              aria-label="Previous project"
            >
              <ChevronLeft size={16} className="text-white/60" />
            </button>
            <button
              onClick={() => navigate(1)}
              className="glass flex h-10 w-10 items-center justify-center rounded-full"
              aria-label="Next project"
            >
              <ChevronRight size={16} className="text-white/60" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
