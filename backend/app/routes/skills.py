
from fastapi import APIRouter

router = APIRouter(
    prefix="/api/skills",
    tags=["Skills"]
)


@router.get("/")
async def get_skills():

    return {

        "categories": [

            {
                "title":
                "Frontend Development",

                "skills": [

                    "React",

                    "JavaScript",

                    "HTML",

                    "CSS",

                    "Tailwind CSS"
                ]
            },

            {
                "title":
                "Mobile Development",

                "skills": [

                    "Flutter",

                    "Dart"
                ]
            },

            {
                "title":
                "Backend Development",

                "skills": [

                    "Python",

                    "FastAPI",

                    "Firebase",

                    "MySQL"
                ]
            },

            {
                "title":
                "Artificial Intelligence",

                "skills": [

                    "Machine Learning",

                    "Recommendation Systems",

                    "Natural Language Processing",

                    "Artificial Intelligence"
                ]
            },

            {
                "title":
                "DevOps & Cloud",

                "skills": [

                    "Docker",

                    "Git & GitHub",

                    "Cloud Infrastructure"
                ]
            }
        ],

        "featured": [

            "React",

            "Flutter",

            "Python",

            "Artificial Intelligence",

            "FastAPI"
        ]
    }
