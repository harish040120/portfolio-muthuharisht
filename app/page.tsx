"use client"

import { useEffect, useState, useCallback } from "react"
import LoadingScreen from "@/components/loader/LoadingScreen"
import CustomCursor from "@/components/cursor/CustomCursor"
import { FloatingStars } from "@/components/stars/FloatingStars"
import Navbar from "@/components/navbar/Navbar"
import Hero from "@/components/hero/Hero"
import IdentityReveal from "@/components/identity/IdentityReveal"
import About from "@/components/about/About"
import SkillsGalaxy from "@/components/skills/SkillsGalaxy"
import ExperienceTimeline from "@/components/experience/ExperienceTimeline"
import ProjectsShowcase from "@/components/projects/ProjectsShowcase"
import Patents from "@/components/patents/Patents"
import Achievements from "@/components/achievements/Achievements"
import Certifications from "@/components/certifications/Certifications"
import Leadership from "@/components/leadership/Leadership"
import BuildPhilosophy from "@/components/philosophy/BuildPhilosophy"
import CurrentlyBuilding from "@/components/building/CurrentlyBuilding"
import Education from "@/components/education/Education"
import Hobbies from "@/components/hobbies/Hobbies"
import Contact from "@/components/contact/Contact"
import Footer from "@/components/footer/Footer"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initLenis = async () => {
      if (typeof window === "undefined") return
      try {
        const Lenis = (await import("lenis")).default
        const lenis = new Lenis({ duration: 1.2, smoothWheel: true })
        const raf = (time: number) => {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
      } catch (e) {
        // Lenis not available, fallback to native scroll
      }
    }
    initLenis()
  }, [])

  const handleLoadingComplete = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <CustomCursor />
      <FloatingStars />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-black focus:shadow-lg"
      >
        Skip to main content
      </a>
      <div className={loading ? "hidden" : "block"}>
        <Navbar />
        <main id="main-content">
          <Hero />
          <IdentityReveal />
          <About />
          <SkillsGalaxy />
          <ExperienceTimeline />
          <ProjectsShowcase />
          <Patents />
          <Achievements />
          <Certifications />
          <Leadership />
          <BuildPhilosophy />
          <CurrentlyBuilding />
          <Education />
          <Hobbies />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
