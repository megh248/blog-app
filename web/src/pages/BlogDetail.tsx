import { useParams } from "react-router-dom";
import { mockBlogs } from "../features/blogs/data/mockBlogs";
import type { Blog } from "../features/blogs/types/blogTypes";

export const BlogDetails = () => {
  const { id } = useParams();

  const getInitials = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  if (!id)
    return (
      <section>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl dark:text-white">
          Blog not found !
        </h1>
      </section>
    );

  const blog = mockBlogs.find((blog: Blog) => blog.id === Number(id));

  if (!blog) {
    return (
      <section>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl dark:text-white">
          Blog not found !
        </h1>
      </section>
    );
  }
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:py-20">
        <div className="mb-5">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            {blog.category}
          </span>
        </div>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl dark:text-white">
          {blog.title}
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          {blog.description}
        </p>

        <hr className="mb-8 border-gray-200 dark:border-gray-700" />
        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white dark:bg-white dark:text-gray-900">
            {getInitials(blog.author)}
          </div>

          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {blog.author}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Frontend Developer · 5 min read
            </p>
          </div>
        </div>
        <article className="text-lg leading-8 text-gray-700 dark:text-gray-300">
          {blog.content}
        </article>
      </div>
    </section>
  );
};
