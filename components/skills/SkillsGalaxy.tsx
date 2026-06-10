"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { skills } from "@/data/skills"
import { cn } from "@/lib/utils"

const clusters = [
  { id: "languages", label: "Languages & Core", skills: ["Java", "Python"] },
  { id: "ai", label: "AI & ML", skills: ["Machine Learning", "RAG", "LangChain", "Prompt Engineering", "Computer Vision"] },
  { id: "cloud", label: "Cloud & DB", skills: ["Google Cloud", "IBM Cloud", "PostgreSQL", "FastAPI", "REST APIs"] },
  { id: "tools", label: "Tools & Automation", skills: ["Git", "Linux", "n8n", "Workflow Automation", "API Integration"] },
  { id: "soft", label: "Soft Skills", skills: ["Leadership", "Communication", "Rapid Upskilling", "Versatility", "Team Collaboration"] },
]

const tooltipMap: Record<string, string> = {
  "Java": "Object-oriented programming, data structures",
  "Python": "ML pipelines, automation, backend APIs",
  "Machine Learning": "Supervised/unsupervised learning, model training",
  "RAG": "Retrieval-Augmented Generation pipelines",
  "LangChain": "LLM chains, agents, and RAG workflows",
  "Prompt Engineering": "Optimized prompting for LLMs",
  "Computer Vision": "Object detection, face recognition",
  "Google Cloud": "Cloud services, deployment",
  "IBM Cloud": "Granite 8B, Agentic AI",
  "PostgreSQL": "Relational database design",
  "FastAPI": "Python REST API development",
  "REST APIs": "API design and integration",
  "Git": "Version control, branching, collaboration",
  "Linux": "System administration, shell scripting",
  "n8n": "Workflow automation, integrations",
  "Workflow Automation": "Business process automation",
  "API Integration": "Third-party API orchestration",
  "Leadership": "Team management, event coordination",
  "Communication": "Technical writing, presentations",
  "Rapid Upskilling": "Quick adoption of new technologies",
  "Versatility": "Cross-domain problem solving",
  "Team Collaboration": "Cross-functional teamwork",
}

export default function SkillsGalaxy() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section id="skills" className="relative z-10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-clash text-3xl font-bold text-white md:text-5xl">
            Skills <span className="gradient-text">&amp; Tools</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clusters.map((cluster, ci) => (
            <motion.div
              key={cluster.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
              className="glass-card p-5"
            >
              <h3 className="mb-4 font-clash text-sm font-semibold text-primary/80 uppercase tracking-wider">
                {cluster.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cluster.skills.map((skillName) => {
                  const skillData = skills.find((s) => s.name === skillName)
                  return (
                    <div
                      key={skillName}
                      className="relative"
                      onMouseEnter={() => setHoveredSkill(skillName)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onFocus={() => setHoveredSkill(skillName)}
                      onBlur={() => setHoveredSkill(null)}
                    >
                      <motion.span
                        tabIndex={0}
                        whileHover={{ y: -2, scale: 1.05 }}
                        className={cn(
                          "inline-flex items-center rounded-full border px-3 py-1.5 font-space text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/50",
                          hoveredSkill === skillName
                            ? "border-primary/40 bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,212,255,0.15)]"
                            : "border-white/10 bg-white/5 text-white/60 hover:border-primary/20 hover:text-white/80"
                        )}
                        role="button"
                        aria-describedby={tooltipMap[skillName] ? `tip-${skillName}` : undefined}
                      >
                        {skillName}
                      </motion.span>
                      {tooltipMap[skillName] && hoveredSkill === skillName && (
                        <div
                          id={`tip-${skillName}`}
                          role="tooltip"
                          className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-primary/20 bg-[#111827] px-3 py-1.5 font-inter text-xs text-white/70 shadow-lg"
                        >
                          {tooltipMap[skillName]}
                          <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#111827]" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
