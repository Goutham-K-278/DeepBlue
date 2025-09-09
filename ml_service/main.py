

from fastapi import FastAPI, UploadFile, File, Depends
from fastapi.responses import StreamingResponse
import pandas as pd
import os
from ml_models import correlation_engine

app = FastAPI()

data_dir = os.path.join(os.path.dirname(__file__), 'data')

def stream_csv(filename):
    path = os.path.join(data_dir, filename)
    df = pd.read_csv(path)
    return StreamingResponse(df.to_csv(index=False), media_type='text/csv')

@app.get("/api/sar")
def get_sar():
    return stream_csv('satellite_imagery_sar.csv')

@app.get("/api/ais")
def get_ais():
    return stream_csv('ais_feeds.csv')

@app.get("/api/edna")
def get_edna():
    return stream_csv('cmlre_biological_edna.csv')



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()

data_dir = os.path.join(os.path.dirname(__file__), 'data')

def stream_csv(filename):
    path = os.path.join(data_dir, filename)
    df = pd.read_csv(path)
    return StreamingResponse(df.to_csv(index=False), media_type='text/csv')

@app.get("/api/sar")
def get_sar():
    return stream_csv('satellite_imagery_sar.csv')

@app.get("/api/ais")
def get_ais():
    return stream_csv('ais_feeds.csv')

@app.get("/api/edna")
def get_edna():
    return stream_csv('cmlre_biological_edna.csv')

@app.get("/api/otolith")
def get_otolith():
    return stream_csv('otolith_taxonomy.csv')

@app.get("/api/pfz")
def get_pfz():
    return stream_csv('pfz_advisories.csv')

@app.get("/api/field-survey")
def get_field_survey():
    return stream_csv('field_survey_data.csv')

@app.get("/api/ml/correlation")
def api_correlation():
    return correlation_engine()







from db import SessionLocal, init_db
from db_models import ShipDetection, EDNASpecies, OtolithMorphometrics
from sqlalchemy.orm import Session
from datetime import datetime

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@app.on_event("startup")
def on_startup():
    init_db()

