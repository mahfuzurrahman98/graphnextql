import { Model, model, models, Schema } from "mongoose";
import { ITag } from "@/utils/interfaces"; // Assuming you have an ITag interface

// Define the schema
const tagSchema: Schema<ITag> = new Schema(
    {
        name: { type: String, required: true },
    },
    { timestamps: true }
);

// Check if the model exists, if not create it
const Tag = (models.Tag as Model<ITag>) || model<ITag>("Tag", tagSchema);

export default Tag;
