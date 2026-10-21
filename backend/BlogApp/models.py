from database import base
from sqlalchemy import Column, Integer, String,ForeignKey, Boolean


class Users(base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String,unique=True)
    email = Column(String, unique=True)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean,default=True)
    role = Column(String)

class Blogs(base):
    __tablename__ = "blogs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(String)
    description = Column(String)
    category = Column(String)
    author = Column(Integer, ForeignKey("users.id"))
