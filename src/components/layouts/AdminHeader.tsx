"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

export default function AdminHeader() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut({ redirect: false });
            toast({
                title: "Logged out",
                description: "You have been successfully logged out.",
            });
            router.push("/login");
        } catch (error) {
            console.error("Logout error:", error);
            toast({
                title: "Error",
                description:
                    "An error occurred while logging out. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <header className="bg-background text-foreground border-b transition-colors">
            <div className="max-w-[1200px] mx-auto px-4 md:px-0 py-4 flex justify-between items-center">
                <Link
                    href="/admin"
                    className="text-2xl font-bold hover:text-primary transition-colors"
                >
                    BlogNext
                </Link>
                <nav className="flex items-center space-x-4">
                    <Link
                        href="/"
                        className="hover:text-primary transition-colors"
                    >
                        Home
                    </Link>
                    <Button variant="destructive" onClick={handleLogout}>
                        Logout
                    </Button>
                    <ModeToggle />
                </nav>
            </div>
        </header>
    );
}
