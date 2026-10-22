export interface Blog {
  id: number;
  title: string;
  content: string;
  description: string;
  author: number | string;
  category: string;
}

export interface BlogPayload {
  title: string;
  description: string;
  content: string;
  category: string;
}

export interface BlogListProps {
  blogs: Blog[];
  isLoading: boolean;
}

export interface BlogCardProps {
  blog: Blog;
}
