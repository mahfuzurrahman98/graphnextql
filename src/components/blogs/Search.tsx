// components/blogs/Search.tsx
"use client";

import { useState, FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchParamsType, CategoryOptionsType } from "@/utils/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SearchProps {
    categoryOptions: CategoryOptionsType[];
}

export const Search: FC<SearchProps> = ({ categoryOptions }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchData, setSearchData] = useState<SearchParamsType>({
        q: searchParams.get("q") || "",
        category: searchParams.get("category") || "",
    });

    const updateSearchParams = () => {
        const params = new URLSearchParams();
        if (searchData.q) params.set("q", searchData.q);
        if (searchData.category) params.set("category", searchData.category);
        router.push(`?${params.toString()}`);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCategoryChange = (value: string) => {
        setSearchData((prev) => ({ ...prev, category: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form submission default behavior
        updateSearchParams(); // Trigger the search manually
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 mb-8"
        >
            <Input
                name="q"
                value={searchData.q}
                onChange={handleChange}
                placeholder="Search blogs..."
                className="flex-grow"
            />
            <Select
                value={searchData.category}
                onValueChange={handleCategoryChange}
            >
                <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categoryOptions.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button type="submit" className="md:w-[120px]">
                Search
            </Button>
        </form>
    );
};
