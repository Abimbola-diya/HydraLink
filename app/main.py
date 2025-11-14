from fastapi import FastAPI
from app.core.database import Base, engine
from app.routers import auth, drainage,alerts,volunteer,plastic_valuation
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="HydraLink API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Create tables automatically
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth.router)
app.include_router(drainage.router)
app.include_router(alerts.router)
app.include_router(volunteer.router)
app.include_router(plastic_valuation.router)





