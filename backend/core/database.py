import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME   = os.getenv("DB_NAME", "brownie_vibes")

client = None
db     = None

SEED_MENU = [
    {"id":"1","name":"Classic Fudge Brownie","description":"Dense, gooey, OG Brownie Vibes recipe – the one that started it all.","price":10,"category":"brownies","emoji":"🍫","image":"/images/cake1.jpg","badge":"bestseller","tags":["Homemade","Fudgy","Chocolate"],"available":True},
    {"id":"2","name":"Dark Chocolate Brownie","description":"Intense 70% dark chocolate for the true chocoholic.","price":30,"category":"brownies","emoji":"🖤","image":"/images/cake2.jpg","badge":"","tags":["Dark","Rich"],"available":True},
    {"id":"3","name":"Nutella Swirl Brownie","description":"Fudgy brownie with a gorgeous Nutella ribbon swirled through.","price":45,"category":"brownies","emoji":"🌀","image":"/images/cake3.jpg","badge":"trending","tags":["Nutella","Swirl"],"available":True},
    {"id":"4","name":"Cream Cheese Brownie","description":"Dense brownie topped with a silky cream cheese layer.","price":50,"category":"brownies","emoji":"🧀","image":"/images/cake4.jpg","badge":"","tags":["Cream","Cheesy"],"available":True},
    {"id":"5","name":"Chocolate Drip Birthday Cake","description":"Spectacular cascading chocolate drip over layers of moist sponge.","price":650,"category":"drip","emoji":"🎂","image":"/images/cake5.jpg","badge":"bestseller","tags":["Drip","Birthday","Chocolate"],"available":True},
    {"id":"6","name":"Cream Overflow Cake (0.5kg)","description":"Luscious cream cascading over the edges – pure indulgence.","price":450,"category":"cream","emoji":"🍦","image":"/images/cake1.jpg","badge":"trending","tags":["Cream","Cascade","Birthday"],"available":True},
    {"id":"7","name":"Custom Theme Cake (0.5kg)","description":"Fully personalized – you dream it, Monisha bakes it.","price":500,"category":"custom","emoji":"🎨","image":"/images/cake2.jpg","badge":"custom","tags":["Custom","Personalized"],"available":True},
    {"id":"8","name":"Red Velvet Cake (1kg)","description":"Classic red velvet with smooth cream cheese frosting.","price":850,"category":"cakes","emoji":"❤️","image":"/images/cake3.jpg","badge":"","tags":["Red Velvet","Cream Cheese"],"available":True},
    {"id":"9","name":"Butterscotch Cake (0.5kg)","description":"Light, fluffy butterscotch sponge with crunchy praline topping.","price":400,"category":"cakes","emoji":"🍰","image":"/images/cake4.jpg","badge":"","tags":["Butterscotch","Praline"],"available":True},
    {"id":"10","name":"Choco-Chip Cookie","description":"Crispy edges, chewy centre, loaded with chocolate chips.","price":30,"category":"cookies","emoji":"🍪","image":"/images/cake5.jpg","badge":"","tags":["Cookie","Crispy"],"available":True},
    {"id":"11","name":"Glazed Donut","description":"Soft fluffy donuts with sugar glaze. Pick your flavour!","price":40,"category":"donuts","emoji":"🍩","image":"/images/cake1.jpg","badge":"trending","tags":["Donut","Glazed"],"available":True},
    {"id":"12","name":"Mini Pizza","description":"Loaded mini pizzas with guaranteed cheese pull.","price":120,"category":"savory","emoji":"🍕","image":"/images/cake2.jpg","badge":"","tags":["Pizza","Savory"],"available":True},
    {"id":"13","name":"Mini Burger (2 pcs)","description":"Bite-sized burgers with juicy patty and fresh veggies.","price":80,"category":"savory","emoji":"🍔","image":"/images/cake3.jpg","badge":"","tags":["Burger","Savory"],"available":True},
]

async def connect_db():
    global client, db
    client = AsyncIOMotorClient(MONGO_URL)
    db     = client[DB_NAME]
    count  = await db.menu.count_documents({})
    if count == 0:
        await db.menu.insert_many(SEED_MENU)
        print(f"🌱 Seeded {len(SEED_MENU)} menu items")
    print(f"✅ MongoDB connected: {DB_NAME}")

async def disconnect_db():
    if client:
        client.close()
        print("🔌 MongoDB disconnected")

def get_db():
    return db
