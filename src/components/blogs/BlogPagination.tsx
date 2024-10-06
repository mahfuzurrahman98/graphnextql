"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

export default function BlogPagination({ totalItems }: { totalItems: number }) {
    const searchParams = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 3;
    const totalPages = Math.ceil(totalItems / limit);

    const generatePaginationLinks = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(pageNumber));
        return params.toString();
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <Button
                    key={i}
                    variant={page === i ? "default" : "outline"}
                    asChild
                >
                    <Link href={`?${generatePaginationLinks(i)}`}>{i}</Link>
                </Button>
            );
        }
        return pageNumbers;
    };

    const renderPreviousPageLink = () => {
        return page > 1 ? (
            <Button variant="outline" asChild>
                <Link href={`?${generatePaginationLinks(page - 1)}`}>Prev</Link>
            </Button>
        ) : (
            <Button variant="secondary" className="cursor-not-allowed" disabled>
                Prev
            </Button>
        );
    };

    const renderNextPageLink = () => {
        return page < totalPages ? (
            <Button variant="outline" asChild>
                <Link href={`?${generatePaginationLinks(page + 1)}`}>Next</Link>
            </Button>
        ) : (
            <Button variant="secondary" className="cursor-not-allowed" disabled>
                Next
            </Button>
        );
    };

    return (
        <div className="flex items-center gap-2">
            {renderPreviousPageLink()}
            {renderPageNumbers()}
            {renderNextPageLink()}
        </div>
    );
}
