import { connectToDatabase } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import Blog from "../../schema/blog.schema";

export async function POST(request: NextRequest) {
    try {
        const { title, content } = await request.json();
        if (!title || !content) {
            return NextResponse.json(
                { message: "Title and content are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const newBlog = new Blog({ title, content });
        const savedBlog = await newBlog.save();

        return NextResponse.json(
            { data: savedBlog, message: "Blog created successfully" },
            { status: 201 }
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