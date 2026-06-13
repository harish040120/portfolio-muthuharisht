"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projects, type Project } from "@/data/projects"
import { Github, Award, FileText, X, ExternalLink } from "lucide-react"

export default function ProjectHorizonDeck() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})

  const expanded = projects.find((p) => p.id === expandedId) ?? null

  useEffect(() => {
    if (expandedId) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [expandedId])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedId(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const imgFailed = (id: string) => failedImages[id]

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

        {/* Horizontal card list */}
        <div className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -2 }}
              onClick={() => setExpandedId(project.id)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-surface/80 backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.12)]"
            >
              {/* Accent glow bar at top */}
              <div
                className="absolute inset-x-0 top-0 h-[2px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: project.color }}
              />

              {/* Left glow on hover */}
              <div
                className="absolute inset-y-0 left-0 w-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: project.color }}
              />

              <div className="flex flex-col sm:flex-row">
                {/* Content — left */}
                <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
                  <h3 className="mb-1.5 font-clash text-lg font-semibold text-white transition-colors group-hover:text-primary lg:text-xl">
                    {project.title}
                  </h3>

                  <p className="mb-4 max-w-lg font-inter text-sm leading-relaxed text-white/60 line-clamp-2">
                    {project.description.slice(0, 160)}…
                  </p>

                  {/* Tech tags */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-jetbrains text-[11px] text-white/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-2">
                    {project.status && (
                      <span
                        className="flex items-center gap-1 rounded-full px-2.5 py-0.5 font-jetbrains text-[11px]"
                        style={{
                          background: `${project.color}15`,
                          color: project.color,
                        }}
                      >
                        <Award size={11} />
                        {project.status}
                      </span>
                    )}
                    {project.patent && (
                      <span className="flex items-center gap-1 rounded-full bg-secondary/10 px-2.5 py-0.5 font-jetbrains text-[11px] text-secondary">
                        <FileText size={11} />
                        Patent
                      </span>
                    )}
                  </div>
                </div>

                {/* Image — right */}
                <div className="relative h-40 w-full flex-shrink-0 overflow-hidden sm:h-auto sm:w-48 md:w-56">
                  {project.image && !imgFailed(project.id) ? (
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                        }
                      />
                    </motion.div>
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        background: `radial-gradient(ellipse at center, ${project.color}18, transparent 70%)`,
                      }}
                    >
                      <div
                        className="h-20 w-20 rounded-full opacity-20 blur-3xl"
                        style={{ background: project.color }}
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-transparent to-transparent sm:bg-gradient-to-l sm:from-transparent sm:via-transparent sm:to-surface/60" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expanded && (
          <ExpandedProject
            project={expanded}
            failedImages={failedImages}
            onClose={() => setExpandedId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Expanded overlay — full detail view with banner image               */
/* ------------------------------------------------------------------ */

function ExpandedProject({
  project,
  failedImages,
  onClose,
}: {
  project: Project
  failedImages: Record<string, boolean>
  onClose: () => void
}) {
  const hasImage = project.image && !failedImages[project.id]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative my-8 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl sm:my-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-surface/80 text-white/60 backdrop-blur-sm transition-all hover:border-primary/30 hover:text-primary"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Banner image */}
        {hasImage && (
          <div className="relative h-48 w-full overflow-hidden sm:h-64">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image!}
              alt={project.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
          </div>
        )}

        {/* Accent top bar */}
        <div
          className="h-1 w-full"
          style={{ background: project.color }}
        />

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h3 className="mb-2 font-clash text-2xl font-bold text-white lg:text-3xl">
            {project.title}
          </h3>

          {/* Badges */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {project.status && (
              <span
                className="flex items-center gap-1.5 rounded-full px-3 py-1 font-jetbrains text-xs"
                style={{
                  background: `${project.color}18`,
                  color: project.color,
                }}
              >
                <Award size={12} />
                {project.status}
              </span>
            )}
            {project.patent && (
              <span className="flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 font-jetbrains text-xs text-secondary">
                <FileText size={12} />
                {project.patent}
              </span>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 font-jetbrains text-xs text-white/50 transition-colors hover:text-primary"
              >
                <Github size={12} />
                View Code
                <ExternalLink size={10} />
              </a>
            )}
          </div>

          {/* Full description */}
          <p className="mb-6 font-inter text-sm leading-relaxed text-white/70 md:text-base">
            {project.description}
          </p>

          {/* Architecture */}
          {project.architecture.length > 0 && (
            <div className="mb-6">
              <h4 className="mb-3 font-clash text-sm font-semibold text-white/90">
                Architecture
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                {project.architecture.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-2">
                    <div
                      className="rounded-lg border px-3 py-1.5 font-jetbrains text-xs transition-all hover:scale-105"
                      style={{
                        borderColor: `${step.color}40`,
                        background: `${step.color}12`,
                        color: step.color,
                      }}
                    >
                      {step.label}
                    </div>
                    {i < project.architecture.length - 1 && (
                      <span className="text-white/20">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech stack */}
          <div>
            <h4 className="mb-3 font-clash text-sm font-semibold text-white/90">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-jetbrains text-xs text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
