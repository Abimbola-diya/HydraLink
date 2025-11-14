from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base

class VolunteerGroup(Base):
    __tablename__ = "volunteer_groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    contact_info = Column(String(255), nullable=True)
    drainage_id = Column(Integer, nullable=False)  # the drainage they focus on
