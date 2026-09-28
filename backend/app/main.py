from fastapi import FastAPI
from app.routes.blogs import router as blogs_router
app = FastAPI()

app.include_router(blogs_router)


@app.get("/")
def root():
    return {"message": "Blog API is running"}