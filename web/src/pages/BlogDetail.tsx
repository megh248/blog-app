/* eslint-disable react-hooks/set-state-in-effect */
import { useParams } from "react-router-dom";
import type { Blog } from "../features/blogs/types/blogTypes";
import { useCallback, useEffect, useState } from "react";
import { fetchBlog } from "../lib/api/blogs";
import { Skeleton } from "../components/ui/skeleton";

export default function BlogSkeleton() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:py-20">
        {/* Category Badge Skeleton */}
        <div className="mb-5">
          <Skeleton className="h-7 w-24 rounded-full" />
        </div>

        {/* Title Skeleton */}
        <div className="mb-6 space-y-3">
          <Skeleton className="h-10 w-full md:h-12" />
          <Skeleton className="h-10 w-4/5 md:h-12" />
        </div>

        {/* Description Skeleton */}
        <div className="mb-8 space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>

        <hr className="mb-8 border-gray-200 dark:border-gray-700" />

        {/* Author Section Skeleton */}
        <div className="mb-10 flex items-center gap-4">
          <Skeleton className="h-11 w-11 rounded-full shrink-0" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>

        {/* Article Body Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-9/12" />
        </div>
      </div>
    </section>
  );
}

export const BlogDetails = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState<Blog>();
  const [isLoading, setIsLoading] = useState(true);

  const handleFetchBlogDetails = useCallback(async () => {
    try {
      const blog = await fetchBlog(id);
      const data = blog && Object.keys(blog).length > 0 ? blog : null;
      setBlogData(data);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
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
  if (isLoading) {
    return <BlogSkeleton />;
  }
  if (blogData && !blogData.title) {
    return (
      <section className="bg-white h-100 mt-50 dark:bg-gray-900">
        <div className="px-4 mx-auto text-center md:max-w-3xl lg:max-w-5xl lg:px-36">
          <span className="font-semibold text-gray-400 uppercase">
            {blogData.detail}
          </span>
        </div>
      </section>
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
