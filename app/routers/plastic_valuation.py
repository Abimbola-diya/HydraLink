from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
import os, uuid, re
from PIL import Image
from sqlalchemy.orm import Session
from google.genai import Client  # NEW SDK

from app.schemas.plastic import PlasticCalculationResponse
from app.core.config import settings
from app.core.database import get_db
from app.models.user_earning import PlasticEarning

router = APIRouter(prefix="/valuation", tags=["Plastic Valuation"])

# Ensure upload folder exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)


# -----------------------------
# Helper: Save Uploaded Image
# -----------------------------
def save_upload(file: UploadFile) -> str:
    filename = f"{uuid.uuid4()}_{file.filename}"
    path = os.path.join(settings.UPLOAD_DIR, filename)

    with open(path, "wb") as f:
        f.write(file.file.read())

    # Validate file is an actual image
    try:
        img = Image.open(path)
        img.verify()
    except Exception:
        os.remove(path)
        raise HTTPException(status_code=400, detail="Uploaded file is not a valid image")

    return path


# -----------------------------
# Gemini Price Estimation (NEW SDK)
# -----------------------------
async def call_gemini_price(image_path: str) -> float:
    """Send image to Gemini API using the NEW google-genai SDK."""

    client = Client(api_key=settings.GEMINI_API_KEY)

    prompt = (
        "Estimate the price in Nigerian Naira (₦) of one piece of the plastic item shown "
        "in the image. Provide ONLY the numeric value."
    )

    with open(image_path, "rb") as f:
        image_bytes = f.read()

    # NEW WORKING SDK CALL
    response = client.models.generate_content(
        model=settings.GEMINI_MODEL,
        contents=[
            {
                "role": "user",
                "parts": [
                    {
                        "inline_data": {
                            "mime_type": "image/jpeg",
                            "data": image_bytes
                        }
                    },
                    {"text": prompt}
                ]
            }
        ]
    )

    # Extract raw output text
    text = response.text.strip()

    # Extract numeric price
    match = re.search(r"(\d+(\.\d+)?)", text.replace(",", ""))
    if not match:
        raise HTTPException(
            status_code=500,
            detail=f"Could not parse numeric value from Gemini response: '{text}'"
        )

    return float(match.group(1))


# -----------------------------
# Endpoints
# -----------------------------
@router.post("/estimate", response_model=PlasticCalculationResponse)
async def estimate_plastic(
    user_id: int = Form(...),
    image: UploadFile = File(...),
    quantity: int = Form(...),
    db: Session = Depends(get_db)
):
    # Save image locally
    path = save_upload(image)

    # Predict price using Gemini
    unit_price = await call_gemini_price(path)

    # Compute total earnings
    total_price = unit_price * quantity

    # Save transaction in database
    earning = PlasticEarning(
        user_id=user_id,
        plastic_name="Detected plastic item",
        unit_price=unit_price,
        quantity=quantity,
        total_price=total_price
    )
    db.add(earning)
    db.commit()
    db.refresh(earning)

    # Return response to user
    return PlasticCalculationResponse(
        plastic_name="Detected plastic item",
        unit_price=unit_price,
        quantity=quantity,
        total_price=total_price
    )


@router.get("/earnings/{user_id}")
def get_user_earnings(user_id: int, db: Session = Depends(get_db)):
    from sqlalchemy import func

    total = (
        db.query(func.sum(PlasticEarning.total_price))
        .filter(PlasticEarning.user_id == user_id)
        .scalar() or 0
    )

    return {"user_id": user_id, "total_earnings": total}
