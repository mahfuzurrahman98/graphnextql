// models/Blog.ts
import Database from '@/lib/Database';
const db = Database.getInstance();

const blogSchema = new db.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: db.Schema.Types.ObjectId, ref: 'User', required: true },
        tags: { type: [String] },
        categories: { type: [String] },
    },
    { timestamps: true }
);

const Blog = db.models.Blog || db.model('Blog', blogSchema);
export default Blog;
