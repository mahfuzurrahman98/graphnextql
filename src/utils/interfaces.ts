export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface ICategory {
    id: string;
    name: string;
    description: string;
}

export interface ITag {
    id: string;
    name: string;
}

export interface IBlog {
    id: string;
    title: string;
    content: string;
    author: IUser;
    category: ICategory;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}
