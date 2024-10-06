// app/admin/page.tsx

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const Admin = async () => {
    const session = await auth();

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome, {session?.user?.name}!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 mb-4">
                            Email: {session?.user?.email}
                        </p>
                        <p className="mb-4">
                            You have access to the admin area. Here you can
                            manage blogs and other site content.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Manage Blogs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">
                            Click below to view, edit, create, or delete blog
                            posts.
                        </p>
                        <Button asChild>
                            <Link href="/admin/blogs">
                                Go to Blog Management
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Admin;
