import { BlogList } from "./features/blogs/components/BlogList";
import { mockBlogs } from "./features/blogs/data/mockBlogs";

function App() {
  return (
    <>
      <section>
        <BlogList blogs={mockBlogs}/>
      </section>
    </>
  );
}

export default App;
