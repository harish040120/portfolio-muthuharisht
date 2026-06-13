"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { personal } from "@/data/personal"
import { ArrowDown, Download, Github, Linkedin, Mail, Rocket } from "lucide-react"

const orbitSkills = ["Java", "Python", "LangChain", "RAG", "Linux", "n8n", "PostgreSQL", "Google Cloud", "Computer Vision"]

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return
    const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768

    let animId: number
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; alpha: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    for (let i = 0; i < (isMobile ? 20 : 80); i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" aria-hidden="true" />
}

function OrbitingSkills() {
  return (
    <div className="relative flex h-[280px] w-[280px] items-center justify-center md:h-[360px] md:w-[360px]" aria-hidden="true">
      <div className="absolute inset-0 rounded-full border border-primary/10" />
      <div className="absolute inset-[15%] rounded-full border border-primary/5" />
      <div className="z-10 h-20 w-20 overflow-hidden rounded-full border-2 border-primary/30 shadow-[0_0_30px_rgba(0,212,255,0.2)]">
        <Image
          src="/images/harish-desktop.webp"
          alt="Muthu Harish T"
          width={80}
          height={80}
          className="h-full w-full object-cover"
          priority
        />
      </div>
      {orbitSkills.map((skill, i) => {
        const angle = (i / orbitSkills.length) * Math.PI * 2
        const radius = 140
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        const delay = i * 0.4
        return (
          <motion.span
            key={skill}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#050816]/80 px-3 py-1.5 font-jetbrains text-xs text-primary ring-1 ring-primary/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [0, x, x, 0],
              y: [0, y, y, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
          >
            {skill}
          </motion.span>
        )
      })}
    </div>
  )
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768)
  }, [])

  const scrollToAbout = useCallback(() => {
    const el = document.getElementById("about")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }, [])

  const scrollToProjects = useCallback(() => {
    const el = document.getElementById("projects")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <ParticleBackground />

      <div className="section-container relative z-10 flex flex-col items-center gap-12 md:flex-row md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-space text-sm tracking-widest text-primary/60 uppercase"
          >
            AI & Software Engineer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 font-clash text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
          >
            Hi, I&apos;m
            <br />
            <span className="gradient-text">Muthu Harish T</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-lg font-inter text-base leading-relaxed text-white/50 md:text-lg"
          >
            {personal.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
            <button
              onClick={scrollToProjects}
              className="rounded-full bg-primary px-6 py-3 font-space text-sm font-medium text-black transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]"
            >
              <span className="flex items-center gap-2">
                <Rocket size={16} />
                View Projects
              </span>
            </button>
            <a
              href={personal.resume}
              download
              className="glass rounded-full px-6 py-3 font-space text-sm font-medium text-white transition-all hover:border-primary/30"
            >
              <span className="flex items-center gap-2">
                <Download size={16} />
                Download Resume
              </span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex items-center justify-center gap-4 md:justify-start"
          >
            <a href={`mailto:${personal.email}`} className="text-white/30 transition-colors hover:text-primary" aria-label="Email">
              <Mail size={18} />
            </a>
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="text-white/30 transition-colors hover:text-primary" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/30 transition-colors hover:text-primary" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </motion.div>
        </motion.div>

        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <OrbitingSkills />
          </motion.div>
        )}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 transition-colors hover:text-primary"
        aria-label="Scroll to explore"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  )
}
