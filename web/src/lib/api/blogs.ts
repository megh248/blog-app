import { apiRequest } from "./client";
import type { Blog, BlogPayload } from "../../features/blogs/types/blogTypes";

export function fetchBlogs(): Promise<Blog[]> {
  return apiRequest<Blog[]>("/blogs");
}

export function fetchBlog(id: number): Promise<Blog> {
  return apiRequest<Blog>(`/blogs/${id}`);
}

export function createBlog(payload: BlogPayload): Promise<void> {
  return apiRequest<void>("/blogs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateBlog(id: number, payload: BlogPayload): Promise<void> {
  return apiRequest<void>(`/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteBlog(id: number): Promise<void> {
  return apiRequest<void>(`/blogs/${id}`, { method: "DELETE" });
}
