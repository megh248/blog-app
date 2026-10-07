from database import base
from sqlalchemy import Column, Integer,String

class Blogs(base):
    __tablename__ = "blog"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(String)
    description = Column(String)
    category = Column(String)
