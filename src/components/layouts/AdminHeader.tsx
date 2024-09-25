"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
    const router = useRouter();

    const handleLogout = () => {
        // Implement your logout logic here
        // For example:
        // logout()
        router.push("/login");
    };

    return (
        <header className="bg-background text-foreground border-b transition-colors">
            <div className="max-w-[1200px] mx-auto px-4 md:px-0 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">BlogNext</h1>
                <nav className="flex items-center space-x-4">
                    <Link
                        href="/"
                        className="hover:text-primary transition-colors"
                    >
                        Home
                    </Link>
                    <Button className="bg-red-100 text-red-700 border-red-700 hover:bg-red-50" onClick={handleLogout}>
                        Logout
                    </Button>
                    <ModeToggle />
                </nav>
            </div>
        </header>
    );
}
