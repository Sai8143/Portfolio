
from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime
)

from datetime import datetime

from sqlalchemy.orm import declarative_base


Base = declarative_base()


# =====================================
# VISITOR COUNTER
# =====================================

class Visitor(Base):

    __tablename__ = "visitors"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    count = Column(
        Integer,
        default=0
    )


# =====================================
# UNIQUE VISITOR ANALYTICS
# =====================================

class VisitorLog(Base):

    __tablename__ = "visitor_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    device_id = Column(
        String(255),
        unique=True,
        nullable=False
    )

    ip_address = Column(
        String(100),
        nullable=True
    )

    browser = Column(
        String(255),
        nullable=True
    )

    operating_system = Column(
        String(255),
        nullable=True
    )

    country = Column(
        String(255),
        nullable=True
    )

    first_visit = Column(
        DateTime,
        default=datetime.utcnow
    )

    last_visit = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    visit_count = Column(
        Integer,
        default=1
    )

    visited_at = Column(
        DateTime,
        default=datetime.utcnow
    )


# =====================================
# CONTACT MESSAGES
# =====================================

class ContactMessage(Base):

    __tablename__ = "contact_messages"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(255),
        nullable=False
    )

    message = Column(
        Text,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
