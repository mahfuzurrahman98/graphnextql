import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { Toaster } from "@/components/ui/toaster";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow max-w-[1200px] mx-auto my-10 px-4 md:px-0 py-4">
                {children}
            </main>
            <Footer />
            <Toaster />
        </div>
    );
}
