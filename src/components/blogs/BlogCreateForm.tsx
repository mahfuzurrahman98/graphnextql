"use client";

import { useState, useEffect } from "react";
import { ICategory, ITag } from "@/utils/interfaces";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CreatableSelect from "react-select/creatable";
import { CREATE_BLOG } from "@/graphql/client/mutations/blog";
import { createApolloClient } from "@/lib/apolloClient";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

const client = createApolloClient();

const blogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    category: z.string().min(1, "Category is required"),
    tags: z
        .array(z.object({ value: z.string(), label: z.string() }))
        .min(1, "At least one tag is required"),
});

type TagOption = { value: string; label: string };

export default function BlogCreateForm({
    categories,
    tags,
}: {
    categories: ICategory[];
    tags: ITag[];
}) {
    const [availableTags, setAvailableTags] = useState<TagOption[]>(
        tags.map((tag) => ({ value: tag.id, label: tag.name }))
    );

    const form = useForm<z.infer<typeof blogSchema>>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            content: "",
            category: "",
            tags: [],
        },
    });

    const onSubmit = async (values: z.infer<typeof blogSchema>) => {
        try {
            console.log("Form submitted with values:", values);

            const result = await client.mutate({
                mutation: CREATE_BLOG,
                variables: {
                    title: values.title,
                    content: values.content,
                    category: values.category,
                    tags: values.tags.map((tag: any) => tag.value),
                },
            });

            toast({
                title: "Success",
                description: "Blog created successfully",
            });

            form.reset();
        } catch (error: any) {
            console.error(`Error creating blog: ${error}`);
            toast({
                title: "Error",
                description: error.message,
            });
        }
    };

    useEffect(() => {
        console.log("Categories:", categories);
    }, [categories]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter blog title"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Write your blog content here"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    onValueChange={(value) => {
                                        console.log(
                                            "Selected category:",
                                            value
                                        );
                                        field.onChange(value);
                                    }}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map(
                                            (category: ICategory) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <Controller
                                        name="tags"
                                        control={form.control}
                                        render={({ field }) => (
                                            <CreatableSelect
                                                styles={{
                                                    control: (
                                                        baseStyles,
                                                        state
                                                    ) => ({
                                                        ...baseStyles,
                                                        borderColor:
                                                            state.isFocused
                                                                ? "green"
                                                                : "grey",
                                                    }),
                                                }}
                                                {...field}
                                                options={availableTags}
                                                isMulti
                                                className="w-full"
                                                placeholder="Select tags"
                                            />
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Create Blog Post</Button>
                </form>
            </Form>
        </div>
    );
}
