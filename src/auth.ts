// auth.ts

import NextAuth, { User } from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/validation/authSchema";
import { getUser } from "@/services/authService";
import { IUser } from "@/utils/interfaces";

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
                    const { email, password } = await signInSchema.parseAsync(
                        credentials
                    );

                    // logic to verify if the user exists
                    let user: IUser | null = await getUser(email, password);
                    console.log("user in auth:", user);

                    if (!user) {
                        throw new Error("User not found.");
                    }

                    // return JSON object with the user data
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    };
                } catch (error: any) {
                    if (error instanceof ZodError) {
                        // Return `null` to indicate that the credentials are invalid
                        return null;
                    }
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            // When the user logs in, persist id and role in the token
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            // Pass id and role from token to session
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
});
