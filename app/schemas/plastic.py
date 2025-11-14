from pydantic import BaseModel

class PlasticCalculationResponse(BaseModel):
    plastic_name: str
    unit_price: float
    quantity: int
    total_price: float
