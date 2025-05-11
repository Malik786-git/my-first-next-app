import { connectToDatabase } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import Blog from "../../schema/blog.schema";

export async function PUT(request: NextRequest) {
    try {
        const { id, title, content } = await request.json();

        // Validation
        if (!id || !title?.trim() || !content?.trim()) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const existingBlog = await Blog.findById(id);
        if (!existingBlog) {
            return NextResponse.json(
                { message: "Blog not found" },
                { status: 404 }
            );
        }

        existingBlog.title = title ?? existingBlog.title;
        existingBlog.content = content ?? existingBlog.title;
        const updatedBlog = await existingBlog.save();

        return NextResponse.json(
            {
                data: updatedBlog,
                message: "Blog updated successfully"
            },
            { status: 200 }
        );

    } catch (error) {
        const err = error as Error;
        console.error("Error updating blog:", err);
        return NextResponse.json(
            { message: err.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}