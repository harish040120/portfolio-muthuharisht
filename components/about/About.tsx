"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal } from "lucide-react"
import { personal } from "@/data/personal"
import { hobbies } from "@/data/hobbies"
import { experiences } from "@/data/experience"

type HistoryEntry = { cmd: string; output: string[]; link?: string }

const commands: Record<string, () => { output: string[]; link?: string }> = {
  whoami: () => ({
    output: [
      "Muthu Harish T — AI Engineer & System Builder.",
      "I build real-world AI systems using RAG, LLMs, Computer Vision, Agentic AI, and Intelligent Automation.",
      "I wander the internet like a digital archaeologist — then I build something useful from what I discover.",
    ],
  }),
  skills: () => ({
    output: ["Languages: Java, Python | AI/ML: LangChain, RAG, Computer Vision | Tools: Git, n8n, Linux", "→ See the Skills section above for full details."],
  }),
  projects: () => ({
    output: ["6 projects built: Aegis, DocuTalk, RealG, Aadhaar Auth, TikZBuilder, N2K Logistics", "→ See Projects below (stacked cards)."],
  }),
  resume: () => ({
    output: ["Download:"],
    link: personal.resume,
  }),
  hobbies: () => ({
    output: hobbies.map((h) => `${h.emoji} ${h.name}`),
  }),
  experience: () => ({
    output: [`${experiences.length} professional experiences — see Experience section.`],
  }),
  help: () => ({
    output: ["Commands: whoami, skills, projects, resume, hobbies, experience, help"],
  }),
}

function TypingLine({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState("")
  const i = useRef(0)

  useEffect(() => {
    i.current = 0
    setDisplayed("")
    const timer = setInterval(() => {
      i.current++
      setDisplayed(text.slice(0, i.current))
      if (i.current >= text.length) {
        clearInterval(timer)
        onComplete?.()
      }
    }, 18)
    return () => clearInterval(timer)
  }, [text, onComplete])

  return <span>{displayed}<span className="animate-pulse text-primary">▌</span></span>
}

export default function About() {
  const [cmd, setCmd] = useState("")
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [typing, setTyping] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!cmd.trim() || typing) return
    setShowHint(false)
    const cmdKey = cmd.trim().toLowerCase()
    const handler = commands[cmdKey]
    if (handler) {
      setHistory((prev) => [...prev, { cmd, ...handler() }])
    } else {
      setHistory((prev) => [...prev, { cmd, output: [`Command not found: ${cmd}. Type "help" for available commands.`] }])
    }
    setCmd("")
  }

  return (
    <section id="about" className="relative z-10">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-clash text-3xl font-bold text-white md:text-5xl">
            <span className="gradient-text">About</span> Me
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card overflow-hidden font-jetbrains text-sm"
          role="region"
          aria-label="Interactive terminal"
          aria-live="polite"
        >
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2">
            <Terminal size={14} className="text-primary" />
            <span className="text-xs text-white/40">muthuharish@portfolio:~</span>
          </div>
          <div className="max-h-[400px] overflow-y-auto p-4 md:p-6">
            {showHint && (
              <p className="mb-3 text-white/30 text-xs">
                Available commands: whoami, skills, projects, resume, hobbies, experience, help
              </p>
            )}

            <AnimatePresence>
              {history.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-3"
                >
                  <p>
                    <span className="text-primary">muthuharish</span>
                    <span className="text-white/30">@</span>
                    <span className="text-accent">portfolio</span>
                    <span className="text-white/30">:~$ </span>
                    <span className="text-white">{entry.cmd}</span>
                  </p>
                  {entry.output.map((line, j) => (
                    <p key={j} className={`pl-0 ${line.startsWith("Command not found") ? "text-red-400" : "text-white/70"}`}>
                      {line}
                    </p>
                  ))}
                  {entry.link && (
                    <a
                      href={entry.link}
                      download
                      className="ml-0 mt-1 inline-flex items-center gap-1 rounded bg-primary/10 px-2 py-0.5 text-xs text-primary transition-colors hover:bg-primary/20"
                    >
                      ↓ Download Resume
                    </a>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            <div ref={endRef} />

            <form onSubmit={handleSubmit} className="flex items-center gap-1">
              <span className="text-primary">muthuharish</span>
              <span className="text-white/30">@</span>
              <span className="text-accent">portfolio</span>
              <span className="text-white/30">:~$ </span>
              <input
                type="text"
                value={cmd}
                onChange={(e) => setCmd(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none"
                aria-label="Terminal command input"
                autoComplete="off"
                spellCheck={false}
                disabled={typing}
              />
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
