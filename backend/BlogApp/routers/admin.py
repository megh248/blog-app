from typing import Annotated

from pydantic import BaseModel, Field
import models
from fastapi.params import Depends
from sqlalchemy.orm import Session
from fastapi import FastAPI, HTTPException, Path, APIRouter
from database import engine, SessionLocal

from sqlalchemy.sql.functions import user
from starlette import status
from .auth import get_current_user

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


@router.get("/blogs", status_code=status.HTTP_200_OK)
async def read_all(user: user_dependency, db: db_dependency):
    if user is None or user.get("user_role") != "admin":
        raise HTTPException(status_code=401, detail="Unauthorized")
    return db.query(models.Blogs).all()


@router.delete("/blogs/{blog_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_blog(user: user_dependency, blog_id: int, db: db_dependency):
    if user_dependency is None or user.get("user_role") != "admin":
        raise HTTPException(status_code=401, detail="Unauthorized")
    blog_model = db.query(models.Blogs).filter(models.Blogs.id == blog_id).first()
    if blog_model is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    db.query(models.Blogs).filter(models.Blogs.id == blog_id).filter(
        models.Blogs.author == user.get("user_id")).delete()
    db.delete(blog_model)
    db.commit()
