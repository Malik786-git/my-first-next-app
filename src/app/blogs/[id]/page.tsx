import connectToDatabase from "@/config/db";
import { Constants } from "../../../../constants";
import BlogDetail from "./blog-detail";
import Blog from "@/app/api/schema/blog.schema";
// export async function generateStaticParams() {
//     // const blogs = await fetch(`${Constants.PROD_BASE_URL}/api/blog/all`, { cache: "force-cache" }).then((res) => res.json());
//     const blogs = await fetch(`${Constants.PROD_BASE_URL}/api/blog/all`, { cache: "force-cache" }).then((res) => res.json());
//     return blogs?.data?.map((b: any) => ({
//         id: b._id,
//     })) ?? [];
// }

export async function generateStaticParams() {
    try {
        await connectToDatabase();
        const blogs = await Blog.find({}, { _id: 1 }); // Only fetch IDs

        return blogs.map((blog) => ({
            id: blog._id.toString(),
        }));
    } catch (error) {
        console.error("Error in generateStaticParams:", error);
        return [];
    }
}


interface IPageParams {
    params: Promise<{
        id: string
    }>
}

export default async function ProductListing(props: IPageParams) {
    const { id } = await props.params;
    return <BlogDetail blogId={id}></BlogDetail>
}