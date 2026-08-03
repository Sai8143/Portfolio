
from fastapi import APIRouter

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


@router.get("/")
async def get_projects():

    return {

        "featured_project": {

            "title":
            "Accident-Detection-AcciSense",

            "description":
            """
AI-powered accident detection and emergency
response platform designed to improve road safety
through real-time monitoring, incident detection,
location tracking and emergency notifications.
            """.strip(),

            "technologies": [

                "React",

                "Python",

                "FastAPI",

                "Artificial Intelligence",

                "Computer Vision"
            ],

            "status":
            "Active Development"
        },

        "projects": [

            {
                "id": 1,

                "title":
                "Fake News Detection System",

                "description":
                """
AI-based application capable of identifying
fake and misleading news articles using
machine learning and natural language processing.
                """.strip(),

                "technologies": [

                    "React",

                    "Python",

                    "Machine Learning",

                    "NLP"
                ],

                "category":
                "Artificial Intelligence",

                "featured":
                True,

                "github":
                "",

                "demo":
                ""
            },

            {
                "id": 2,

                "title":
                "Accident-Detection-AcciSense",

                "description":
                """
Real-time accident detection platform with
location tracking, emergency alert system
and intelligent monitoring capabilities.
                """.strip(),

                "technologies": [

                    "React",

                    "FastAPI",

                    "Python",

                    "AI"
                ],

                "category":
                "AI & Safety",

                "featured":
                True,

                "github":
                "",

                "demo":
                ""
            },

            {
                "id": 3,

                "title":
                "Online Tambola Game",

                "description":
                """
Real-time multiplayer Tambola platform
with automated ticket validation,
room management and live gameplay.
                """.strip(),

                "technologies": [

                    "Flutter",

                    "Firebase",

                    "Realtime Database"
                ],

                "category":
                "Mobile Development",

                "featured":
                False,

                "github":
                "",

                "demo":
                ""
            },

            {
                "id": 4,

                "title":
                "AI Based E-Learning Video Recommendation System",

                "description":
                """
Educational recommendation platform that
suggests learning videos from YouTube and
provides intelligent assessments using
resources inspired by modern learning systems.
                """.strip(),

                "technologies": [

                    "Python",

                    "Recommendation System",

                    "YouTube API",

                    "Artificial Intelligence"
                ],

                "category":
                "EdTech AI",

                "featured":
                True,

                "github":
                "",

                "demo":
                ""
            }
        ]
    }
