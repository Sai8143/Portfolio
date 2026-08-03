
from fastapi import APIRouter

from app.schemas.schema import (
    ChatRequest,
    ChatResponse
)

router = APIRouter(
    prefix="/ai",
    tags=["AI Assistant"]
)


class SaiAI:

    @staticmethod
    def generate_response(
        question: str
    ):

        q = question.lower().strip()

        # GREETINGS & INTRO
        if any(w in q for w in ["hi", "hello", "hey", "greetings", "good morning", "good evening", "sup"]):
            return (
                "Hello! 👋 I am SaiAI, your interactive guide to Sai Ganesh's portfolio.\n\n"
                "You can ask me about:\n"
                "• Featured Projects\n"
                "• Tech Stack & Skills\n"
                "• Internship & Experience\n"
                "• Education & Career Goals\n"
                "• Contact & Social Links"
            )

        # WHO IS SAI / ABOUT
        if any(phrase in q for phrase in ["who is sai", "about sai", "who are you", "tell me about", "bio", "background"]):
            return (
                "Sai Ganesh Chinni is an AI Engineer, Full Stack Developer, and Cybersecurity Enthusiast.\n\n"
                "🚀 Specialization: AI/ML systems, React web apps, Flutter mobile development, and secure backend architectures.\n"
                "💡 Mission: Building intelligent, scalable, and secure software solutions."
            )

        # CONTACT / REACH / EMAIL
        if any(word in q for word in ["contact", "email", "reach", "hire", "message", "linkedin", "github", "connect"]):
            return (
                "📬 You can get in touch with Sai Ganesh through:\n\n"
                "• Email: Contact form on this site\n"
                "• GitHub: https://github.com/Sai8143\n"
                "• Message: Send a message directly via the Contact section below!"
            )

        # EDUCATION
        if any(word in q for word in ["education", "college", "degree", "university", "study", "qualification"]):
            return (
                "🎓 Education & Engineering Background:\n\n"
                "Sai Ganesh pursues engineering with a specialization in Computer Science & Artificial Intelligence, focusing on machine learning applications and full-stack software development."
            )

        # PROJECTS
        if any(word in q for word in ["project", "projects", "work", "built", "apps", "creations"]):
            return (
                "🛠 Featured Projects developed by Sai Ganesh:\n\n"
                "1. 🚨 Accident-Detection-AcciSense: AI-powered road safety & emergency dispatch system.\n"
                "2. 📰 Fake News Detection System: NLP-driven AI classifier for misleading news articles.\n"
                "3. 🎲 Online Tambola Game: Real-time multiplayer Flutter app with automated ticket verification.\n"
                "4. 🎓 AI E-Learning Recommendation System: Smart YouTube & course recommendation engine."
            )

        # SKILLS & TECHNOLOGIES
        if any(word in q for word in ["skill", "skills", "technology", "technologies", "stack", "languages", "python", "react", "flutter"]):
            return (
                "💻 Technical Skills:\n\n"
                "• Frontend: React, Tailwind CSS, Three.js / R3F, HTML5 / CSS3\n"
                "• Mobile: Flutter, Dart, Firebase\n"
                "• Backend: Python, FastAPI, SQLAlchemy, SQLite / MySQL\n"
                "• AI & Data: Artificial Intelligence, Machine Learning, NLP\n"
                "• Domain: Cybersecurity & System Architecture"
            )

        # INTERNSHIP & EXPERIENCE
        if any(word in q for word in ["internship", "experience", "training", "company", "work experience"]):
            return (
                "🏢 Professional Training & Internship:\n\n"
                "• AVNL Ordnance Factory Hyderabad\n"
                "Gained hands-on industrial engineering experience, system exposure, and technical training in real-world workflows."
            )

        # ACCISENSE SPECIFIC
        if "accisense" in q or "accident" in q:
            return (
                "🚨 Accident-Detection-AcciSense:\n\n"
                "An AI-powered road safety system designed to automatically detect vehicle accidents, transmit live coordinates, and alert emergency response networks in real time."
            )

        # TAMBOLA SPECIFIC
        if "tambola" in q or "game" in q:
            return (
                "🎲 Online Tambola Game:\n\n"
                "A real-time multiplayer mobile game built using Flutter and Firebase, featuring automated ticket generation, number calling sync, and instant win verification."
            )

        # FAKE NEWS SPECIFIC
        if "fake news" in q or "news" in q:
            return (
                "📰 Fake News Detection System:\n\n"
                "An AI system leveraging Natural Language Processing (NLP) models to analyze text patterns, verify content authenticity, and flag misinformation."
            )

        # E-LEARNING SPECIFIC
        if "learning" in q or "youtube" in q or "recommendation" in q:
            return (
                "🎓 AI Based E-Learning Video Recommendation System:\n\n"
                "An intelligent recommendation engine that analyzes student goals to curate YouTube educational videos, tutorials, and quizzes."
            )

        # DEFAULT FALLBACK
        return (
            "🤖 I am SaiAI, your portfolio guide.\n\n"
            "Try asking about:\n"
            "• \"What projects has Sai built?\"\n"
            "• \"What are Sai's skills?\"\n"
            "• \"Tell me about AcciSense\"\n"
            "• \"How can I contact Sai?\"\n"
            "• \"What is Sai's experience?\""
        )


@router.post(
    "/chat",
    response_model=ChatResponse
)
async def chat(
    request: ChatRequest
):

    reply = SaiAI.generate_response(
        request.message
    )

    return ChatResponse(
        reply=reply
    )


@router.get("/")
async def ai_status():

    return {
        "status": "online",
        "assistant": "SaiAI"
    }
