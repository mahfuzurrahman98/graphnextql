import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import AdminHeader from "@/components/layouts/AdminHeader";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
});

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
        <div className={`flex flex-col min-h-screen ${montserrat.className}`}>
            <AdminHeader />
            <main className="flex-grow max-w-[1200px] mx-auto my-10 px-4 md:px-0 py-4">
                {children}
            </main>
        </div>
    );
}
