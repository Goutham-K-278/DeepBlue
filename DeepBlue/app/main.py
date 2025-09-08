

from fastapi import FastAPI
from .replay import AISReplay
from .pfz_data import get_pfz
from ai.detect import run_detection

app = FastAPI()
replay = AISReplay()

@app.get("/vessels")
def get_vessel():
    return replay.next_position()

@app.get("/pfz")
def pfz():
    return get_pfz()

@app.get("/detect-ship")
def detect_ship():
    result = run_detection()
    return result

@app.post("/send-alert")
def send_alert():
    return {"status": "SMS sent (mock)"}
