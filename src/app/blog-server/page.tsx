
import BlogCard from "../components/blog-card";
interface IBlog {
    id: string;
    title: string;
}
export const dynamic = 'force-dynamic'; // This will make the page dynamic and not cache it
async function fetchBlogs() {
    const res = await fetch("https://67f2ae93ec56ec1a36d3e03f.mockapi.io/blog", {
        cache: 'no-store',
    });
    const data = await res.json();
    return data;
}
export default async function BlogServerPage() {
    let blogs: IBlog[] = [];
    blogs = await fetchBlogs();


    return (
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1>Blog's CSR</h1>
            {blogs && blogs?.map((blog) => (<BlogCard title={blog.title}></BlogCard>))}

        </div>
    );
}