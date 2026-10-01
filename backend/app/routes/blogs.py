from datetime import datetime
from fastapi import APIRouter, HTTPException, status

from app.schemas.blog import BlogResponse, BlogCreate, BlogUpdate

# Import your schemas from above here

router = APIRouter(prefix="/blogs", tags=["Blogs"])

MOCK_BLOGS = [
    {
        "id": 1,
        "title": "Understanding React Server State",
        "description": "A practical guide to managing server state...",
        "author": "Megh Buch",
        "content": "Server state is data that comes from...",
        "category": "React",
        "created_at": datetime.now()
    },
    # ... your other mock blogs here (add a "created_at" field to match schema)
]


# --- READ ALL ---
@router.get("", response_model=list[BlogResponse])
async def get_blogs():
    return MOCK_BLOGS


# --- READ ONE ---
@router.get("/{blog_id}", response_model=BlogResponse)
async def get_blog_by_id(blog_id: int):
    for blog in MOCK_BLOGS:
        if blog["id"] == blog_id:
            return blog
    raise HTTPException(status_code=404, detail="Blog not found")


# --- CREATE ---
@router.post("", response_model=BlogResponse, status_code=status.HTTP_201_CREATED)
async def create_blog(blog_input: BlogCreate):
    # Auto-generate a new ID
    new_id = max([b["id"] for b in MOCK_BLOGS], default=0) + 1

    # Convert Pydantic object to dict and add system fields
    new_blog = blog_input.model_dump()
    new_blog["id"] = new_id
    new_blog["created_at"] = datetime.now()

    MOCK_BLOGS.append(new_blog)
    return new_blog


# --- UPDATE (PATCH) ---
@router.patch("/{blog_id}", response_model=BlogResponse)
async def update_blog(blog_id: int, blog_input: BlogUpdate):
    for blog in MOCK_BLOGS:
        if blog["id"] == blog_id:
            # Extract only fields that the client explicitly sent
            update_data = blog_input.model_dump(exclude_unset=True)

            # Apply changes to the mock dictionary item
            for key, value in update_data.items():
                blog[key] = value

            return blog

    raise HTTPException(status_code=404, detail="Blog not found")


# --- DELETE ---
@router.delete("/{blog_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_blog(blog_id: int):
    for index, blog in enumerate(MOCK_BLOGS):
        if blog["id"] == blog_id:
            MOCK_BLOGS.pop(index)
            return  # HTTP 204 does not return content

    raise HTTPException(status_code=404, detail="Blog not found")
