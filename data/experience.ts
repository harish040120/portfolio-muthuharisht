export interface Experience {
  company: string
  role: string
  duration: string
  description: string
  technologies: string[]
  items?: string[]
}

export const experiences: Experience[] = [
  {
    company: "Stepping Edge Technologies",
    role: "Full-Stack AI & Software Engineering Intern",
    duration: "May 2026 - Present",
    description: "Built a WhatsApp-based attendance system using n8n, JavaScript, GPS geofencing, and workflow automation for field employee verification.",
    technologies: ["n8n", "JavaScript", "GPS", "Workflow Automation"],
    items: ["Workflow Automation", "GPS Verification", "Attendance Intelligence", "Business Process Automation"],
  },
  {
    company: "IBM SkillBuild – Edunet Foundation",
    role: "Agentic AI Intern",
    duration: "July 2025 - August 2025",
    description: "Developed an Agentic AI system on IBM Cloud using Granite 8B to generate LaTeX TikZ diagrams from natural language prompts.",
    technologies: ["IBM Cloud", "Granite 8B", "Prompt Engineering", "Agentic AI"],
    items: ["Agentic AI Development", "IBM Cloud", "Granite 8B", "Generative AI"],
  },
]
