/* eslint-disable react-hooks/set-state-in-effect */
import { useParams } from "react-router-dom";
import type { Blog } from "../features/blogs/types/blogTypes";
import { useCallback, useEffect, useState } from "react";
import { fetchBlog } from "../lib/api/blogs";

export const BlogDetails = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState<Blog>();
  const [isLoading, setIsLoading] = useState(true);

  const handleFetchBlogDetails = useCallback(async () => {
    try {
      const blog = await fetchBlog(id);
      console.log(blog);
      setBlogData(blog);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    handleFetchBlogDetails();
  }, [handleFetchBlogDetails]);

  const getInitials = (name: string = "") => {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };
  console.log(isLoading, blogData);
  if (isLoading && !blogData) {
    return (
      <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl dark:text-white">
        Fetching blog data
      </h1>
    );
  }
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:py-20">
        <div className="mb-5">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            {blogData?.category}
          </span>
        </div>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl dark:text-white">
          {blogData?.title}
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          {blogData?.description}
        </p>

        <hr className="mb-8 border-gray-200 dark:border-gray-700" />
        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white dark:bg-white dark:text-gray-900">
            {getInitials(blogData?.author)}
          </div>

          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {blogData?.author}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Frontend Developer · 5 min read
            </p>
          </div>
        </div>
        <article className="text-lg leading-8 text-gray-700 dark:text-gray-300">
          {blogData?.content}
        </article>
      </div>
    </section>
  );
};
