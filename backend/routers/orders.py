from fastapi import APIRouter, HTTPException
from typing import List
from core.database import get_db
from models.schemas import Order, OrderCreate
from datetime import datetime
import uuid

router = APIRouter()

@router.get("/", response_model=List[Order])
async def get_all():
    db     = get_db()
    orders = await db.orders.find().sort("created_at", -1).to_list(500)
    return orders

@router.post("/", response_model=Order, status_code=201)
async def create(order: OrderCreate):
    db  = get_db()
    doc = order.dict()
    doc["id"]         = str(uuid.uuid4())[:8]
    doc["status"]     = "pending"
    doc["created_at"] = datetime.utcnow().isoformat()
    await db.orders.insert_one(doc)
    return doc

@router.put("/{order_id}/status")
async def update_status(order_id: str, status: str):
    db      = get_db()
    allowed = ["pending","confirmed","preparing","ready","delivered","cancelled"]
    if status not in allowed:
        raise HTTPException(400, f"Status must be one of: {allowed}")
    await db.orders.update_one({"id": order_id}, {"$set": {"status": status}})
    return {"message": "Status updated"}
