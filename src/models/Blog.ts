import { Model, model, models, Schema } from "mongoose";
import { IBlog } from "@/utils/interfaces"; // Assuming you have an IBlog interface in the interfaces file

// Define the schema
const blogSchema: Schema<IBlog> = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        tags: { type: [String] },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
    },
    { timestamps: true }
);

// Check if the model exists, if not create it
const Blog = (models.Blog as Model<IBlog>) || model<IBlog>("Blog", blogSchema);

export default Blog;
