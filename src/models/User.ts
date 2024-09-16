// models/User.ts
import Database from '@/lib/Database';
const db = Database.getInstance();

const userSchema = new db.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin'], default: 'admin' },
    },
    { timestamps: true }
);

const User = db.models.User || db.model('User', userSchema);
export default User;
