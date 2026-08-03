from fastapi import APIRouter
from app.schemas.schema import (
    ChatRequest,
    ChatResponse
)

router = APIRouter(
    prefix="/api/ai",
    tags=["AI Assistant"]
)


class SaiAI:

    @staticmethod
    def generate_response(question: str) -> str:
        q = question.lower().strip()

        # 1. GREETINGS & INTRO
        if any(w in q for w in ["hi", "hello", "hey", "greetings", "good morning", "good evening", "sup", "howdy"]):
            return (
                "Hello! 👋 I am SaiAI, the interactive AI Assistant for Sai Ganesh Chinni.\n\n"
                "I can answer any question about Sai's portfolio:\n"
                "• 📄 Published Paper: CITYADAPTAI (IJAM Journal, 2025)\n"
                "• 🚀 Featured Projects: AcciSense, Fake News, Tambola, E-Learning\n"
                "• 🏢 Internship: AVNL Ordnance Factory Hyderabad\n"
                "• 💻 Skills & Stack: React, Vite, Flutter, Python, FastAPI, ML\n"
                "• 📬 Contact & Social Links"
            )

        # 2. WHO IS SAI / ABOUT / BIO
        if any(phrase in q for phrase in ["who is sai", "about sai", "who are you", "tell me about", "bio", "background", "who is he"]):
            return (
                "👤 About Sai Ganesh Chinni:\n\n"
                "Sai Ganesh is an AI Engineer & Full Stack Developer based in Hyderabad / Andhra Pradesh, India.\n\n"
                "• 🚀 Specialization: Machine Learning, AI model integration, React web engineering, Flutter mobile apps, and FastAPI cloud backends.\n"
                "• 📄 Published Author: CITYADAPTAI in IJAM Journal (2025).\n"
                "• 💡 Mission: Engineering intelligent, scalable digital experiences for real-world impact."
            )

        # 3. RESEARCH PUBLICATIONS & PAPERS (EXACT SINGLE PAPER)
        if any(w in q for w in ["paper", "publication", "publications", "research", "ijam", "journal", "published", "article", "cityadapt"]):
            return (
                "📄 Single Published Research Paper:\n\n"
                "• Title: CITYADAPTAI – AI-Driven Smart City Personalization System\n"
                "• Journal: International Journal of Applied Mathematics (IJAM), Vol. 38, No. 4, 2025\n"
                "• DOI: https://doi.org/10.12732/ijam.v38i12s.1693\n"
                "• Contribution & Role: Assisted in frontend development and AI model integration for an AI-driven smart city personalization system.\n"
                "• Key Tags: AI Personalization, Smart City, AI Model Integration, Frontend Engineering, IJAM"
            )

        # 4. PROJECTS OVERVIEW
        if any(w in q for w in ["project", "projects", "work", "built", "apps", "creations", "portfolio"]):
            return (
                "🚀 Featured Engineering Projects:\n\n"
                "1. 🚨 Accident-Detection-AcciSense: Real-time AI road safety & emergency notification platform.\n"
                "2. 📰 Fake News Detection System: NLP-driven text analysis model for identifying misleading news.\n"
                "3. 🎲 Online Tambola Game: Real-time multiplayer Flutter app with automated ticket verification & sync.\n"
                "4. 🎓 AI E-Learning Recommendation System: Smart YouTube & educational resource curation platform."
            )

        # 5. ACCISENSE SPECIFIC
        if any(w in q for w in ["accisense", "accident", "road safety", "emergency"]):
            return (
                "🚨 Accident-Detection-AcciSense:\n\n"
                "An intelligent AI-powered road safety system designed to automatically detect vehicle accidents, transmit live coordinates, and alert emergency response networks in real time."
            )

        # 6. FAKE NEWS SPECIFIC
        if any(w in q for w in ["fake news", "nlp", "news detection"]):
            return (
                "📰 Fake News Detection System:\n\n"
                "An AI system leveraging Natural Language Processing (NLP) and Machine Learning classification algorithms to analyze article syntax and flag misinformation."
            )

        # 7. TAMBOLA SPECIFIC
        if any(w in q for w in ["tambola", "game", "flutter game"]):
            return (
                "🎲 Online Tambola Game:\n\n"
                "A real-time multiplayer mobile game built using Flutter, Dart, and Firebase Realtime Database. Features automated ticket generation and live number calling sync."
            )

        # 8. E-LEARNING SPECIFIC
        if any(w in q for w in ["learning", "youtube", "recommendation"]):
            return (
                "🎓 AI Based E-Learning Video Recommendation System:\n\n"
                "An intelligent EdTech application that analyzes user learning goals to recommend curated YouTube educational video tutorials and course modules."
            )

        # 9. SKILLS & TECH STACK
        if any(w in q for w in ["skill", "skills", "technology", "technologies", "stack", "languages", "python", "react", "flutter", "fastapi", "tools"]):
            return (
                "💻 Technical Skills & Stack:\n\n"
                "• Frontend: React.js, JavaScript, Tailwind CSS, Framer Motion, HTML5/CSS3\n"
                "• Mobile: Flutter, Dart, Firebase\n"
                "• Backend & API: Python, FastAPI, REST APIs, SQLAlchemy\n"
                "• Database: MySQL, SQLite, Firebase Realtime DB\n"
                "• AI & Data: Artificial Intelligence, Machine Learning, Computer Vision, NLP\n"
                "• Tools: Git, GitHub, Vercel, Docker"
            )

        # 10. INTERNSHIP & EXPERIENCE
        if any(w in q for w in ["internship", "experience", "training", "avnl", "ordnance", "company", "work experience"]):
            return (
                "🏢 Industrial Internship Experience:\n\n"
                "• Company: AVNL Ordnance Factory (Armoured Vehicles Nigam Limited), Ordnance Factory Medak, Hyderabad\n"
                "• Exposure: Industrial software workflows, defense technology systems exposure, and production engineering processes."
            )

        # 11. EDUCATION & LOCATION
        if any(w in q for w in ["education", "college", "degree", "university", "study", "qualification", "location", "city", "hyderabad"]):
            return (
                "🎓 Education & Location:\n\n"
                "• Specialization: Computer Science & Artificial Intelligence Engineering\n"
                "• Focus Areas: Machine Learning, Web & Mobile Architectures, Data Structures & Algorithms\n"
                "• Location: Hyderabad / Andhra Pradesh, India"
            )

        # 12. CONTACT & SOCIAL LINKS
        if any(w in q for w in ["contact", "email", "phone", "reach", "hire", "message", "linkedin", "github", "connect"]):
            return (
                "📬 Get in Touch with Sai Ganesh:\n\n"
                "• Email: saiganesh0565@gmail.com\n"
                "• Phone: +91 8341296052\n"
                "• GitHub: https://github.com/Sai8143\n"
                "• Contact Form: Send a direct message in the 'Start A Conversation' section below!"
            )

        # 13. RESUME
        if any(w in q for w in ["resume", "cv", "download resume"]):
            return (
                "📄 Resume Download:\n\n"
                "You can view and download Sai's official resume by clicking the 'Download Resume' button in the Hero section or Navbar!"
            )

        # 14. COURTESY
        if any(w in q for w in ["thank", "thanks", "awesome", "great", "cool"]):
            return (
                "You're very welcome! 😊 Feel free to ask anything else about Sai's CITYADAPTAI paper, projects, or skills!"
            )

        # 15. DEFAULT SMART FALLBACK
        return (
            "🤖 I am SaiAI, your intelligent guide for Sai Ganesh's portfolio!\n\n"
            "Try asking me:\n"
            "• \"Tell me about Sai's published paper (CITYADAPTAI)\"\n"
            "• \"What projects has Sai built?\"\n"
            "• \"What are Sai's core skills and tech stack?\"\n"
            "• \"Describe Sai's internship at AVNL Ordnance Factory\"\n"
            "• \"How can I contact Sai Ganesh?\""
        )


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    reply = SaiAI.generate_response(request.message)
    return ChatResponse(reply=reply)


@router.get("/")
async def ai_status():
    return {
        "status": "online",
        "assistant": "SaiAI"
    }
