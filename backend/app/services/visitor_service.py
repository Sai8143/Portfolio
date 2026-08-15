from datetime import datetime, timezone

from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.database.models import (
    Visitor,
    VisitorLog
)


# ============================================================
# CONFIGURATION
# ============================================================

# ------------------------------------------------------------
# IMPORTANT
# ------------------------------------------------------------
#
# If your portfolio already had 42 visitors before this
# tracking system was introduced, keep this as 42.
#
# If you want the counter to start from zero, change to:
#
# BASELINE_VISITORS = 0
#
# This is an INITIAL VALUE.
# It is NOT used as a database failure fallback.
# ------------------------------------------------------------

BASELINE_VISITORS = 42


# ============================================================
# CURRENT UTC TIME
# ============================================================

def utc_now():
    """
    Returns the current timezone-aware UTC timestamp.
    """
    return datetime.now(timezone.utc)


# ============================================================
# GET TOTAL VISITOR COUNT
# ============================================================

def get_visitor_count(db: Session) -> Visitor:
    """
    Returns the unique visitor counter.

    The counter is stored in the visitor_counter table.

    IMPORTANT:
    Database failures are raised instead of returning fake
    visitor counts.
    """

    try:

        visitor = (
            db.query(Visitor)
            .first()
        )

        # ----------------------------------------------------
        # CREATE COUNTER IF IT DOES NOT EXIST
        # ----------------------------------------------------

        if visitor is None:

            visitor = Visitor(
                count=BASELINE_VISITORS
            )

            db.add(visitor)

            db.commit()

            db.refresh(visitor)

        return visitor

    except Exception:
        db.rollback()

        # Do NOT return Visitor(count=42).
        #
        # 42 is a real baseline value, not an error response.

        raise


# ============================================================
# REGISTER VISITOR
# ============================================================

def register_visitor(
    db: Session,
    device_id: str,
    ip_address: str = None,
    browser: str = None,
    operating_system: str = None,
    country: str = None,
    city: str = None
) -> dict:

    # --------------------------------------------------------
    # VALIDATE DEVICE ID
    # --------------------------------------------------------

    if not device_id:

        return {
            "new_visitor": False,
            "visitor": None,
            "count": None,
            "status": "invalid_device_id"
        }

    now = utc_now()

    try:

        # ====================================================
        # CHECK WHETHER DEVICE ALREADY EXISTS
        # ====================================================

        existing_visitor = (
            db.query(VisitorLog)
            .filter(
                VisitorLog.device_id == device_id
            )
            .first()
        )

        # ====================================================
        # RETURNING VISITOR
        # ====================================================

        if existing_visitor:

            # -----------------------------------------------
            # DO NOT INCREMENT UNIQUE VISITOR COUNT
            # -----------------------------------------------

            existing_visitor.last_visit = now

            # -----------------------------------------------
            # INCREMENT VISIT COUNT
            # -----------------------------------------------

            existing_visitor.visit_count = (
                existing_visitor.visit_count or 0
            ) + 1

            # -----------------------------------------------
            # UPDATE TELEMETRY
            # -----------------------------------------------

            if ip_address:
                existing_visitor.ip_address = ip_address

            if browser:
                existing_visitor.browser = browser

            if operating_system:
                existing_visitor.operating_system = (
                    operating_system
                )

            if country:
                existing_visitor.country = country

            if city:
                existing_visitor.city = city

            db.commit()

            db.refresh(existing_visitor)

            # Get current counter
            visitor_counter = (
                db.query(Visitor)
                .first()
            )

            return {
                "new_visitor": False,
                "visitor": existing_visitor,
                "count": (
                    visitor_counter.count
                    if visitor_counter
                    else None
                ),
                "status": "returning_visitor"
            }

        # ====================================================
        # NEW UNIQUE VISITOR
        # ====================================================

        visitor_log = VisitorLog(

            device_id=device_id,

            ip_address=ip_address,

            browser=browser,

            operating_system=operating_system,

            country=country,

            city=city,

            first_visit=now,

            last_visit=now,

            visit_count=1,

            visited_at=now
        )

        db.add(visitor_log)

        # Flush first so database constraints are checked
        # before modifying the counter.
        db.flush()

        # ====================================================
        # GET COUNTER
        # ====================================================

        visitor_counter = (
            db.query(Visitor)
            .with_for_update()
            .first()
        )

        # ====================================================
        # CREATE COUNTER IF MISSING
        # ====================================================

        if visitor_counter is None:

            visitor_counter = Visitor(
                count=BASELINE_VISITORS
            )

            db.add(visitor_counter)

            db.flush()

        # ====================================================
        # INCREMENT UNIQUE VISITOR COUNT
        # ====================================================

        visitor_counter.count += 1

        # ====================================================
        # COMMIT
        # ====================================================

        db.commit()

        db.refresh(visitor_log)

        db.refresh(visitor_counter)

        return {
            "new_visitor": True,
            "visitor": visitor_log,
            "count": visitor_counter.count,
            "status": "new_visitor"
        }

    # ========================================================
    # DUPLICATE DEVICE ID
    # ========================================================

    except IntegrityError:

        db.rollback()

        # Another simultaneous request may have inserted
        # the same device_id.
        #
        # Because device_id is UNIQUE, the database protects
        # us from creating duplicate visitor records.

        existing_visitor = (
            db.query(VisitorLog)
            .filter(
                VisitorLog.device_id == device_id
            )
            .first()
        )

        if existing_visitor:

            existing_visitor.last_visit = now

            existing_visitor.visit_count = (
                existing_visitor.visit_count or 0
            ) + 1

            if ip_address:
                existing_visitor.ip_address = ip_address

            if browser:
                existing_visitor.browser = browser

            if operating_system:
                existing_visitor.operating_system = (
                    operating_system
                )

            db.commit()

            db.refresh(existing_visitor)

            visitor_counter = (
                db.query(Visitor)
                .first()
            )

            return {
                "new_visitor": False,
                "visitor": existing_visitor,
                "count": (
                    visitor_counter.count
                    if visitor_counter
                    else None
                ),
                "status": "returning_visitor"
            }

        return {
            "new_visitor": False,
            "visitor": None,
            "count": None,
            "status": "registration_conflict"
        }

    # ========================================================
    # DATABASE ERROR
    # ========================================================

    except Exception:

        db.rollback()

        # Do NOT pretend the visitor was successfully recorded.
        raise


# ============================================================
# RESET VISITOR COUNTER
# ============================================================

def reset_visitor_count(
    db: Session
) -> Visitor:

    try:

        visitor = (
            db.query(Visitor)
            .first()
        )

        if visitor is None:

            visitor = Visitor(
                count=0
            )

            db.add(visitor)

        else:

            visitor.count = 0

        db.commit()

        db.refresh(visitor)

        return visitor

    except Exception:

        db.rollback()

        raise


# ============================================================
# GET ANALYTICS
# ============================================================

def get_analytics(
    db: Session
) -> dict:

    try:

        # ----------------------------------------------------
        # GET ALL REGISTERED UNIQUE DEVICES
        # ----------------------------------------------------

        logs = (
            db.query(VisitorLog)
            .all()
        )

        # ----------------------------------------------------
        # GET COUNTER
        # ----------------------------------------------------

        visitor_counter = (
            db.query(Visitor)
            .first()
        )

        # ----------------------------------------------------
        # UNIQUE VISITORS
        # ----------------------------------------------------

        if visitor_counter:

            total_unique_visitors = (
                visitor_counter.count
            )

        else:

            total_unique_visitors = (
                BASELINE_VISITORS +
                len(logs)
            )

        # ====================================================
        # BROWSER ANALYTICS
        # ====================================================

        browser_counts = {}

        for log in logs:

            user_agent = (
                log.browser or ""
            ).lower()

            # ------------------------------------------------
            # IMPORTANT:
            # EDGE BEFORE CHROME
            # ------------------------------------------------

            if "edg" in user_agent:

                browser_name = (
                    "Microsoft Edge"
                )

            elif (
                "opr" in user_agent
                or "opera" in user_agent
            ):

                browser_name = "Opera"

            elif (
                "firefox" in user_agent
                or "fxios" in user_agent
            ):

                browser_name = (
                    "Firefox / Gecko"
                )

            elif (
                "crios" in user_agent
                or "chrome" in user_agent
            ):

                browser_name = (
                    "Chrome / Chromium"
                )

            elif "safari" in user_agent:

                browser_name = (
                    "Safari / WebKit"
                )

            else:

                browser_name = (
                    "Other Browser"
                )

            browser_counts[browser_name] = (
                browser_counts.get(
                    browser_name,
                    0
                ) + 1
            )

        # ====================================================
        # BROWSER PERCENTAGES
        # ====================================================

        browser_breakdown = []

        total_logs = len(logs)

        if total_logs > 0:

            for (
                browser_name,
                count
            ) in sorted(
                browser_counts.items(),
                key=lambda item: item[1],
                reverse=True
            ):

                percent = round(
                    (count / total_logs) * 100
                )

                browser_breakdown.append({

                    "name": browser_name,

                    "percent": percent,

                    "count": count
                })

        # ====================================================
        # RETURN REAL ANALYTICS
        # ====================================================

        return {

            "total_unique_visitors":
                total_unique_visitors,

            "total_registered_devices":
                len(logs),

            # We do not have a PageView table yet.
            "total_page_views":
                None,

            "active_nodes":
                "Online / Live Production Engine",

            "avg_response_time":
                "Measured by API",

            "security_encryption":
                "HTTPS Encrypted",

            "browser_breakdown":
                browser_breakdown,

            "status":
                "online"
        }

    except Exception:

        db.rollback()

        # ====================================================
        # DATABASE FAILURE
        # ====================================================
        #
        # NEVER return fake visitor numbers.
        # ====================================================

        return {

            "total_unique_visitors":
                None,

            "total_registered_devices":
                None,

            "total_page_views":
                None,

            "active_nodes":
                "Database Unavailable",

            "avg_response_time":
                None,

            "security_encryption":
                "HTTPS",

            "browser_breakdown":
                [],

            "status":
                "degraded"
        }


# ============================================================
# GET VISITOR LOGS
# ============================================================

def get_visitor_logs(
    db: Session,
    limit: int = 15
) -> list:

    try:

        # ----------------------------------------------------
        # LIMIT PROTECTION
        # ----------------------------------------------------

        limit = max(
            1,
            min(limit, 100)
        )

        # ----------------------------------------------------
        # ORDER BY LAST VISIT
        # ----------------------------------------------------

        logs = (
            db.query(VisitorLog)
            .order_by(
                VisitorLog.last_visit.desc()
            )
            .limit(limit)
            .all()
        )

        result = []

        for log in logs:

            result.append({

                "id":
                    log.id,

                # ------------------------------------------------
                # IP
                # ------------------------------------------------

                "ip_address":
                    log.ip_address,

                # ------------------------------------------------
                # BROWSER
                # ------------------------------------------------

                "browser":
                    log.browser,

                # ------------------------------------------------
                # OPERATING SYSTEM
                # ------------------------------------------------

                "operating_system":
                    log.operating_system,

                # ------------------------------------------------
                # LOCATION
                # ------------------------------------------------

                "country":
                    log.country,

                "city":
                    log.city,

                # ------------------------------------------------
                # FIRST VISIT
                # ------------------------------------------------

                "first_visit":
                    (
                        log.first_visit.strftime(
                            "%Y-%m-%d %H:%M:%S"
                        )
                        if log.first_visit
                        else None
                    ),

                # ------------------------------------------------
                # LAST VISIT
                # ------------------------------------------------

                "last_visit":
                    (
                        log.last_visit.strftime(
                            "%Y-%m-%d %H:%M:%S"
                        )
                        if log.last_visit
                        else None
                    ),

                # ------------------------------------------------
                # NUMBER OF VISITS
                # ------------------------------------------------

                "visit_count":
                    log.visit_count or 1
            })

        return result

    except Exception:

        db.rollback()

        raise
