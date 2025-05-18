import BlogDetail from "./blog-detail";
export async function generateStaticParams() {
 const blogs = await fetch(`http://localhost:3000/api/blog/all`, { cache: "force-cache" }).then((res) => res.json());
        return blogs?.data?.map((b: any) => ({
            id: b._id,
        })) ?? []
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