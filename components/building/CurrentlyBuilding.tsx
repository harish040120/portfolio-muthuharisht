"use client"

import { motion } from "framer-motion"
import { currentlyBuilding } from "@/data/building"

const columns = ["Researching", "Building", "Testing", "Deploying"]
const columnColors: Record<string, string> = {
  Researching: "border-l-primary",
  Building: "border-l-secondary",
  Testing: "border-l-accent",
  Deploying: "border-l-amber-500",
}

export default function CurrentlyBuilding() {
  return (
    <section id="building" className="relative z-10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-clash text-3xl font-bold text-white md:text-5xl">
            Currently <span className="gradient-text">Building</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-4">
          {columns.map((col, colIdx) => (
            <motion.div
              key={col}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: colIdx * 0.1 }}
            >
              <h3 className="mb-4 font-clash text-lg font-semibold text-white/60">{col}</h3>
              <div className="space-y-3">
                {currentlyBuilding
                  .filter((item) => item.column === col)
                  .map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: colIdx * 0.1 + i * 0.05 }}
                      className={`glass-card border-l-2 p-4 transition-all hover:border-primary/30 ${columnColors[col]}`}
                    >
                      <h4 className="font-clash text-sm font-semibold text-white">{item.title}</h4>
                      <p className="mt-1 font-inter text-xs text-white/40">{item.description}</p>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
