from typing import Annotated

from pydantic import BaseModel, Field
import models
from fastapi.params import Depends
from sqlalchemy.orm import Session
from fastapi import FastAPI, HTTPException, Path, APIRouter
from database import engine, SessionLocal
from starlette import status
from .auth import get_current_user

router = APIRouter()
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
]


# router.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


class BlogRequest(BaseModel):
    title: str = Field(min_length=3)
    description: str = Field(min_length=1, max_length=100)
    content: str = Field(min_length=1)
    category: str = Field(min_length=1)
    model_config = {
        "json_schema_extra": {
            "example": {
                "title": "New blog title",
                "description": "New blog description",
                "content": "Content of blog",
                "category": "Category of blog",
                "author": "Name of Author"
            }
        }
    }


@router.get("/blogs", status_code=status.HTTP_200_OK)
async def read_all(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    return db.query(models.Blogs).filter(models.Blogs.author == user.get("user_id")).all()


@router.get("/blogs/{blog_id}", status_code=status.HTTP_200_OK)
async def read_blog(user: user_dependency, db: db_dependency, blog_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    blog_model = db.query(models.Blogs).filter(models.Blogs.id == blog_id) \
        .filter(models.Blogs.author == user.get("user_id")).first()
    if blog_model is not None:
        return blog_model
    raise HTTPException(status_code=404, detail="Blog not found")


@router.post("/blogs", status_code=status.HTTP_201_CREATED)
async def create_blog(user: user_dependency, db: db_dependency, blog: BlogRequest):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    blog_model = models.Blogs(**blog.dict(), author=user.get("user_id"))
    db.add(blog_model)
    db.commit()


@router.put("/blogs/{blog_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_blog(user: user_dependency, db: db_dependency, blog: BlogRequest, blog_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    blog_model = db.query(models.Blogs).filter(models.Blogs.id == blog_id).filter(models.Blogs.author == user.get("user_id")).first()
    if blog_model is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    blog_model.title = blog.title
    blog_model.description = blog.description
    blog_model.content = blog.content
    blog_model.category = blog.category
    blog_model.author = user.get("user_id")
    db.add(blog_model)
    db.commit()


@router.delete("/blogs/{blog_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_blog(user: user_dependency,db: db_dependency, blog_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    blog_model = db.query(models.Blogs).filter(models.Blogs.id == blog_id).filter(models.Blogs.author == user.get("user_id")).first()
    if blog_model is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    db.query(models.Blogs).filter(models.Blogs.id == blog_id).filter(models.Blogs.author == user.get("user_id")).delete()
    db.delete(blog_model)
    db.commit()
