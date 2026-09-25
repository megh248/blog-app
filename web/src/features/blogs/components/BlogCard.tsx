import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
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

  const navigate = useNavigate();

   const handleReadMore = () => {
    navigate(`/blog/${blog.id}`);
  };


  return (
    <Card className="my-8" onClick={() => {}}>
      <CardHeader>
        <CardTitle>{blog.title}</CardTitle>
      </CardHeader>
      <CardDescription className="pl-4">{blog.description}</CardDescription>
      <CardContent>By {blog.author}</CardContent>
      <CardFooter onClick={handleReadMore}>
        <Button>Read more</Button>
      </CardFooter>
    </Card>
    //   <span>{blog.author}</span>
    //   <span>{blog.category}</span>
  );
};
