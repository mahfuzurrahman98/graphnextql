import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/validation/authSchema";
import { getUser } from "@/services/authService";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials): Promise<any> => {
                try {
                    let user = null;

                    const { email, password } = await signInSchema.parseAsync(
                        credentials
                    );

                    // logic to verify if the user exists
                    user = await getUser(email, password);

                    if (!user) {
                        throw new Error("User not found.");
                    }

                    // return JSON object with the user data
                    return user;
                } catch (error: any) {
                    if (error instanceof ZodError) {
                        // Return `null` to indicate that the credentials are invalid
                        return null;
                    }
                }
            },
        }),
    ],
});
