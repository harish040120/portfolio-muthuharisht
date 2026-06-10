"use client"

import { motion } from "framer-motion"
import { personal } from "@/data/personal"
import { Download } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050816] py-12" id="footer">
      <div className="section-container text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-clash text-xl font-semibold text-white/80 md:text-2xl"
        >
          Problems obsess me.
          <br />
          Curiosity steers me.
          <br />
          Sleep pays the price.
        </motion.p>

        <motion.a
          href={personal.resume}
          download
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/20 px-6 py-3 font-space text-sm text-primary transition-all hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]"
        >
          <Download size={14} />
          Download Resume
        </motion.a>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 font-space text-sm text-white/20"
        >
          &copy; {new Date().getFullYear()} Muthu Harish T. Built with Next.js &amp; Tailwind CSS.
        </motion.p>
      </div>
    </footer>
  )
}
