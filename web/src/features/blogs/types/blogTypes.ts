export interface Blog {
  id: number;
  title: string;
  description: string;
  author: string;
  category: string;
}

export interface BlogListProps {
  blogs: Blog[];
}

export interface BlogCardProps{
    blog: Blog
}