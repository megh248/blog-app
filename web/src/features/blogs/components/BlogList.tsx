import type { BlogListProps } from "../types/blogTypes";
import { BlogCard } from "./BlogCard";

export const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};