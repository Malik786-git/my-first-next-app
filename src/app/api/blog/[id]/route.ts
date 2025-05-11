import { connectToDatabase } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import Blog from "../../schema/blog.schema";
import mongoose from "mongoose";
interface IGetBlogApiParams {
    params: Promise<{ id: mongoose.Types.ObjectId }>
}
// https://www.wisp.blog/blog/nextjs-15-api-get-and-post-request-examples (Ref dynamic apis routes handling)
export async function GET(req: NextRequest, { params }: IGetBlogApiParams) {
    try {
        const { id } = await params;
        await connectToDatabase();
        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json(
                { message: "Blog Not Found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { data: blog, message: "Blog fetched successfully" },
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