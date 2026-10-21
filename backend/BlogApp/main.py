from typing import Annotated
import models
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Path
from database import engine
from routers import auth, blogs, admin, users

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
models.Blogs.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(blogs.router)
app.include_router(admin.router)
app.include_router(users.router)
