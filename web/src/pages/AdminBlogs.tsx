import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { deleteAdminBlog, fetchAdminBlogs } from "../lib/api/admin";
import { ApiError } from "../lib/api/client";

export const AdminBlogs = () => {
  const queryClient = useQueryClient();
  const blogsQuery = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: fetchAdminBlogs,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdminBlog,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  if (blogsQuery.isPending) {
    return <p className="px-4 py-16 text-center text-muted-foreground">Loading all blogs...</p>;
  }

  if (blogsQuery.isError) {
    return (
      <p className="px-4 py-16 text-center text-destructive">
        {blogsQuery.error instanceof ApiError
          ? blogsQuery.error.detail
          : "Could not load admin blogs."}
      </p>
    );
  }

  const blogs = blogsQuery.data ?? [];

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold">Admin blogs</h1>
      {blogs.length === 0 ? (
        <p className="text-muted-foreground">No blogs in the system.</p>
      ) : (
        <ul className="space-y-4">
          {blogs.map((blog) => (
            <li
              key={blog.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4"
            >
              <div>
                <Link className="font-medium underline" to={`/blog/${blog.id}`}>
                  {blog.title}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {blog.category} · author #{blog.author}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                disabled={deleteMutation.isPending}
                onClick={() => {
                  if (window.confirm(`Delete “${blog.title}”?`)) {
                    deleteMutation.mutate(blog.id);
                  }
                }}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
