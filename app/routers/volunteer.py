from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.volunteer import VolunteerGroup
from app.schemas.volunteer import VolunteerGroupBase, VolunteerGroupOut
from app.models.drainage import Drainage

router = APIRouter(prefix="/volunteer", tags=["Volunteer"])

# Create mock volunteer group for a drainage
@router.post("/create", response_model=VolunteerGroupOut)
def create_volunteer_group(data: VolunteerGroupBase, db: Session = Depends(get_db)):
    group = VolunteerGroup(**data.dict())
    db.add(group)
    db.commit()
    db.refresh(group)
    return group

# List volunteer groups for drainages at risk
@router.get("/available", response_model=list[VolunteerGroupOut])
def get_available_volunteer_groups(db: Session = Depends(get_db)):
    # Find drainages with low health index
    at_risk_drainages = db.query(Drainage).filter(Drainage.health_index < 50).all()
    if not at_risk_drainages:
        return []

    # Get volunteer groups for these drainages
    drainage_ids = [d.id for d in at_risk_drainages]
    groups = db.query(VolunteerGroup).filter(VolunteerGroup.drainage_id.in_(drainage_ids)).all()
    return groups
