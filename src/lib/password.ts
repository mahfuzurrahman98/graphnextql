import bcrypt from "bcryptjs";

export const encryptPassword = (plainPassword: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(plainPassword, salt);
    return hash;
};

export const comparePassword = (plainPassword: string, hash: string) => {
    return bcrypt.compareSync(plainPassword, hash);
};
