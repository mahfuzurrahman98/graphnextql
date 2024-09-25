// import { login } from "@/actions/auth";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
    const loginUser = async (formData: FormData) => {
        "use server";
        try {
            // const email = formData.get("email") as string;
            // const password = formData.get("password") as string;
            // console.log({ email, password });
            // await login(formData);

        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <form className="grid gap-4" action={loginUser} method="post">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                    />
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
                {/* <Button variant="outline" className="w-full">
                    Login with Google
                </Button> */}
            </form>
            {/* <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="#" className="underline">
                    Sign up
                </Link>
            </div> */}
        </div>
    );
}
