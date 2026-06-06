from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from core.database import connect_db, disconnect_db
from routers import menu, auth, orders

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    yield
    await disconnect_db()

app = FastAPI(
    title="Brownie Vibes API",
    description="Backend for Brownie Vibes Cafe, Trichy, Tamil Nadu",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://brownievibes.in",
        "https://brownie-vibes.vercel.app",
        "*",          # tighten this in production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(menu.router,   prefix="/api/menu",   tags=["Menu"])
app.include_router(auth.router,   prefix="/api/auth",   tags=["Auth"])
app.include_router(orders.router, prefix="/api/orders", tags=["Orders"])

@app.get("/")
async def root():
    return {"message": "🍫 Brownie Vibes API running!", "status": "ok"}

@app.get("/health")
async def health():
    return {"status": "healthy"}
