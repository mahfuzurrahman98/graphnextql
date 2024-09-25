// models/User.ts
import { IUser } from "@/utils/interfaces";
import { Model, model, models, Schema } from "mongoose";

// Define the schema
const userSchema: Schema<IUser> = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["admin"], default: "admin" },
    },
    { timestamps: true }
);

const User =
    models && models.User
        ? (models.User as Model<IUser>)
        : model<IUser>("User", userSchema);

export default User;
