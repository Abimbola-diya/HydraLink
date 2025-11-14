from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.drainage import Drainage
from app.schemas.drainage import DrainageBase, DrainageOut

router = APIRouter(prefix="/drainages", tags=["Drainages"])

# Create a drainage
@router.post("/create", response_model=DrainageOut)
def create_drainage(data: DrainageBase, db: Session = Depends(get_db)):
    drainage = Drainage(**data.dict())
    db.add(drainage)
    db.commit()
    db.refresh(drainage)
    return drainage

# Get all drainages
@router.get("/all", response_model=list[DrainageOut])
def get_all_drainages(db: Session = Depends(get_db)):
    return db.query(Drainage).all()

# Get drainage by id
@router.get("/{drainage_id}", response_model=DrainageOut)
def get_drainage(drainage_id: int, db: Session = Depends(get_db)):
    return db.query(Drainage).filter(Drainage.id == drainage_id).first()
