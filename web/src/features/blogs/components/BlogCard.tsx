import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import type { BlogCardProps } from "../types/blogTypes";

export const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Card className="my-8 transition-colors hover:bg-muted/40">
      <Link
        to={`/blog/${blog.id}`}
        className="flex h-full flex-col rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-label={`Read ${blog.title}`}
      >
        <CardHeader>
          <CardTitle>{blog.title}</CardTitle>
        </CardHeader>
        <CardDescription className="px-4">{blog.description}</CardDescription>
        <CardContent className="mt-4 text-muted-foreground">
          {blog.category} · author #{blog.author}
        </CardContent>
        <CardFooter className="text-sm font-medium">Read more</CardFooter>
      </Link>
    </Card>
  );
};
