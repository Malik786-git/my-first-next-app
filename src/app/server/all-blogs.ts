'use server';

import connectToDatabase from "@/config/db";
import Blog from "../api/schema/blog.schema";

export async function getAllBlogIds() {
    try {
        await connectToDatabase();
        const blogs = await Blog.find({}, { _id: 1 }); // Only fetch IDs
        return blogs;
    } catch (error) {
        console.error("Error in generateStaticParams:", error);
        return [];
    }
}