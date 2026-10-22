import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { deleteBlog, fetchBlog } from "../lib/api/blogs";
import { ApiError } from "../lib/api/client";

export default function BlogSkeleton() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:py-20">
        <div className="mb-5">
          <Skeleton className="h-7 w-24 rounded-full" />
        </div>
        <div className="mb-6 space-y-3">
          <Skeleton className="h-10 w-full md:h-12" />
          <Skeleton className="h-10 w-4/5 md:h-12" />
        </div>
        <div className="mb-8 space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
        <hr className="mb-8 border-gray-200 dark:border-gray-700" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
        </div>
      </div>
    </section>
  );
}

export const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const blogId = Number(id);
  const isValidId = Number.isInteger(blogId) && blogId > 0;

  const blogQuery = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => fetchBlog(blogId),
    enabled: isValidId,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteBlog(blogId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/");
    },
  });

  if (!isValidId) {
    return (
      <p className="py-24 text-center font-semibold uppercase text-muted-foreground">
        Blog not found
      </p>
    );
  }

  if (blogQuery.isPending) {
    return <BlogSkeleton />;
  }

  if (blogQuery.isError) {
    const message =
      blogQuery.error instanceof ApiError
        ? blogQuery.error.detail
        : "Failed to fetch blog data.";
    return (
      <section className="py-24 text-center">
        <p className="font-semibold uppercase text-muted-foreground">{message}</p>
        <Link className="mt-4 inline-block text-sm underline" to="/">
          Back home
        </Link>
      </section>
    );
  }

  const blog = blogQuery.data;

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:py-20">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            {blog.category}
          </span>
          <div className="flex gap-2">
            <Link
              to={`/blog/${blog.id}/edit`}
              className="inline-flex h-8 items-center rounded-lg border border-border px-2.5 text-sm"
            >
              Edit
            </Link>
            <Button
              variant="destructive"
              disabled={deleteMutation.isPending}
              onClick={() => {
                if (window.confirm("Delete this post?")) {
                  deleteMutation.mutate();
                }
              }}
            >
              Delete
            </Button>
          </div>
        </div>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl dark:text-white">
          {blog.title}
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          {blog.description}
        </p>
        <hr className="mb-8 border-gray-200 dark:border-gray-700" />
        <p className="mb-10 text-sm text-gray-500">Author #{blog.author}</p>
        <article className="whitespace-pre-wrap text-lg leading-8 text-gray-700 dark:text-gray-300">
          {blog.content}
        </article>
        {deleteMutation.isError ? (
          <p className="mt-6 text-sm text-destructive">
            {deleteMutation.error instanceof ApiError
              ? deleteMutation.error.detail
              : "Could not delete this post."}
          </p>
        ) : null}
      </div>
    </section>
  );
};
