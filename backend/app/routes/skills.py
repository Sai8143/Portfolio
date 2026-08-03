
from fastapi import APIRouter

router = APIRouter(
    prefix="/skills",
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
                "Cybersecurity",

                "skills": [

                    "Network Security",

                    "Digital Security",

                    "Cybersecurity Fundamentals"
                ]
            }
        ],

        "featured": [

            "React",

            "Flutter",

            "Python",

            "Artificial Intelligence",

            "Cybersecurity"
        ]
    }
