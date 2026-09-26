import { Navbar } from "../components/layout/Navbar";
import { CategorySection } from "../components/sections/CategorySection";
import { Hero } from "../components/sections/Hero";
import { BlogList } from "../features/blogs/components/BlogList";
import { mockBlogs } from "../features/blogs/data/mockBlogs";
import { Input } from "../components/ui/input";
import { useState } from "react";

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogs = mockBlogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||

      blog.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleBlogSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleFilterByCategory = (category: string) => {
    setSelectedCategory(category);
  };

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
      <section>
        <BlogList blogs={blogs} />
      </section>
    </div>
  );
};
