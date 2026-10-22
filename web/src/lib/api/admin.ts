import { apiRequest } from "./client";
import type { Blog } from "../../features/blogs/types/blogTypes";

export function fetchAdminBlogs(): Promise<Blog[]> {
  return apiRequest<Blog[]>("/admin/blogs");
}

export function deleteAdminBlog(id: number): Promise<void> {
  return apiRequest<void>(`/admin/blogs/${id}`, { method: "DELETE" });
}
