import { useState } from "react";
import type { BlogListProps } from "../types/blogTypes";
import { BlogCard } from "./BlogCard";
import { Skeleton } from "../../../components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "../../../components/ui/card";

export function BlogCardSkeleton() {
  return (
    <Card className="my-8">
      <CardHeader>
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>

      {/* Description (matches pl-4 padding from original) */}
      <CardDescription className="pl-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardDescription>

      {/* Author Content */}
      <CardContent className="mt-4">
        <Skeleton className="h-4 w-32" />
      </CardContent>

      {/* Footer Button */}
      <CardFooter>
        <Skeleton className="h-10 w-28 rounded-md" />
      </CardFooter>
    </Card>
  );
}

export const BlogList = ({ blogs }: BlogListProps) => {
  const [showBlogs, setShowBlogs] = useState(false);

  setTimeout(() => {
    setShowBlogs(true);
  }, 1000);
  if (!showBlogs || !blogs.length) {
    return (
      <span className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </span>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};
