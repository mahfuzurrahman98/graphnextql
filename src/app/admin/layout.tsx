// app/admin/layout.tsx

import type { Metadata } from "next";
import "../globals.css";
import AdminHeader from "@/components/layouts/AdminHeader";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
    title: "BlogNext Admin",
    description: "Admin panel for BlogNext",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionProvider>
            <div className="flex flex-col min-h-screen">
                <AdminHeader />
                <main className="flex-grow max-w-[1200px] w-full mx-auto my-10 px-4 md:px-0 py-4">
                    {children}
                </main>
            </div>
            <Toaster />
        </SessionProvider>
    );
}
