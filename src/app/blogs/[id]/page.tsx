import { Constants } from "../../../../constants";
import BlogDetail from "./blog-detail";

export async function generateStaticParams() {
    if (Constants.PROD_EVN) {
        const blogs = await fetch(`/api/blog/all`, { cache: "force-cache" }).then((res) => res.json());
        return blogs?.data?.map((b: any) => ({
            id: b._id,
        })) ?? []
    }

    return []
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