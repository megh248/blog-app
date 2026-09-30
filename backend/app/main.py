from fastapi import FastAPI
from app.routes.blogs import router as blogs_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(blogs_router)
origins = [
    "http://localhost:3000",  # Popular React/Next.js port
    "http://localhost:5173",  # Popular Vite (Vue/React) port
    "https://yourproductionapp.com"  # Your live frontend domain
]

# 2. Add CORSMiddleware to your application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from specific domains
    allow_credentials=True,  # Allows cookies and credentials
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all request headers
)


@app.get("/")
def root():
    return {"message": "Blog API is running, CORS also enabled"}
