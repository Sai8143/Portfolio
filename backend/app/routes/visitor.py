from fastapi import APIRouter, Depends, Request, HTTPException, Header, status
from sqlalchemy.orm import Session
from typing import Optional

from app.database.db import get_db
from app.config.settings import settings
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


def verify_admin_access(
    x_admin_password: Optional[str] = Header(None, alias="x-admin-password"),
    authorization: Optional[str] = Header(None)
) -> bool:
    provided_key = x_admin_password
    if not provided_key and authorization:
        if authorization.startswith("Bearer "):
            provided_key = authorization.replace("Bearer ", "").strip()
        else:
            provided_key = authorization.strip()

    expected_key = settings.ADMIN_PASSWORD.strip()
    if not provided_key or provided_key.strip().lower() != expected_key.lower():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized: Invalid Admin Password"
        )
    return True


# =====================================
# GET TOTAL UNIQUE VISITOR COUNT
# =====================================

@router.get("")
@router.get("/")
async def get_visitors(db: Session = Depends(get_db)):
    count = get_visitor_count(db)
    if count is None:
        return {
            "count": None,
            "status": "database_unavailable"
        }
    return {
        "count": count,
        "status": "online"
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

    # Extract real client IP (treating it strictly as metadata/telemetry)
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

    count = get_visitor_count(db)

    return {
        "success": result.get("success", False),
        "new_visitor": result.get("new_visitor", False),
        "count": count,
        "status": "online" if count is not None else "database_unavailable"
    }


# =====================================
# ADMIN VERIFICATION
# =====================================

@router.post("/admin/verify")
async def verify_admin(payload: dict):
    password = (payload.get("password") or "").strip()
    expected = settings.ADMIN_PASSWORD.strip()
    if password.lower() == expected.lower():
        return {"authenticated": True}
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid admin credentials"
    )


# =====================================
# DETAILED VISITOR DATABASE LOGS (ADMIN ONLY)
# =====================================

@router.get("/logs")
async def get_logs(
    limit: int = 20,
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_access)
):
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
# RESET (ADMIN ONLY)
# =====================================

@router.post("/reset")
async def reset_visitors(
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_access)
):
    count = reset_visitor_count(db)
    return {
        "count": count
    }
