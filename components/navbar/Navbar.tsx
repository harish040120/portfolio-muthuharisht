"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { personal } from "@/data/personal"

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "patents", label: "Patents" },
  { id: "achievements", label: "Achievements" },
  { id: "certifications", label: "Certifications" },
  { id: "leadership", label: "Leadership" },
  { id: "education", label: "Education" },
  { id: "hobbies", label: "Hobbies" },
  { id: "contact", label: "Contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const scrollPos = window.scrollY + 200
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300",
          scrolled ? "py-2" : "py-3"
        )}
        role="banner"
      >
        <nav
          className={cn(
            "flex items-center rounded-full transition-all duration-300 max-w-[95vw]",
            scrolled
              ? "glass border border-white/5 px-2 py-1"
              : "bg-[#050816]/60 backdrop-blur-sm px-2 py-1"
          )}
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex-shrink-0 rounded-full px-3 py-1.5 font-clash text-sm font-bold text-white/90 transition-all hover:text-white hover:bg-white/5"
            aria-label="Home"
          >
            MH
          </button>

          {/* Desktop nav links — all visible, full labels */}
          <div className="hidden items-center gap-0.5 md:flex">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap",
                  activeSection === s.id
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Resume button */}
          <a
            href={personal.resume}
            download
            className="ml-1 flex-shrink-0 flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold text-black transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
          >
            <Download size={11} />
            <span className="hidden sm:inline">Resume</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center justify-center rounded-full p-2 text-white/60 transition-colors hover:text-white md:hidden"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[#050816]/98 backdrop-blur-2xl md:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute inset-0 flex flex-col overflow-y-auto"
            >
              <div className="flex justify-end p-5">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full p-2 text-white/60 transition-colors hover:text-white"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-10 sm:gap-5">
                {sections.map((s, i) => (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => scrollTo(s.id)}
                    className={cn(
                      "font-clash text-xl sm:text-2xl transition-colors",
                      activeSection === s.id ? "text-primary" : "text-white/50 hover:text-white"
                    )}
                  >
                    {s.label}
                  </motion.button>
                ))}

                <motion.a
                  href={personal.resume}
                  download
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sections.length * 0.04 }}
                  className="mt-3 flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-space text-sm font-semibold text-black"
                >
                  <Download size={14} />
                  Download Resume
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
