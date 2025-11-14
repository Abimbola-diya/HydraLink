from fastapi import APIRouter
from app.schemas.auth import LoginRequest, LoginResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=LoginResponse)
def login(data: LoginRequest):
    """
    Professional-looking login endpoint.
    No password required for hackathon demo.
    """
    return LoginResponse(
        message="Login successful.",
        username=data.username,
        email=data.email
    )
