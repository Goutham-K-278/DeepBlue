


from fastapi import FastAPI
from .replay import AISReplay
from .pfz_data import get_pfz
from ai.detect import run_detection
from twilio.rest import Client
from fastapi import Query
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

app = FastAPI()
replay = AISReplay()

@app.get("/vessels")
def get_vessels():
    # Return all vessels in the sample (for dashboard map)
    return [
        {
            "vessel_id": row["vessel_id"],
            "timestamp": row["timestamp"],
            "lat": row["lat"],
            "lon": row["lon"],
            "vessel_name": row["vessel_name"] if "vessel_name" in row else "Unknown",
            "sog": row["sog"] if "sog" in row else 0,
            "cog": row["cog"] if "cog" in row else 0,
        }
        for _, row in replay.df.iterrows()
    ]

@app.get("/pfz")
def pfz():
    return get_pfz()

@app.get("/detect-ship")
def detect_ship():
    result = run_detection()
    return result

@app.post("/send-alert")
def send_alert(phone: str = Query("+91xxxxxxxxxx"), message: str = Query("PFZ Alert!")):
    try:
        client = Client(os.getenv("TWILIO_SID"), os.getenv("TWILIO_AUTH"))
        msg = client.messages.create(
            body=message,
            from_=os.getenv("TWILIO_FROM"),
            to=phone
        )
        return {"status": "sent", "sid": msg.sid}
    except Exception as e:
        return {"status": "failed", "error": str(e)}
