"use client";

// app/admin/page.tsx

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Admin() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "unauthenticated") {
        return <div>Access Denied</div>;
    }

    return (
        <div>
            <h1>Welcome, {session?.user?.id}!</h1>
            <p>Email: {session?.user?.email}</p>
        </div>
    );
}
