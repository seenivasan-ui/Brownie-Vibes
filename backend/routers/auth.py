import os
from fastapi import APIRouter, HTTPException
from jose import jwt
from datetime import datetime, timedelta
from models.schemas import LoginRequest, TokenResponse
from dotenv import load_dotenv

load_dotenv()

router         = APIRouter()
SECRET_KEY     = os.getenv("SECRET_KEY", "change-me-in-production")
ALGORITHM      = "HS256"
OWNER_USERNAME = os.getenv("OWNER_USERNAME", "monisha")
OWNER_PASSWORD = os.getenv("OWNER_PASSWORD", "brownievibes@2025")

def create_token(data: dict, expires_minutes: int = 1440) -> str:
    payload = {**data, "exp": datetime.utcnow() + timedelta(minutes=expires_minutes)}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/login", response_model=TokenResponse)
async def login(req: LoginRequest):
    if req.username != OWNER_USERNAME or req.password != OWNER_PASSWORD:
        raise HTTPException(status_code=401, detail="Incorrect credentials")
    token = create_token({"sub": req.username, "role": "owner"})
    return {"access_token": token, "token_type": "bearer", "role": "owner"}
