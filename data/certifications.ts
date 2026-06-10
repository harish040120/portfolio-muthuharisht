export interface Certification {
  name: string
  provider: string
  score?: string
  date?: string
}

export const certifications: Certification[] = [
  {
    name: "Google Cloud Computing",
    provider: "NPTEL",
    score: "71%",
    date: "2024",
  },
  {
    name: "Computer Networks & Internet Protocol",
    provider: "NPTEL",
    score: "67%",
    date: "2024",
  },
]
