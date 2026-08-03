
from pydantic import (
    BaseModel,
    EmailStr
)


# =====================================
# CONTACT
# =====================================

class ContactRequest(
    BaseModel
):
    name: str

    email: EmailStr

    message: str


class ContactResponse(
    BaseModel
):
    success: bool

    message: str


# =====================================
# VISITOR
# =====================================

class VisitorResponse(
    BaseModel
):
    count: int


# =====================================
# AI ASSISTANT
# =====================================

class ChatRequest(
    BaseModel
):
    message: str


class ChatResponse(
    BaseModel
):
    reply: str


# =====================================
# PROFILE
# =====================================

class ProfileResponse(
    BaseModel
):
    name: str

    role: str

    description: str

    location: str

    resume: str
