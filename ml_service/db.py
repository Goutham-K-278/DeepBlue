from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db_models import Base

DATABASE_URL = "sqlite:///ml_service.db"  # For demo; change to PostgreSQL if needed

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)
