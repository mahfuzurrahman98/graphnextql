import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function Loading() {
    return (
        <div className="max-w-4xl">
            <div className="flex flex-col-reverse md:flex-row justify-between md:items-center gap-y-5 mb-6">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-10 w-40" />
            </div>

            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Skeleton className="h-4 w-20" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-4 w-20" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-4 w-20" />
                        </TableHead>
                        <TableHead className="text-right">
                            <Skeleton className="h-4 w-20" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(5)].map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton className="h-4 w-40" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-20" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-20" />
                            </TableCell>
                            <TableCell className="text-right">
                                <Skeleton className="h-8 w-16 ml-auto" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="mt-10">
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    );
}
