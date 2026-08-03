
from fastapi import APIRouter

router = APIRouter(
    prefix="/api/profile",
    tags=["Profile"]
)


@router.get("/")
async def get_profile():

    return {

        "name":
        "Sai Ganesh Chinni",

        "role":
        "AI Engineer | Full Stack Developer",

        "description":
        """
Designing intelligent digital systems,
future-focused interfaces,
AI-powered applications,
and modern software experiences.

Passionate about Artificial Intelligence,
Cloud Systems and modern software engineering.
        """.strip(),

        "location":
        "Hyderabad, Telangana, India",

        "resume":
        "/resume.pdf",

        "github":
        "https://github.com/Sai8143",

        "skills": [

            "React",

            "Flutter",

            "Python",

            "Artificial Intelligence",

            "FastAPI",

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
