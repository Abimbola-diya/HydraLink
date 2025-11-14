# app/models/user_earnings.py
from sqlalchemy import Column, Integer, Float, String, ForeignKey
from app.core.database import Base

class PlasticEarning(Base):
    __tablename__ = "plastic_earnings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)           # Which user
    plastic_name = Column(String(255), nullable=False)  # Detected plastic item
    unit_price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)
    total_price = Column(Float, nullable=False)
