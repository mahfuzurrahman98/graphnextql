import User from '@/models/User';
import bcrypt from 'bcryptjs';

const createUser = async () => {
    const plainPassword = 'test123';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const newUser = await User.create({
        name: 'Mahfuz',
        email: 'mahfuz@me.com',
        password: hashedPassword,
        role: 'admin',
    });
};

export { createUser };
