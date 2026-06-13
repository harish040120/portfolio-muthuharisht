export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  repo?: string
  status?: string
  patent?: string
  image?: string
  color: string
  architecture: { label: string; color: string }[]
}

export const projects: Project[] = [
  {
    id: "doctalk",
    title: "DocuTalk – AI PDF Chatbot",
    description: "DocuTalk is a Retrieval-Augmented Generation (RAG) based chatbot that enables natural language interaction across multiple PDF documents simultaneously. The system ingests PDFs, chunks them into semantic segments, generates vector embeddings using local LLM models, and stores them in a vector database for fast similarity-based retrieval. When a user asks a question, the system retrieves the most relevant chunks from across all uploaded documents and passes them as context to a language model, which generates accurate, context-aware answers. Unlike basic PDF readers, DocuTalk understands document structure, maintains context across pages, and supports multi-document querying — allowing users to cross-reference information from different PDFs in a single conversation. Built entirely with local LLM support via Ollama, it ensures complete document privacy with no data leaving the user's machine. The project won 1st Place at the PSG iTech Tech Expo for its practical approach to private document intelligence.",
    technologies: ["Python", "LangChain", "RAG", "Ollama"],
    repo: "https://github.com/harish040120",
    status: "Winner - PSG iTech Tech Expo",
    image: "/images/project/DocuTalk – AI PDF Chatbot.jpg",
    color: "#00D4FF",
    architecture: [
      { label: "PDF", color: "#00D4FF" },
      { label: "Chunking", color: "#0EA5E9" },
      { label: "Embeddings", color: "#3B82F6" },
      { label: "Vector Store", color: "#6366F1" },
      { label: "LLM", color: "#8B5CF6" },
      { label: "Answer", color: "#A855F7" },
    ],
  },
  {
    id: "aadhaar",
    title: "Aadhaar Face Authentication",
    description: "A full-stack biometric identity verification system that uses facial recognition and liveness detection to authenticate users against the Aadhaar database. The system captures a live image through the browser camera, detects and aligns facial landmarks using face-api.js, and compares the extracted face encoding against a stored reference template. To prevent spoofing attacks — such as holding up a printed photo or displaying a screen — the system implements liveness detection by analyzing micro-movements, texture patterns, and depth cues in real time. The frontend is built with React.js for a responsive, interactive capture experience, while the backend uses Flask to handle face matching, identity verification, and anti-spoofing logic. The entire pipeline operates in real time with sub-second response times, making it suitable for deployment in identity-sensitive applications like banking, government services, and secure facility access.",
    technologies: ["FaceAPI", "Computer Vision", "Biometrics"],
    image: "/images/project/Aadhaar Face Authentication.jpg",
    color: "#10B981",
    architecture: [
      { label: "Camera", color: "#10B981" },
      { label: "Face Detection", color: "#34D399" },
      { label: "Liveness Check", color: "#059669" },
      { label: "Verification", color: "#047857" },
      { label: "Result", color: "#065F46" },
    ],
  },
  {
    id: "aegis",
    title: "Aegis – Parametric Wage Insurance",
    description: "Aegis is an AI-powered parametric insurance platform designed specifically for gig workers who face income volatility due to external factors like weather disruptions. The system uses machine learning (XGBoost) to automatically analyze weather data, detect income impact patterns, and trigger insurance payouts without manual claims processing. When adverse weather conditions are detected in a worker's area, the ML risk engine evaluates the potential income loss based on historical data, occupation type, and severity of disruption. Validated claims are automatically routed through the payout pipeline, eliminating the need for lengthy claim investigations. The backend is built with FastAPI for high-performance API serving and PostgreSQL for structured data storage, while the ML pipeline handles feature engineering, model training, and real-time inference. The platform addresses a critical gap in the gig economy where traditional insurance products fail to cover non-traditional income patterns.",
    technologies: ["FastAPI", "XGBoost", "Machine Learning", "PostgreSQL"],
    repo: "https://github.com/harish040120/Aegis",
    image: "/images/project/Aegis – Parametric Wage Insurance.jpg",
    color: "#F59E0B",
    architecture: [
      { label: "Weather Data", color: "#F59E0B" },
      { label: "ML Risk Engine", color: "#D97706" },
      { label: "Validation", color: "#B45309" },
      { label: "Auto Payout", color: "#92400E" },
    ],
  },
  {
    id: "tikzbuilder",
    title: "TikZBuilder",
    description: "TikZBuilder is an Agentic AI system developed during the IBM SkillBuild internship that converts natural language descriptions into LaTeX TikZ diagrams. The system leverages IBM's Granite 8B large language model hosted on IBM Cloud to interpret user prompts describing shapes, connections, layouts, and labels, then generates syntactically correct TikZ code that can be compiled into publication-quality vector diagrams. The pipeline uses prompt engineering techniques to guide the model through a multi-step process: parsing the user's intent, identifying geometric relationships, selecting appropriate TikZ commands, and assembling the final code. The system handles complex diagram types including flowcharts, architecture diagrams, network topologies, and block diagrams. Built as an Agentic AI workflow, it autonomously validates generated code, detects syntax errors, and iteratively refines the output until the diagram meets the user's requirements. This project bridges the gap between visual thinking and technical documentation by enabling non-LaTeX users to create professional diagrams through simple text descriptions.",
    technologies: ["IBM Cloud", "Granite 8B", "Agentic AI"],
    repo: "https://github.com/harish040120/TikzBuilder",
    image: "/images/project/TikZBuilder.jpg",
    color: "#8B5CF6",
    architecture: [
      { label: "Prompt", color: "#8B5CF6" },
      { label: "Granite 8B", color: "#7C3AED" },
      { label: "Code Gen", color: "#6D28D9" },
      { label: "TikZ Output", color: "#5B21B6" },
    ],
  },
  {
    id: "realg",
    title: "RealG – Emergency Alert & Geofencing",
    description: "RealG is a construction safety platform that combines IoT sensors, LoRa long-range wireless communication, AI-based PPE monitoring, and GPS geofencing to create a real-time worker safety system for hazardous construction sites. Wearable ESP32 devices equipped with GPS modules continuously track worker positions and transmit location data over LoRa networks to a central monitoring station, ensuring connectivity even in areas without cellular coverage. The system defines virtual safety boundaries (geofences) around dangerous zones and automatically triggers emergency alerts when workers enter restricted areas or when their vital signs exceed safe thresholds. A computer vision module powered by YOLOv5 and OpenCV monitors camera feeds in real time to detect PPE compliance — identifying workers without helmets, safety vests, or harnesses — and logs violations with timestamps and location data. The integrated dashboard provides site managers with a live map view of all personnel, historical movement trails, and instant notifications for safety incidents. This project resulted in a published patent (Publication No. 24/2025) for its novel approach to combining geofencing with AI monitoring for construction safety.",
    technologies: ["YOLO", "OpenCV", "LoRa", "ESP32", "GPS"],
    repo: "https://github.com/harish040120/RealG",
    patent: "Publication No. 24/2025",
    image: "/images/project/RealG.jpg",
    color: "#EF4444",
    architecture: [
      { label: "Sensors", color: "#EF4444" },
      { label: "LoRa Network", color: "#DC2626" },
      { label: "AI Monitoring", color: "#B91C1C" },
      { label: "Emergency Alert", color: "#991B1B" },
    ],
  },
  {
    id: "n2k",
    title: "N2K Logistics Management",
    description: "N2K Logistics is a full-stack logistics management platform built to streamline end-to-end supply chain operations for small and mid-sized logistics companies. The system provides real-time shipment tracking with live map integration, fleet management with driver assignment and route optimization, and multi-role access control supporting admin, dispatcher, and driver personas. The frontend is built with React.js for a responsive dashboard experience, while the backend uses Node.js and Express.js to handle API routing, business logic, and authentication. Data is stored in Microsoft SQL Server for transactional reliability, with Firebase providing real-time push notifications for shipment status updates and driver location changes. The platform supports order lifecycle management from creation through dispatch to delivery confirmation, with automated status tracking at each checkpoint. Each role has a tailored dashboard — administrators see fleet-wide analytics, dispatchers manage active shipments and assignments, and drivers receive their delivery queues with turn-by-turn navigation. The system reduces manual coordination overhead and provides full visibility across the logistics pipeline.",
    technologies: ["React", "Node.js", "Express", "MSSQL", "Firebase"],
    repo: "https://github.com/harish040120/n2k_logistics",
    image: "/images/project/N2K Logistics.png",
    color: "#06B6D4",
    architecture: [
      { label: "User", color: "#06B6D4" },
      { label: "API", color: "#0891B2" },
      { label: "Services", color: "#0E7490" },
      { label: "Database", color: "#155E75" },
    ],
  },
]
