import connectMongo from "@/lib/dbConnect";
import { comparePassword } from "@/lib/password";
import User from "@/models/User";
import { IUser } from "@/utils/interfaces";

const getUser = async (
    email: string,
    password: string
): Promise<IUser | null> => {
    try {
        await connectMongo();
        const foundUser = await User.findOne({
            email,
        });

        if (!foundUser) {
            throw new Error("User not found.");
        }

        if (!comparePassword(password, foundUser.password)) {
            throw new Error("Incorrect password.");
        }

        return foundUser;
    } catch (error: any) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

export { getUser };
