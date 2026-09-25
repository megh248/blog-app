export const mockBlogs = [
  {
    id: 1,
    title: "Understanding React Server State",
    description:
      "A practical guide to managing server state in modern React applications.",
    author: "Megh Buch",
    content:
      "Server state is data that comes from an external source such as an API or database. Unlike local UI state, server state can become stale and usually needs to be fetched again when required. Libraries like TanStack Query make it easier to handle fetching, caching, loading states, and errors. They also provide useful features such as automatic refetching and cache invalidation. Keeping server state separate from local UI state can make React applications easier to understand. A good server-state strategy can also reduce unnecessary API calls and improve application performance. Understanding these concepts becomes especially useful as an application grows.",
    category: "React",
  },

  {
    id: 2,
    title: "Getting Started with Python",
    description:
      "Learning Python fundamentals while building a real-world application.",
    author: "Megh Buch",
    content:
      "Python is a beginner-friendly programming language that is widely used for web development, automation, data analysis, and scripting. Its simple syntax makes it relatively easy to understand when learning programming concepts. Variables, functions, lists, dictionaries, and classes are some of the basic building blocks of Python. Building a small application is a great way to understand how these concepts work together. Python also has a large ecosystem of libraries that can be used to solve different problems. Practicing by writing small programs is often more useful than only reading documentation. With consistent practice, Python can become a powerful addition to a developer's toolkit.",
    category: "Python",
  },

  {
    id: 3,
    title: "Building Better Frontend Architecture",
    description:
      "Some practical ideas for structuring scalable frontend applications.",
    author: "Megh Buch",
    content:
      "A well-structured frontend application becomes much easier to maintain as the codebase grows. Separating components, business logic, API services, and utility functions can help keep responsibilities clear. Reusable components can also reduce duplicated code across different parts of the application. It is important to choose a folder structure that makes it easy for developers to find and understand related files. State management should be introduced based on the actual complexity of the application rather than adding unnecessary tools. Good frontend architecture should also consider performance, testing, and future changes. The goal is to create a codebase that remains understandable even as new features are added.",
    category: "Frontend",
  },
];