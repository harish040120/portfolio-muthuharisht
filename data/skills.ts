export interface Skill {
  name: string
  category: string
}

export const skills: Skill[] = [
  { name: "Java", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "Machine Learning", category: "AI & ML" },
  { name: "RAG", category: "AI & ML" },
  { name: "LangChain", category: "AI & ML" },
  { name: "Prompt Engineering", category: "AI & ML" },
  { name: "Computer Vision", category: "AI & ML" },
  { name: "n8n", category: "Automation" },
  { name: "Workflow Automation", category: "Automation" },
  { name: "API Integration", category: "Automation" },
  { name: "REST APIs", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "Google Cloud", category: "Cloud" },
  { name: "IBM Cloud", category: "Cloud" },
  { name: "Git", category: "Tools" },
  { name: "Linux", category: "Tools" },
  { name: "Leadership", category: "Soft Skills" },
  { name: "Communication", category: "Soft Skills" },
  { name: "Rapid Upskilling", category: "Soft Skills" },
  { name: "Versatility", category: "Soft Skills" },
  { name: "Team Collaboration", category: "Soft Skills" },
]

export const skillCategories = [
  { id: "all", label: "All" },
  { id: "Languages", label: "Languages" },
  { id: "AI & ML", label: "AI & ML" },
  { id: "Automation", label: "Automation" },
  { id: "Backend", label: "Backend" },
  { id: "Cloud", label: "Cloud" },
  { id: "Tools", label: "Tools" },
  { id: "Soft Skills", label: "Soft Skills" },
]
