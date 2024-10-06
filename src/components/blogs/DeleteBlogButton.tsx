"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { DELETE_BLOG } from "@/graphql/client/mutations/blog";
import { createApolloClient } from "@/lib/apolloClient";

interface DeleteButtonProps {
    blogId: string;
    blogTitle: string;
    onDeleteSuccess: () => void;
}

export default function DeleteButton({
    blogId,
    blogTitle,
    onDeleteSuccess,
}: DeleteButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const client = createApolloClient();

    const [deleteBlog, { loading }] = useMutation(DELETE_BLOG, {
        client,
        onCompleted: () => {
            toast({
                title: "Blog deleted",
                description: `The blog "${blogTitle}" has been successfully deleted.`,
            });
            setIsOpen(false);
            onDeleteSuccess();
            router.refresh();
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: `Failed to delete the blog: ${error.message}`,
                variant: "destructive",
            });
        },
    });

    const handleDelete = async () => {
        try {
            await deleteBlog({ variables: { id: blogId } });
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center text-sm"
                    aria-label={`Delete blog: ${blogTitle}`}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the blog post "{blogTitle}".
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
