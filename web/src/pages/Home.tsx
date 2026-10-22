import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { CategorySection } from "../components/sections/CategorySection";
import { Hero } from "../components/sections/Hero";
import { Input } from "../components/ui/input";
import { BlogList } from "../features/blogs/components/BlogList";
import { fetchBlogs } from "../lib/api/blogs";
import { ApiError } from "../lib/api/client";

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogsQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  const blogs = blogsQuery.data ?? [];
  const categories = useMemo(() => {
    const unique = [...new Set(blogs.map((blog) => blog.category).filter(Boolean))];
    return ["All", ...unique];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        blog.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchTerm, selectedCategory]);

  const errorMessage =
    blogsQuery.error instanceof ApiError
      ? blogsQuery.error.detail
      : "Failed to fetch blogs.";

  return (
    <div>
      <Hero />
      <div className="mx-auto my-8 w-full max-w-xl px-4">
        <Input
          value={searchTerm}
          placeholder="Search blogs..."
          aria-label="Search blogs"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <CategorySection
        categories={categories}
        onValueChange={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      {blogsQuery.isError ? (
        <p className="px-4 py-16 text-center font-semibold uppercase text-muted-foreground">
          {errorMessage}
        </p>
      ) : (
        <BlogList blogs={filteredBlogs} isLoading={blogsQuery.isPending} />
      )}
    </div>
  );
};
