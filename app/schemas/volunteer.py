from pydantic import BaseModel

class VolunteerGroupBase(BaseModel):
    name: str
    contact_info: str | None = None
    drainage_id: int

class VolunteerGroupOut(VolunteerGroupBase):
    id: int

    class Config:
        orm_mode = True
