"use client"

import { motion } from "framer-motion"
import { leadershipRoles } from "@/data/leadership"
import { Users, GraduationCap, HandHeart } from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  "CSI Secretary": <Users size={18} />,
  "Placement Representative": <GraduationCap size={18} />,
  "NSS Volunteer": <HandHeart size={18} />,
}

export default function Leadership() {
  return (
    <section id="leadership" className="relative z-10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-clash text-3xl font-bold text-white md:text-5xl">
            <span className="gradient-text">Leadership</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {leadershipRoles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card group relative overflow-hidden p-6 transition-all hover:border-primary/20"
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10" aria-hidden="true" />

              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-all">
                  {iconMap[role.title] || <Users size={18} />}
                </div>

                <h3 className="font-clash text-lg font-semibold text-white group-hover:text-primary transition-colors">
                  {role.title}
                </h3>
                <p className="mt-1 font-space text-xs text-primary/60">{role.organization}</p>
                <p className="mt-1 font-inter text-xs text-white/30">{role.duration}</p>

                <p className="mt-4 font-inter text-sm leading-relaxed text-white/50">
                  {role.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
