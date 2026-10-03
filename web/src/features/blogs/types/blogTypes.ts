export interface Blog {
  id: number;
  title: string;
  content: string;
  description: string;
  author: string | undefined;
  category: string;
  detail?: string;
  data?: object; // ERROR HANDLING VARIABLES
  message?: string // ERROR HANDLING VARIABLES
}

export interface BlogErrorResponse {
  data: [];
  message: string;
}

export interface BlogListProps {
  blogs: Blog[];
  isLoading: boolean;
}

export interface BlogCardProps{
    blog: Blog
}
export interface BlogDetailsProps{
    blog: Blog
}
