
from fastapi import FastAPI
from .replay import AISReplay
from .pfz_data import get_pfz

app = FastAPI()
replay = AISReplay()

@app.get("/vessels")
def get_vessel():
    return replay.get_next()

@app.get("/pfz")
def pfz():
    return get_pfz()

@app.get("/detect-ship")
def detect_ship():
    return {"detected": True, "bbox": [100, 150, 200, 250]}

@app.post("/send-alert")
def send_alert():
    return {"status": "SMS sent (mock)"}
