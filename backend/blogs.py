from typing import Optional
from fastapi import FastAPI, Path, Query, HTTPException
from pydantic import BaseModel, Field
from starlette import status

app = FastAPI()
MOCK_BLOGS = [
    {
        "id": 1,
        "title": "Understanding React Server State",
        "description": "A practical guide to managing server state in modern React applications.",
        "author": "Megh Buch",
        "content": "Server state is data that comes from an external source such as an API or database. Libraries like TanStack Query make fetching, caching, loading states, and refetching easier.",
        "category": "React",
        "created_at": 2025,
    },
    {
        "id": 2,
        "title": "Getting Started with Python",
        "description": "Learning Python fundamentals while building a real-world application.",
        "author": "Megh Buch",
        "content": "Python is a beginner-friendly programming language widely used for web development, automation, data analysis, and scripting. Building small applications is a great way to understand Python fundamentals.",
        "category": "Python",
        "created_at": 2025,
    },
    {
        "id": 3,
        "title": "Building Better Frontend Architecture",
        "description": "Practical ideas for structuring scalable and maintainable frontend applications.",
        "author": "Megh Buch",
        "content": "A well-structured frontend application becomes easier to maintain as the codebase grows. Separating components, business logic, API services, and utilities helps keep responsibilities clear.",
        "category": "Frontend",
        "created_at": 2025,
    },
    {
        "id": 4,
        "title": "TypeScript Tips for React Developers",
        "description": "Useful TypeScript practices for writing safer and more maintainable React applications.",
        "author": "Megh Buch",
        "content": "TypeScript can make React applications easier to maintain by providing type safety for props, API responses, hooks, and application state. Strong typing also helps catch many errors during development.",
        "category": "TypeScript",
        "created_at": 2025,
    },
    {
        "id": 5,
        "title": "Improving React Application Performance",
        "description": "Practical techniques for improving the performance of modern React applications.",
        "author": "Megh Buch",
        "content": "React applications can benefit from techniques such as code splitting, lazy loading, memoization, efficient rendering, and optimized API requests. Performance should be measured before introducing unnecessary optimizations.",
        "category": "Performance",
        "created_at": 2025,
    }
]


class Blog:
    id: int
    title: str
    description: str
    author: str
    content: str
    category: str
    created_at: int

    def __init__(self, id: int, title: str, description: str, author: str, content: str, category: str,
                 created_at: int):
        self.id = id
        self.title = title
        self.description = description
        self.author = author
        self.content = content
        self.category = category
        self.created_at = created_at


class BlogRequest(BaseModel):
    id: Optional[int] = Field(description="ID not required on create", default=None)
    title: str = Field(min_length=3)
    description: str = Field(min_length=1, max_length=100)
    author: str = Field(min_length=1)
    content: str = Field(min_length=1)
    category: str = Field(min_length=1)
    created_at: int = Field(gt=1999, lt=2099)

    model_config = {
        "json_schema_extra": {
            "example": {
                "title": "New blog title",
                "description": "New blog description",
                "author": "Author of blog",
                "content": "Content of blog",
                "category": "Category of blog",
                "created_at": "0610",
            }
        }
    }


BLOGS = [Blog(**blog) for blog in MOCK_BLOGS]


@app.get("/")
def read_root():
    return "Welcome to the Blogs API!"


@app.get("/blogs", status_code=status.HTTP_200_OK)
async def read_all_blogs():
    return BLOGS


@app.get("/blogs/{blog_id}", status_code=status.HTTP_200_OK)
async def read_blog_by_id(blog_id: int = Path(gt=0)):
    for blog in BLOGS:
        if blog.id == blog_id:
            return blog
    raise HTTPException(status_code=404, detail="Blog not found")


@app.get("/blogs/", status_code=status.HTTP_200_OK)
async def read_blog_by_created_at(created_at=Query(gt=1999, lt=2099)):
    blogs = []
    for blog in BLOGS:
        if int(created_at) == int(blog.created_at):
            blogs.append(blog)
    return blogs


@app.post("/create-blog", status_code=status.HTTP_201_CREATED)
async def create_blog(blog: BlogRequest):
    new_blog = Blog(**blog.model_dump())
    BLOGS.append(find_blog_id(new_blog))


def find_blog_id(blog: Blog):
    if len(BLOGS) > 0:
        blog.id = BLOGS[-1].id + 1
    else:
        blog.id = 1
    return blog


@app.put("/blogs/", status_code=status.HTTP_204_NO_CONTENT)
async def update_blog(blog: BlogRequest):
    blog_changed = False
    for i in range(len(BLOGS)):
        if BLOGS[i].id == blog.id:
            BLOGS[i] = blog
            blog_changed = True

    if blog_changed == False:
        raise HTTPException(status_code=404, detail="Blog not found")


@app.delete("/blogs/{blog_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_blog(blog_id: int = Path(gt=0)):
    blog_deleted = False
    for i in range(len(BLOGS)):
        if BLOGS[i].id == blog_id:
            BLOGS.pop(i)
            blog_deleted = True
            break

    if not blog_deleted:
        raise HTTPException(status_code=404, detail="Blog not found")
