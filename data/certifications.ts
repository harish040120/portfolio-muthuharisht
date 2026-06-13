export interface Certification {
  name: string
  provider: string
  score?: string
  date?: string
  image?: string
}

export const certifications: Certification[] = [
  {
    name: "Google Cloud Computing",
    provider: "NPTEL",
    score: "71%",
    date: "2024",
    image: "/images/certificates/nptel_1 Google Cloud.jpeg",
  },
  {
    name: "Computer Networks & Internet Protocol",
    provider: "NPTEL",
    score: "67%",
    date: "2024",
    image: "/images/certificates/nptel_2 Computer Networks.jpeg",
  },
  {
    name: "Certificate of Participation – Devtrails 2026",
    provider: "Devtrails",
    image: "/images/certificates/Certificate of Participation Devtrails 2026.jpeg",
  },
  {
    name: "Certification of Completion – OOPs in Python",
    provider: "Coursera",
    image: "/images/certificates/Certification of Completion OOPs in Python.jpg",
  },
  {
    name: "Certification of Participant – Yuktha",
    provider: "Yuktha",
    image: "/images/certificates/Certification of Participant Yuktha.jpeg",
  },
  {
    name: "Getting Started with Artificial Intelligence",
    provider: "IBM",
    image: "/images/certificates/Getting Started with Artificial Intelligence_page-0001.jpg",
  },
  {
    name: "Journey to Cloud: Envisioning Your Solution",
    provider: "IBM",
    image: "/images/certificates/Journey to Cloud Envisioning Your Solution_page-0001.jpg",
  },
  {
    name: "LangChain Lab",
    provider: "Workshop",
    image: "/images/certificates/Langchain_Lab_page-0001.jpg",
  },
]
