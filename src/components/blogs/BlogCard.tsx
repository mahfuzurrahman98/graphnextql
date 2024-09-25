// components/blogs/BlogCard.tsx
import React from "react";
import Link from "next/link";
import { IBlog, ITag } from "@/utils/interfaces";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
    blog: IBlog;
}



const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    return (
        <Card className="flex flex-col h-full transition-shadow hover:shadow-lg">
            <CardHeader>
                <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-2">
                    {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <Badge>{blog.category.name}</Badge>
                <Link
                    href={`/${blog._id}`}
                    className="text-primary hover:underline"
                >
                    Read more
                </Link>
            </CardFooter>
        </Card>
    );
};

export default BlogCard;
