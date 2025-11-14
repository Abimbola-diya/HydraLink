from fastapi import APIRouter
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
import random

router = APIRouter(prefix="/alerts", tags=["Alerts"])

# In-memory storage for demo alerts
ALERTS = []

# Sample drainages for demo
DRAINAGES = [
    {"name": "Maforija", "distance": 2, "status": "red", "health_index": 12},
    {"name": "Odomola", "distance": 0.8, "status": "yellow", "health_index": 45},
    {"name": "Ikorodu Rd", "distance": 1.5, "status": "green", "health_index": 90},
]

def generate_alert():
    """Generate a dummy flood alert"""
    drainage = random.choice(DRAINAGES)
    rain_chance = random.randint(50, 100)
    risk_percent = random.randint(10, 70)
    alert = {
        "time": datetime.now().strftime("%H:%M:%S"),
        "message": f"Rain {rain_chance}% likely tomorrow. Drainage '{drainage['name']}' ({drainage['distance']}km away) at {drainage['status']} status. Flood risk: {risk_percent}%",
        "drainage": drainage["name"],
        "risk_percent": risk_percent
    }
    ALERTS.append(alert)
    # Keep last 20 alerts only
    if len(ALERTS) > 20:
        ALERTS.pop(0)

# Scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(generate_alert, "interval", minutes=1)  # every 1 min for demo
scheduler.start()

# Route to get latest alerts
@router.get("/latest")
def get_latest_alerts():
    return ALERTS
