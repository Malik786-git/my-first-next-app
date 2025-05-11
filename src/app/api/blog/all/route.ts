import { connectToDatabase } from "@/config/db";
import { NextResponse } from "next/server";
import Blog from "../../schema/blog.schema";

export async function GET() {
    try {
        await connectToDatabase();
        const getAllBlogs = await Blog.find({});
        return NextResponse.json(
            { data: getAllBlogs, message: "Blogs fetched successfully" },
            { status: 200 }
        );

    } catch (error) {
        const err = error as Error;
        console.error("Error creating blog:", err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}