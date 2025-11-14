from sqlalchemy import Column, Integer, String, Float
from app.core.database import Base

class Drainage(Base):
    __tablename__ = "drainages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    distance = Column(Float, nullable=True)  # pre-calculated
    health_index = Column(Integer, nullable=False)
    status = Column(String(20), nullable=False)  # green, yellow, red
    flow_rate=Column(Float,nullable=False)
    water_level=Column(Float,nullable=False)
