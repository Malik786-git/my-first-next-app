import { connectToDatabase } from "@/config/db";
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from "mongoose";
import Blog from "../../../schema/blog.schema";

export async function DELETE(request: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = request.query as { id: string };
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid blog ID"
            })
        }
        await connectToDatabase();
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json(
                { message: "Blog not found" },
            );
        }

        return res.status(200).json({
            data: deletedBlog,
            message: "Invalid blog ID"
        })

    } catch (error) {
        const err = error as Error;
        console.error("Error deleting blog:", err);
        return res.status(500).json(
            { message: err.message || "Internal Server Error" },
        );
    }
}