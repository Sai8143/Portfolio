
from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.db import get_db

from app.database.models import ContactMessage

from app.schemas.schema import (
    ContactRequest
)

router = APIRouter(
    prefix="/api/contact",
    tags=["Contact"]
)


@router.post("")
@router.post("/")
async def submit_contact_form(
    data: ContactRequest,
    db: Session = Depends(get_db)
):

    contact = ContactMessage(

        name=data.name,

        email=data.email,

        message=data.message

    )

    db.add(contact)

    db.commit()

    db.refresh(contact)

    return {

        "success": True,

        "message":
        "Message sent successfully.",

        "id":
        contact.id
    }


@router.get("/")
async def get_messages(
    db: Session = Depends(get_db)
):

    messages = (
        db.query(ContactMessage)
        .order_by(
            ContactMessage.id.desc()
        )
        .all()
    )

    return messages
