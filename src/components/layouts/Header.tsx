// components/layouts/Header.tsx
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";

const Header = () => {
    return (
        <header className="bg-background text-foreground border-b transition-colors">
            <div className="max-w-[1200px] mx-auto px-4 md:px-0 py-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold">BlogNext</h1>
                <nav className="flex items-center space-x-4">
                    <Link
                        href="/"
                        className="hover:text-primary transition-colors"
                    >
                        Home
                    </Link>
                    {/* <Link
                        href="/about"
                        className="hover:text-primary transition-colors"
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="hover:text-primary transition-colors"
                    >
                        Contact
                    </Link> */}
                    <ModeToggle />
                </nav>
            </div>
        </header>
    );
};

export default Header;
