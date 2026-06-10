import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Muthu Harish T | AI Engineer & Research Explorer",
  description: "Portfolio of Muthu Harish T — AI Engineer building real-world AI systems using RAG, LLMs, Computer Vision, Agentic AI and Intelligent Automation.",
  keywords: ["AI Engineer", "Machine Learning", "RAG", "Agentic AI", "Portfolio", "Muthu Harish"],
  openGraph: {
    title: "Muthu Harish T | AI Engineer & Research Explorer",
    description: "Building Real-World AI Systems using RAG, LLMs, Computer Vision, Agentic AI and Intelligent Automation.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
