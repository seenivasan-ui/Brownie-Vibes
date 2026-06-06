from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum

class Category(str, Enum):
    brownies = "brownies"
    cakes    = "cakes"
    cream    = "cream"
    drip     = "drip"
    custom   = "custom"
    cookies  = "cookies"
    donuts   = "donuts"
    savory   = "savory"

class MenuItemCreate(BaseModel):
    name:        str
    description: str
    price:       float
    category:    Category
    emoji:       str  = "🍰"
    image:       Optional[str] = None
    badge:       Optional[str] = ""
    tags:        List[str]     = []
    available:   bool          = True

class MenuItemUpdate(BaseModel):
    name:        Optional[str]   = None
    description: Optional[str]   = None
    price:       Optional[float] = None
    category:    Optional[Category] = None
    emoji:       Optional[str]   = None
    image:       Optional[str]   = None
    badge:       Optional[str]   = None
    tags:        Optional[List[str]] = None
    available:   Optional[bool]  = None

class MenuItem(MenuItemCreate):
    id: str

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type:   str = "bearer"
    role:         str = "owner"

class OrderItem(BaseModel):
    id:    str
    name:  str
    price: float
    qty:   int
    emoji: str

class OrderCreate(BaseModel):
    customer_name:  Optional[str] = None
    customer_phone: Optional[str] = None
    items:          List[OrderItem]
    total:          float
    notes:          Optional[str] = None
    delivery_area:  str = "Tamil Nadu"

class Order(OrderCreate):
    id:         str
    status:     str
    created_at: str
