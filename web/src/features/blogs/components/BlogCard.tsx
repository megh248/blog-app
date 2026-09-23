import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import type { BlogCardProps } from "../types/blogTypes";

export const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Card className="my-8">
        <CardHeader>
            <CardTitle>{blog.title}</CardTitle>
        </CardHeader>
        <CardDescription className="pl-4">
            {blog.description}
        </CardDescription>
        <CardContent>By {blog.author}</CardContent>
        <CardFooter>
            <Button>Read more</Button>
        </CardFooter>
    </Card>
    //   <span>{blog.author}</span>
    //   <span>{blog.category}</span>
  );
};