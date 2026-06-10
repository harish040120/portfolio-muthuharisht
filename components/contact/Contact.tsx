"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { personal } from "@/data/personal"
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailto = `mailto:${personal.email}?subject=Portfolio Contact - ${form.name}&body=${encodeURIComponent(form.message + "\n\nFrom: " + form.name + "\nEmail: " + form.email)}`
    window.open(mailto)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="relative z-10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-clash text-3xl font-bold text-white md:text-5xl">
            Get In <span className="gradient-text">Touch</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8">
              <h3 className="font-clash text-xl font-semibold text-white">Let&apos;s Build Something</h3>
              <p className="mt-2 font-inter text-sm text-white/50">
                Open to opportunities, collaborations, and technical discussions.
              </p>

              <div className="mt-8 space-y-4">
                <a href={`mailto:${personal.email}`} className="flex items-center gap-3 text-white/50 transition-colors hover:text-primary">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Mail size={16} className="text-primary" />
                  </div>
                  <span className="font-inter text-sm">{personal.email}</span>
                </a>
                <a href={personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/50 transition-colors hover:text-primary">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                    <Github size={16} className="text-secondary" />
                  </div>
                  <span className="font-inter text-sm">github.com/harish040120</span>
                </a>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/50 transition-colors hover:text-primary">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Linkedin size={16} className="text-accent" />
                  </div>
                  <span className="font-inter text-sm">linkedin.com/in/harish040120</span>
                </a>
                <div className="flex items-center gap-3 text-white/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                    <MapPin size={16} className="text-white/40" />
                  </div>
                  <span className="font-inter text-sm">{personal.location}</span>
                </div>
              </div>

              <p className="mt-8 font-inter text-sm text-primary/60">
                &ldquo;Open to opportunities and technical collaborations.&rdquo;
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="glass-card space-y-5 p-8">
              <div>
                <label htmlFor="name" className="block font-space text-sm text-white/60">Name</label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-inter text-sm text-white outline-none transition-all focus:border-primary/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-space text-sm text-white/60">Email</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-inter text-sm text-white outline-none transition-all focus:border-primary/50"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-space text-sm text-white/60">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-inter text-sm text-white outline-none transition-all focus:border-primary/50"
                  placeholder="Tell me about your project..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-space text-sm font-medium text-black transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(0,212,255,0.2)]"
              >
                {sent ? "Message Sent!" : "Send Message"}
                <Send size={14} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
