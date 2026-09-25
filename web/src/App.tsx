import { BlogDetails } from "./pages/BlogDetail";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
    </Routes>
  );
}

export default App;
