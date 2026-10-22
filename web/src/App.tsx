import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthBootstrap } from "./components/auth/AuthBootstrap";
import { RequireAdmin, RequireAuth } from "./components/auth/RequireAuth";
import { Navbar } from "./components/layout/Navbar";

const AdminBlogs = lazy(() =>
  import("./pages/AdminBlogs").then((module) => ({ default: module.AdminBlogs })),
);
const BlogDetails = lazy(() =>
  import("./pages/BlogDetail").then((module) => ({ default: module.BlogDetails })),
);
const BlogForm = lazy(() =>
  import("./pages/BlogForm").then((module) => ({ default: module.BlogForm })),
);
const Home = lazy(() =>
  import("./pages/Home").then((module) => ({ default: module.Home })),
);
const Login = lazy(() =>
  import("./pages/Login").then((module) => ({ default: module.Login })),
);
const Profile = lazy(() =>
  import("./pages/Profile").then((module) => ({ default: module.Profile })),
);
const Register = lazy(() =>
  import("./pages/Register").then((module) => ({ default: module.Register })),
);

function App() {
  return (
    <>
      <Navbar />
      <AuthBootstrap />
      <Suspense
        fallback={
          <p className="px-4 py-16 text-center text-muted-foreground">Loading...</p>
        }
      >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/blog/new"
          element={
            <RequireAuth>
              <BlogForm />
            </RequireAuth>
          }
        />
        <Route
          path="/blog/:id/edit"
          element={
            <RequireAuth>
              <BlogForm />
            </RequireAuth>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <RequireAuth>
              <BlogDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminBlogs />
            </RequireAdmin>
          }
        />
      </Routes>
      </Suspense>
    </>
  );
}

export default App;
