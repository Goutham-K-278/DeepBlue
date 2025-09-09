from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class ShipDetection(Base):
    __tablename__ = 'ship_detection'
    id = Column(Integer, primary_key=True)
    image_id = Column(String)
    lat = Column(Float)
    lng = Column(Float)
    confidence = Column(Float)
    timestamp = Column(DateTime)

class EDNASpecies(Base):
    __tablename__ = 'edna_species'
    id = Column(Integer, primary_key=True)
    lat = Column(Float)
    lng = Column(Float)
    detected_species = Column(String)
    rare_species = Column(String)
    diversity_index = Column(Float)
    timestamp = Column(DateTime)

class OtolithMorphometrics(Base):
    __tablename__ = 'otolith_morphometrics'
    id = Column(Integer, primary_key=True)
    species = Column(String)
    avg_length = Column(Float)
    avg_weight = Column(Float)
    shape_factor = Column(Float)
    age_estimate = Column(Integer)
    timestamp = Column(DateTime)
