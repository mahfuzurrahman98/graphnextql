// import { login } from "@/actions/auth";

import LoginFrom from "@/components/auth/LoginFrom";

export default function Login() {
    return (
        <div className="mx-auto grid max-w-sm gap-6">
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <LoginFrom />
        </div>
    );
}
