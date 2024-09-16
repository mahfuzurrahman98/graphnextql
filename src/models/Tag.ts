// models/Category.ts
import Database from '@/lib/Database';
const db = Database.getInstance();

const tagSchema = new db.Schema(
    {
        name: { type: String, required: true },
    },
    { timestamps: true }
);

const Category = db.models.Category || db.model('Category', tagSchema);
export default Category;
