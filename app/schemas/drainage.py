from pydantic import BaseModel

class DrainageBase(BaseModel):
    name: str
    latitude: float
    longitude: float
    distance: float | None = None
    health_index: int
    status: str
    flow_rate:float
    water_level:float

class DrainageOut(DrainageBase):
    id: int

    class Config:
        orm_mode = True
