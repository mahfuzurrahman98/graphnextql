// components/loading.tsx

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Search Form Skeleton */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Skeleton for Search Input */}
                <Skeleton className="h-10 w-full md:flex-grow" />
                {/* Skeleton for Category Select */}
                <Skeleton className="h-10 w-full md:w-[200px]" />
                {/* Skeleton for Search Button */}
                <Skeleton className="h-10 w-full md:w-[120px]" />
            </div>

            {/* Blog Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Render 3 skeleton cards to match the grid layout */}
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex flex-col h-full">
                        {/* Skeleton for the title */}
                        <Skeleton className="h-8 w-3/4 mb-4" />
                        {/* Skeleton for the date */}
                        <Skeleton className="h-4 w-1/4 mb-2" />
                        {/* Skeleton for the tags */}
                        <div className="flex gap-2 mb-4">
                            <Skeleton className="h-6 w-12" />
                            <Skeleton className="h-6 w-16" />
                        </div>
                        {/* Skeleton for the footer (category and read more link) */}
                        <div className="mt-auto flex justify-between items-center">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-16" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-end gap-2 mt-10">
                {/* Skeleton for Previous Button */}
                <Skeleton className="h-10 w-20" />
                {/* Skeleton for Page Numbers */}
                {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-10 w-10" />
                ))}
                {/* Skeleton for Next Button */}
                <Skeleton className="h-10 w-20" />
            </div>
        </div>
    );
};

export default Loading;
