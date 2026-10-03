from datetime import datetime

from fastapi import APIRouter, HTTPException, status

from app.schemas.blog import BlogResponse, BlogCreate, BlogUpdate


router = APIRouter(prefix="/blogs", tags=["Blogs"])


MOCK_BLOGS = [
    {
        "id": 1,
        "title": "Understanding React Server State",
        "description": "A practical guide to managing server state...",
        "author": "Megh Buch",
        "content": "Server state is data that comes from...",
        "category": "React",
        "created_at": datetime.now(),
    },
]


# READ ALL
@router.get("", response_model=list[BlogResponse])
async def get_blogs():
    try:
        return MOCK_BLOGS

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch blogs",
        )


# READ ONE
@router.get("/{blog_id}", response_model=BlogResponse)
async def get_blog_by_id(blog_id: int):
    try:
        for blog in MOCK_BLOGS:
            if blog["id"] == blog_id:
                return blog

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog not found",
        )

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch blog",
        )


# CREATE
@router.post(
    "",
    response_model=BlogResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_blog(blog_input: BlogCreate):
    try:
        new_id = max(
            [blog["id"] for blog in MOCK_BLOGS],
            default=0,
        ) + 1

        new_blog = blog_input.model_dump()

        new_blog["id"] = new_id
        new_blog["created_at"] = datetime.now()

        MOCK_BLOGS.append(new_blog)

        return new_blog

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create blog",
        )


# UPDATE
@router.patch("/{blog_id}", response_model=BlogResponse)
async def update_blog(blog_id: int, blog_input: BlogUpdate):
    try:
        for blog in MOCK_BLOGS:
            if blog["id"] == blog_id:

                update_data = blog_input.model_dump(
                    exclude_unset=True
                )

                for key, value in update_data.items():
                    blog[key] = value

                return blog
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog not found",
        )

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update blog",
        )


# DELETE
@router.delete(
    "/{blog_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_blog(blog_id: int):
    try:
        for index, blog in enumerate(MOCK_BLOGS):
            if blog["id"] == blog_id:
                MOCK_BLOGS.pop(index)
                return

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog not found",
        )

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete blog",
        )
