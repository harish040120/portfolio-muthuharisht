export interface Education {
  institution: string
  degree: string
  duration: string
  score: string
  scoreLabel: string
}

export const educationData: Education[] = [
  {
    institution: "PSG Institute of Technology and Applied Research",
    degree: "B.Tech Computer Science and Business Systems",
    duration: "August 2023 - May 2027",
    score: "8.22",
    scoreLabel: "CGPA",
  },
  {
    institution: "Kanchi Sri Sankara School",
    degree: "Higher Secondary Education",
    duration: "June 2011 - April 2023",
    score: "97.5",
    scoreLabel: "%",
  },
]
