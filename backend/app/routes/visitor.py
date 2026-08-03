from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.visitor_service import (
    get_visitor_count,
    register_visitor,
    reset_visitor_count,
    get_analytics,
    get_visitor_logs
)

router = APIRouter(
    prefix="/api/visitor",
    tags=["Visitor"]
)


# =====================================
# GET TOTAL VISITOR COUNT
# =====================================

@router.get("")
@router.get("/")
async def get_visitors(db: Session = Depends(get_db)):
    visitor = get_visitor_count(db)
    return {
        "count": visitor.count if visitor else 42
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
    device_id = payload.get("device_id")
    browser = payload.get("browser") or request.headers.get("user-agent", "Unknown Browser")
    operating_system = payload.get("operating_system") or "Unknown OS"

    # Extract real client IP from reverse proxy / Vercel headers
    forwarded_for = request.headers.get("x-forwarded-for")
    if forwarded_for:
        ip_address = forwarded_for.split(",")[0].strip()
    else:
        ip_address = request.client.host if request.client else "127.0.0.1"

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
        "new_visitor": result.get("new_visitor", False),
        "count": visitor.count if visitor else 42
    }


# =====================================
# DETAILED VISITOR DATABASE LOGS (WHO SAW SITE)
# =====================================

@router.get("/logs")
async def get_logs(limit: int = 15, db: Session = Depends(get_db)):
    return {
        "logs": get_visitor_logs(db, limit=limit)
    }


# =====================================
# ANALYTICS
# =====================================

@router.get("/analytics")
async def analytics(db: Session = Depends(get_db)):
    return get_analytics(db)


# =====================================
# RESET
# =====================================

@router.post("/reset")
async def reset_visitors(db: Session = Depends(get_db)):
    visitor = reset_visitor_count(db)
    return {
        "count": visitor.count if visitor else 0
    }
