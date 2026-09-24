import { Navbar } from "../components/layout/Navbar";
import { CategorySection } from "../components/sections/CategorySection";
import { Hero } from "../components/sections/Hero";
import { BlogList } from "../features/blogs/components/BlogList";
import { mockBlogs } from "../features/blogs/data/mockBlogs";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <CategorySection />
      <section>
        <h2 className="text-center mt-8 font-black text-black uppercase">Latest Blogs</h2>
        <BlogList blogs={mockBlogs} />
      </section>
    </div>
  );
};
