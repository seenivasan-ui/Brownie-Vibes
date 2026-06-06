from fastapi import APIRouter, HTTPException
from typing import List, Optional
from core.database import get_db
from models.schemas import MenuItem, MenuItemCreate, MenuItemUpdate
import uuid

router = APIRouter()

@router.get("/", response_model=List[MenuItem])
async def get_all(category: Optional[str] = None):
    db    = get_db()
    query = {"category": category} if category else {}
    items = await db.menu.find(query).to_list(200)
    return items

@router.post("/", response_model=MenuItem, status_code=201)
async def create(item: MenuItemCreate):
    db  = get_db()
    doc = item.dict()
    doc["id"] = str(uuid.uuid4())[:8]
    await db.menu.insert_one(doc)
    return doc

@router.put("/{item_id}", response_model=MenuItem)
async def update(item_id: str, update: MenuItemUpdate):
    db   = get_db()
    data = {k: v for k, v in update.dict().items() if v is not None}
    res  = await db.menu.update_one({"id": item_id}, {"$set": data})
    if res.matched_count == 0:
        raise HTTPException(404, "Item not found")
    return await db.menu.find_one({"id": item_id})

@router.delete("/{item_id}")
async def delete(item_id: str):
    db  = get_db()
    res = await db.menu.delete_one({"id": item_id})
    if res.deleted_count == 0:
        raise HTTPException(404, "Item not found")
    return {"message": "Deleted"}
