// components/layouts/Footer.tsx
const Footer = () => {
    return (
        <footer className="bg-background text-foreground py-4 mt-auto transition-colors">
            <div className="container mx-auto px-4 text-center">
                <p>
                    &copy; {new Date().getFullYear()} BlogNext. All rights
                    reserved.
                </p>
                <p className="text-sm">
                    Built with{" "}
                    <a
                        href="https://nextjs.org/"
                        className="underline hover:text-primary"
                    >
                        Next.js
                    </a>{" "}
                    &{" "}
                    <a
                        href="https://graphql.org/"
                        className="underline hover:text-primary"
                    >
                        GraphQL
                    </a>
                    .
                </p>
            </div>
        </footer>
    );
};

export default Footer;
