import { Model, model, models, Schema } from "mongoose";
import { ICategory } from "@/utils/interfaces"; // Assuming you have an ICategory interface

// Define the schema
const categorySchema: Schema<ICategory> = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
    },
    { timestamps: true }
);

// Create an index on the name field
// categorySchema.index({ name: 1 });

// Check if the model exists, if not create it
const Category =
    (models.Category as Model<ICategory>) ||
    model<ICategory>("Category", categorySchema);

export default Category;
