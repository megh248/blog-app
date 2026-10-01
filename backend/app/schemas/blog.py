from datetime import datetime
from pydantic import BaseModel, Field

class BlogBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=150)
    description: str = Field(..., min_length=10, max_length=300)
    content: str = Field(..., min_length=10)
    author: str = Field(..., min_length=2, max_length=50)
    category: str = Field(..., min_length=2, max_length=30)

class BlogCreate(BlogBase):
    pass

class BlogUpdate(BaseModel):
    title: str | None = Field(None, min_length=3, max_length=150)
    description: str | None = Field(None, min_length=10, max_length=300)
    content: str | None = Field(None, min_length=10)
    author: str | None = Field(None, min_length=2, max_length=50)
    category: str | None = Field(None, min_length=2, max_length=30)

class BlogResponse(BlogBase):
    id: int
    created_at: datetime
