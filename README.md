# 🍫 Brownie Vibes – Full-Stack Website

**Tech Stack:** Next.js 14 (Frontend) + FastAPI (Backend) + MongoDB (Database)

---

## 📁 Project Structure

```
brownie-vibes/
├── frontend/          ← Next.js 14 app (React, Tailwind, Framer Motion)
│   ├── app/           ← Pages (home, admin, about)
│   ├── components/    ← Reusable UI components
│   ├── lib/           ← Zustand store + API helpers
│   ├── public/images/ ← Your real photos (Monisha, shop, cakes)
│   └── styles/        ← Global CSS
├── backend/           ← FastAPI Python API
│   ├── main.py        ← App entry point
│   ├── routers/       ← menu.py, orders.py, auth.py
│   ├── models/        ← Pydantic schemas
│   └── core/          ← MongoDB connection + seeder
├── nginx/             ← Reverse proxy config (for VPS deploy)
├── docker-compose.yml ← Run everything with one command
└── .env.example       ← Copy this to .env and fill in your values
```

---

## 🔑 Credentials

### Customer (no login needed)
- Browse menu, add to cart, order via WhatsApp — no login required

### Owner / Monisha (Dashboard access)
- URL: `http://localhost:3000/admin`
- **Username:** `monisha`
- **Password:** `brownievibes@2025`
- ⚠️ Change this in `.env` before deploying!

---

## 🚀 How to Run Locally

### Option A — Docker (Easiest, one command)
```bash
# 1. Install Docker Desktop (https://docker.com/get-started)
# 2. Clone/download this project
cd brownie-vibes

# 3. Copy env file
cp .env.example .env

# 4. Start everything
docker-compose up --build

# Website: http://localhost:3000
# API:     http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Option B — Manual (No Docker)

**Backend (FastAPI)**
```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --port 8000
```

**Frontend (Next.js)**
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
# Visit http://localhost:3000
```

**MongoDB** — Install from https://mongodb.com/try/download/community
or use free MongoDB Atlas cloud: https://cloud.mongodb.com

---

## ☁️ Free Cloud Deployment

### Frontend → Vercel (FREE, auto-deploy on git push)
```bash
# 1. Push to GitHub
# 2. Go to vercel.com → Import project
# 3. Set environment variable:
#    NEXT_PUBLIC_API_URL = https://your-backend.onrender.com
# 4. Deploy! Auto-redeploys on every git push
```

### Backend → Render (FREE)
```bash
# 1. Go to render.com → New Web Service
# 2. Connect your GitHub repo
# 3. Root Directory: backend
# 4. Build Command: pip install -r requirements.txt
# 5. Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
# 6. Add env variables from .env
# 7. Deploy!
```

### MongoDB → MongoDB Atlas (FREE 512MB)
```bash
# 1. Go to cloud.mongodb.com → Create Free Cluster
# 2. Get connection string
# 3. Add to Render env: MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net
```

---

## 🔄 How to Update Prices / Menu (Real-time)

### Method 1 — Owner Dashboard (No coding!)
1. Go to `yourdomain.com/admin`
2. Login as Monisha
3. Edit price, save — **instantly live**

### Method 2 — GitHub Commit (For devs)
```bash
# Edit frontend/lib/api.ts → DEFAULT_MENU array
# Commit and push:
git add .
git commit -m "Update brownie price to ₹15"
git push origin main
# Vercel auto-deploys in ~60 seconds ✅
```

---

## 📱 How Orders Work

1. Customer browses menu → adds to cart
2. Clicks "Order via WhatsApp"
3. Pre-filled WhatsApp message opens with full order details + total
4. **Monisha receives it on WhatsApp (98429 16379)**
5. She confirms and processes the order

No payment gateway needed — simple and direct!

---

## 🛠️ Tech Stack Details

| Layer | Tech | Why |
|-------|------|-----|
| Frontend | Next.js 14 | SEO, fast, React |
| Styling | Tailwind CSS | Rapid, consistent |
| Animations | Framer Motion | Smooth, pro-grade |
| State | Zustand | Cart, auth |
| Backend | FastAPI (Python) | Fast, simple |
| Database | MongoDB | Flexible menu schema |
| Auth | JWT tokens | Secure owner login |
| Deploy | Vercel + Render | Free tier |

---

## 📞 Support
- WhatsApp: 98429 16379
- Instagram: @_brownie_vibes_
