
from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import settings

from app.database.db import engine

from app.database.models import Base

from app.routes.profile import (
    router as profile_router
)

from app.routes.skills import (
    router as skills_router
)

from app.routes.projects import (
    router as projects_router
)

from app.routes.contact import (
    router as contact_router
)

from app.routes.visitor import (
    router as visitor_router
)

from app.routes.ai_assistant import (
    router as ai_router
)


# =====================================
# DATABASE TABLES
# =====================================

Base.metadata.create_all(
    bind=engine
)


# =====================================
# APP
# =====================================

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.API_VERSION
)


# =====================================
# CORS
# =====================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================
# ROOT
# =====================================

@app.get("/")
async def root():

    return {

        "message":
        "Sai Ganesh Portfolio API",

        "status":
        "online"
    }


# =====================================
# ROUTES
# =====================================

app.include_router(
    profile_router
)

app.include_router(
    skills_router
)

app.include_router(
    projects_router
)

app.include_router(
    contact_router
)

app.include_router(
    visitor_router
)

app.include_router(
    ai_router
)
