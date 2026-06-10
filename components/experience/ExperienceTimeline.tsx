"use client"

import { motion } from "framer-motion"
import { experiences } from "@/data/experience"
import { Briefcase } from "lucide-react"

const experienceDetails: Record<string, string[]> = {
  "Stepping Edge Technologies": [
    "Built a WhatsApp-based attendance system using n8n workflow automation",
    "Implemented GPS geofencing for real-time field employee location verification",
    "Automated business process workflows reducing manual attendance tracking by 80%",
    "Integrated API endpoints for seamless data flow between WhatsApp and internal systems",
    "Designed and deployed attendance intelligence dashboards for management reporting",
  ],
  "IBM SkillBuild – Edunet Foundation": [
    "Developed an Agentic AI system on IBM Cloud using Granite 8B LLM",
    "Built natural language to LaTeX TikZ diagram generation pipeline",
    "Implemented prompt engineering strategies for accurate diagram output",
    "Gained hands-on experience with IBM Cloud services and generative AI workflows",
    "Collaborated with cross-functional team to deliver working prototype within 6-week sprint",
  ],
}

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative z-10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-clash text-3xl font-bold text-white md:text-5xl">
            <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {experiences.map((exp, i) => {
            const bullets = experienceDetails[exp.company] || exp.items || []
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card group relative overflow-hidden p-6 transition-all hover:border-primary/20"
              >
                <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-primary to-secondary" aria-hidden="true" />

                <div className="pl-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-all">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <h3 className="font-clash text-lg font-semibold text-white group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>
                      <p className="font-space text-sm text-primary/70">{exp.company}</p>
                    </div>
                  </div>

                  <p className="mb-1 font-inter text-xs text-white/30">{exp.duration}</p>

                  <p className="mb-4 font-inter text-sm leading-relaxed text-white/50">
                    {exp.description}
                  </p>

                  <ul className="space-y-2">
                    {bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-2 font-inter text-sm text-white/50">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/5 px-2.5 py-0.5 font-jetbrains text-[10px] text-white/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
