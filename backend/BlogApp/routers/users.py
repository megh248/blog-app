
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from starlette import status
from passlib.context import CryptContext

import models
from database import SessionLocal
from .auth import get_current_user

router = APIRouter(
    prefix="/user",
    tags=["user"],
)

bcrypt_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str = Field(min_length=8)


@router.get("/", status_code=status.HTTP_200_OK)
async def get_user(
    user: user_dependency,
    db: db_dependency,
):
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required",
        )

    user_model = (
        db.query(models.Users)
        .filter(models.Users.id == user.get("user_id"))
        .first()
    )

    if user_model is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return {
        "id": user_model.id,
        "username": user_model.username,
        "email": user_model.email,
        "first_name": user_model.first_name,
        "last_name": user_model.last_name,
        "role": user_model.role,
        "is_active": user_model.is_active,
    }


@router.put("/password", status_code=status.HTTP_204_NO_CONTENT)
async def change_password(
    user: user_dependency,
    db: db_dependency,
    request: ChangePasswordRequest,
):
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required",
        )

    user_model = (
        db.query(models.Users)
        .filter(models.Users.id == user.get("user_id"))
        .first()
    )

    if user_model is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    if not bcrypt_context.verify(
        request.current_password,
        user_model.hashed_password,
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect",
        )

    if request.current_password == request.new_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New password must differ from current password",
        )

    user_model.hashed_password = bcrypt_context.hash(
        request.new_password
    )

    db.commit()
