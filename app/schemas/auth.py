from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    username: str
    email: EmailStr

class LoginResponse(BaseModel):
    message: str
    username: str
    email: EmailStr
