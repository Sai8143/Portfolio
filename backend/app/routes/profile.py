
from fastapi import APIRouter

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


@router.get("/")
async def get_profile():

    return {

        "name":
        "Sai Ganesh Chinni",

        "role":
        "AI Engineer | Full Stack Developer | Cybersecurity Enthusiast",

        "description":
        """
Designing intelligent digital systems,
future-focused interfaces,
AI-powered applications,
and secure technology experiences.

Passionate about Artificial Intelligence,
Cybersecurity and modern software engineering.
        """.strip(),

        "location":
        "Andhra Pradesh, India",

        "resume":
        "/resume.pdf",

        "github":
        "https://github.com/Sai8143",

        "skills": [

            "React",

            "Flutter",

            "Python",

            "Artificial Intelligence",

            "Cybersecurity",

            "Firebase",

            "MySQL",

            "Machine Learning"
        ],

        "stats": {

            "projects": 4,

            "specialization":
            "AI",

            "security":
            "Cyber",

            "development":
            "Full Stack"
        }
    }
