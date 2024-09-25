import User from "@/models/User";
import Tag from "@/models/Tag";
import Blog from "@/models/Blog";
import Category from "@/models/Category";

import { createUser } from "@/app/utils/data-entry";
import { NextRequest, NextResponse } from "next/server";
import { IBlog, ICategory, ITag, IUser } from "@/utils/interfaces";
import connectMongo from "@/lib/dbConnect";

(async function () {
    try {
        await connectMongo();
        console.log("Hello man");
    } catch (error: any) {
        console.error("Error happenning", error);
    }
})();

const GET = async () => {
    try {
        const blogs: IBlog[] = await Blog.find();
        const users: IUser[] = await User.find();
        const categories: ICategory[] = await Category.find();
        const tags: ITag[] = await Tag.find();

        return NextResponse.json(
            {
                message: "Fetched data successfully",
                success: true,
                data: {
                    // users,
                    // blogs,
                    categories,
                    tags,
                },
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "Fetched data successfully",
                success: false,
            },
            { status: 200 }
        );
    }
};

const POST = async () => {
    await createUser();
    return NextResponse.json(
        {
            message: "Created user successfully",
            success: true,
        },
        { status: 201 }
    );
};

export { GET, POST };
