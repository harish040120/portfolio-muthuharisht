export interface Patent {
  title: string
  publicationNumber: string
  status: string
  description: string
}

export const patents: Patent[] = [
  {
    title: "Self-Assisted Reading and Scribing System",
    publicationNumber: "15/2025",
    status: "Published",
    description: "Assistive technology platform supporting reading and writing assistance for differently-abled individuals.",
  },
  {
    title: "Real-Time Emergency Alert and Location Geofencing",
    publicationNumber: "24/2025",
    status: "Published",
    description: "Construction safety system using geofencing, LoRa communication, GPS tracking, and AI-based monitoring.",
  },
]
