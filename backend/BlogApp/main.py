from typing import Annotated

from pydantic import BaseModel, Field

import models
from fastapi.params import Depends
from sqlalchemy.orm import Session
from fastapi import FastAPI, HTTPException, Path
from database import engine, SessionLocal
from starlette import status

app = FastAPI()

models.Blogs.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


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
            }
        }
    }


@app.get("/", status_code=status.HTTP_200_OK)
async def read_all(db: db_dependency):
    return db.query(models.Blogs).all()


@app.get("/blogs/{blog_id}", status_code=status.HTTP_200_OK)
async def read_blog(db: db_dependency, blog_id: int = Path(gt=0)):
    blog_model = db.query(models.Blogs).filter(models.Blogs.id == blog_id).first()
    if blog_model is not None:
        return blog_model
    raise HTTPException(status_code=404, detail="Blog not found")


@app.post("/blogs", status_code=status.HTTP_201_CREATED)
async def create_blog(db: db_dependency, blog: BlogRequest):
    blog_model = models.Blogs(**blog.dict())
    db.add(blog_model)
    db.commit()


@app.put("/blogs/{blog_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_blog(db: db_dependency, blog: BlogRequest, blog_id: int = Path(gt=0)):
    blog_model = db.query(models.Blogs).filter(models.Blogs.id == blog_id).first()
    if blog_model is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    blog_model.title = blog.title
    blog_model.description = blog.description
    blog_model.content = blog.content
    blog_model.category = blog.category
    db.add(blog_model)
    db.commit()


@app.delete("/blogs/{blog_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_blog(db: db_dependency, blog_id: int = Path(gt=0)):
    blog_model = db.query(models.Blogs).filter(models.Blogs.id == blog_id).first()
    if blog_model is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    db.delete(blog_model)
    db.commit()