from fastapi import FastAPI, Body

app = FastAPI()
MOCK_BLOGS = [
    {
        "id": 1,
        "title": "Understanding React Server State",
        "description": "A practical guide to managing server state in modern React applications.",
        "author": "Megh Buch",
        "content": "Server state is data that comes from an external source such as an API or database. Libraries like TanStack Query make fetching, caching, loading states, and refetching easier.",
        "category": "React",
    },
    {
        "id": 2,
        "title": "Getting Started with Python",
        "description": "Learning Python fundamentals while building a real-world application.",
        "author": "Megh Buch",
        "content": "Python is a beginner-friendly programming language widely used for web development, automation, data analysis, and scripting. Building small applications is a great way to understand Python fundamentals.",
        "category": "Python",
    },
    {
        "id": 3,
        "title": "Building Better Frontend Architecture",
        "description": "Practical ideas for structuring scalable and maintainable frontend applications.",
        "author": "Megh Buch",
        "content": "A well-structured frontend application becomes easier to maintain as the codebase grows. Separating components, business logic, API services, and utilities helps keep responsibilities clear.",
        "category": "Frontend",
    },
    {
        "id": 4,
        "title": "TypeScript Tips for React Developers",
        "description": "Useful TypeScript practices for writing safer and more maintainable React applications.",
        "author": "Megh Buch",
        "content": "TypeScript can make React applications easier to maintain by providing type safety for props, API responses, hooks, and application state. Strong typing also helps catch many errors during development.",
        "category": "TypeScript",
    },
    {
        "id": 5,
        "title": "Improving React Application Performance",
        "description": "Practical techniques for improving the performance of modern React applications.",
        "author": "Megh Buch",
        "content": "React applications can benefit from techniques such as code splitting, lazy loading, memoization, efficient rendering, and optimized API requests. Performance should be measured before introducing unnecessary optimizations.",
        "category": "Performance",
    }
]


@app.get("/")
def read_root():
    return "Welcome to the Blogs API!"


@app.get("/blogs")
def read_all_blogs():
    return MOCK_BLOGS


@app.get("/blogs/")
async def read_blog_by_category_and_title(category: str, book_title: str):
    blogs_to_return = []
    for blog in MOCK_BLOGS:
        if blog.get("category").casefold() == category.casefold() \
                and book_title.casefold() in blog["title"].casefold():
            blogs_to_return.append(blog)
    return blogs_to_return


@app.post("/create_blog")
async def create_blog(new_blog=Body()):
    MOCK_BLOGS.append(new_blog)

@app.put("/update_blog")
async def update_blog(updated_blog=Body()):
    for i in range(len(MOCK_BLOGS)):
        if MOCK_BLOGS[i].get("title").casefold() == updated_blog.get("title").casefold():
            MOCK_BLOGS[i] = updated_blog

@app.delete("/delete_blog/{blog_title}")
async def delete_blog(blog_title: str):
    for i in range(len(MOCK_BLOGS)):
        if MOCK_BLOGS[i].get("title").casefold() == blog_title.casefold():
            MOCK_BLOGS.pop(i)
            break
