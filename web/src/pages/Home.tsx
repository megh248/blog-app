/* eslint-disable react-hooks/set-state-in-effect */
import { Navbar } from "../components/layout/Navbar";
import { CategorySection } from "../components/sections/CategorySection";
import { Hero } from "../components/sections/Hero";
import { BlogList } from "../features/blogs/components/BlogList";
import { Input } from "../components/ui/input";
import { useState, use, useMemo } from "react";
import { fetchBlogs } from "../lib/api/blogs";
import type { Blog } from "../features/blogs/types/blogTypes";

const blogsPromise = fetchBlogs()
  .then((res) => res)
  .catch((e) => {
    console.log(e);
    return [];
  });

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const initialBlogs = use(blogsPromise);
  const handleBlogSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleFilterByCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog: Blog) => {
      const matchesSearch = blog.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        blog.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [initialBlogs, searchTerm, selectedCategory]);

  return (
    <div>
      <Navbar />
      <Hero />
      <div className="w-150 mx-auto my-8">
        <Input
          value={searchTerm}
          placeholder="Search blogs..."
          onChange={(e) => {
            handleBlogSearch(e.target.value);
          }}
        />
      </div>
      <CategorySection
        onValueChange={handleFilterByCategory}
        selectedCategory={selectedCategory}
      />
      <BlogList blogs={filteredBlogs} />
    </div>
  );
};
