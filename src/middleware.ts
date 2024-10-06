// export { auth as middleware } from "@/auth";

import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // Redirect logged-in users away from login page
    if (nextUrl.pathname === "/login") {
        if (isLoggedIn) {
            // Redirect to dashboard or home page
            return NextResponse.redirect(new URL("/admin", nextUrl));
        }
        // Allow access to login page for non-logged in users
        return NextResponse.next();
    }

    // Protect routes that start with /admin
    if (nextUrl.pathname.startsWith("/admin")) {
        if (!isLoggedIn) {
            // Redirect unauthenticated users to the login page
            return NextResponse.redirect(new URL("/login", nextUrl));
        }
    }

    // Allow access to all other routes
    return NextResponse.next();
});

// Specify which routes this middleware should run on
export const config = {
    matcher: ["/admin/:path*", "/login", "/dashboard"],
};
