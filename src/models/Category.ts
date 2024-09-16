// models/Category.ts
import Database from '@/lib/Database';
const db = Database.getInstance();

const categorySchema = new db.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
    },
    { timestamps: true }
);

const Category = db.models.Category || db.model('Category', categorySchema);
export default Category;
