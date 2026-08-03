
from fastapi import APIRouter
from fastapi import Depends
from fastapi import Request

from sqlalchemy.orm import Session

from app.database.db import get_db

from app.services.visitor_service import (
    get_visitor_count,
    register_visitor,
    reset_visitor_count,
    get_analytics
)

router = APIRouter(
    prefix="/visitor",
    tags=["Visitor"]
)


# =====================================
# GET TOTAL VISITOR COUNT
# =====================================

@router.get("/")
async def get_visitors(
    db: Session = Depends(get_db)
):

    visitor = get_visitor_count(db)

    return {
        "count": visitor.count
    }


# =====================================
# REGISTER UNIQUE VISITOR
# =====================================

@router.post("/register")
async def register_unique_visitor(
    request: Request,
    payload: dict,
    db: Session = Depends(get_db)
):

    device_id = payload.get(
        "device_id"
    )

    browser = payload.get(
        "browser"
    )

    operating_system = payload.get(
        "operating_system"
    )

    ip_address = request.client.host

    result = register_visitor(

        db=db,

        device_id=device_id,

        ip_address=ip_address,

        browser=browser,

        operating_system=operating_system
    )

    visitor = get_visitor_count(db)

    return {

        "success": True,

        "new_visitor":
        result["new_visitor"],

        "count":
        visitor.count
    }


# =====================================
# ANALYTICS
# =====================================

@router.get("/analytics")
async def analytics(
    db: Session = Depends(get_db)
):

    return get_analytics(db)


# =====================================
# RESET
# =====================================

@router.post("/reset")
async def reset_visitors(
    db: Session = Depends(get_db)
):

    visitor = reset_visitor_count(db)

    return {
        "count": visitor.count
    }
