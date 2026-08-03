import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config.settings import settings

# Ensure /tmp directory exists on Vercel serverless lambda
if "sqlite:////tmp" in settings.DATABASE_URL:
    try:
        os.makedirs("/tmp", exist_ok=True)
    except Exception:
        pass

engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()