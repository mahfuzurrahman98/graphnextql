export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface ICategory extends Document {
    name: string;
    description: string;
}

export interface ITag extends Document {
    name: string;
}

export interface IBlog extends Document {
    title: string;
    content: string;
    author: IUser;
    category: ICategory;
    tags: ITag[];
    createdAt: Date;
    updatedAt: Date;
}
