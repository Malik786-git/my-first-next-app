import connectToDatabase from "@/config/db";
import { Constants } from "../../../../constants";
import BlogDetail from "./blog-detail";
import Blog from "@/app/api/schema/blog.schema";
import { getAllBlogIds } from "@/app/server/all-blogs";
// For third party apis service
// export async function generateStaticParams() {
//     // const blogs = await fetch(`${Constants.PROD_BASE_URL}/api/blog/all`, { cache: "force-cache" }).then((res) => res.json());
//     const blogs = await fetch(`${Constants.PROD_BASE_URL}/api/blog/all`, { cache: "force-cache" }).then((res) => res.json());
//     return blogs?.data?.map((b: any) => ({
//         id: b._id,
//     })) ?? [];
// }

// For next js apis routes
export async function generateStaticParams() {
    const blogs = await getAllBlogIds();
    return blogs.map((blog) => ({ id: blog._id.toString() }));
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