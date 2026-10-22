import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { blogFormSchema, type BlogFormValues } from "../features/auth/schemas";
import { createBlog, fetchBlog, updateBlog } from "../lib/api/blogs";
import { ApiError } from "../lib/api/client";

export const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const blogId = Number(id);
  const isEdit = Number.isInteger(blogId) && blogId > 0;

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: { title: "", description: "", content: "", category: "" },
  });

  const blogQuery = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => fetchBlog(blogId),
    enabled: isEdit,
  });

  useEffect(() => {
    if (blogQuery.data) {
      form.reset({
        title: blogQuery.data.title,
        description: blogQuery.data.description,
        content: blogQuery.data.content,
        category: blogQuery.data.category,
      });
    }
  }, [blogQuery.data, form]);

  const mutation = useMutation({
    mutationFn: (values: BlogFormValues) =>
      isEdit ? updateBlog(blogId, values) : createBlog(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      if (isEdit) {
        await queryClient.invalidateQueries({ queryKey: ["blog", blogId] });
        navigate(`/blog/${blogId}`);
        return;
      }
      navigate("/");
    },
  });

  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold">{isEdit ? "Edit post" : "New post"}</h1>
      {isEdit && blogQuery.isPending ? (
        <p className="text-muted-foreground">Loading post...</p>
      ) : (
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
        >
          <div>
            <label className="mb-1 block text-sm" htmlFor="title">
              Title
            </label>
            <Input id="title" {...form.register("title")} />
            {form.formState.errors.title ? (
              <p className="mt-1 text-sm text-destructive">
                {form.formState.errors.title.message}
              </p>
            ) : null}
          </div>
          <div>
            <label className="mb-1 block text-sm" htmlFor="description">
              Description
            </label>
            <Input id="description" {...form.register("description")} />
            {form.formState.errors.description ? (
              <p className="mt-1 text-sm text-destructive">
                {form.formState.errors.description.message}
              </p>
            ) : null}
          </div>
          <div>
            <label className="mb-1 block text-sm" htmlFor="category">
              Category
            </label>
            <Input id="category" {...form.register("category")} />
            {form.formState.errors.category ? (
              <p className="mt-1 text-sm text-destructive">
                {form.formState.errors.category.message}
              </p>
            ) : null}
          </div>
          <div>
            <label className="mb-1 block text-sm" htmlFor="content">
              Content
            </label>
            <Textarea id="content" {...form.register("content")} />
            {form.formState.errors.content ? (
              <p className="mt-1 text-sm text-destructive">
                {form.formState.errors.content.message}
              </p>
            ) : null}
          </div>
          {mutation.isError ? (
            <p className="text-sm text-destructive">
              {mutation.error instanceof ApiError
                ? mutation.error.detail
                : "Could not save the post."}
            </p>
          ) : null}
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : isEdit ? "Update" : "Create"}
          </Button>
        </form>
      )}
    </section>
  );
};
