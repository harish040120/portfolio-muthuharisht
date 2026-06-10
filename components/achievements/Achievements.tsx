"use client"

import { motion } from "framer-motion"
import { achievements } from "@/data/achievements"
import { Award, Trophy, Star } from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  "Smart India Hackathon 2024 Finalist": <Trophy size={18} />,
  "Ideathon 2025 Winner": <Trophy size={18} />,
  "Industry-Academia Conclave 2025 Winner": <Award size={18} />,
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative z-10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-clash text-3xl font-bold text-white md:text-5xl">
            <span className="gradient-text">Achievements</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card group flex items-start gap-4 p-5 ${achievement.highlight ? "ring-1 ring-primary/20" : ""}`}
            >
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${achievement.highlight ? "bg-amber-500/10 text-amber-400" : "bg-white/5 text-white/40"}`}>
                {iconMap[achievement.title] || <Star size={16} />}
              </div>
              <div>
                <h3 className="font-clash text-base font-semibold text-white group-hover:text-primary transition-colors">
                  {achievement.title}
                </h3>
                <p className="mt-1 font-inter text-sm text-white/40">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
