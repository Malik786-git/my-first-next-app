'use client';

import { useEffect } from "react";
import useApiState from "../hooks/use-api-state";
import { useRouter } from "next/navigation";
interface IBlog {
    _id: string;
    title: string;
    content: string;
}
export default function ProductListing() {
    const [blogs, setBlogs, callBlogApi, loading, error] = useApiState<IBlog[] | null>(null, true);
    const router = useRouter()
    async function getAllBlogs() {
        callBlogApi(async function () {
            const url = `/api/blog/all`
            const res = await fetch(url);
            const body = await res.json();
            setBlogs(body.data);
        })
    }

    useEffect(() => {
        getAllBlogs();
    }, [])
    return <main>
        <h1 style={{ textAlign: 'center', marginBottom: 20 }}>All Blogs Page</h1>

        <section style={{ display: 'flex', justifyContent: "center", flexDirection: "column", gap: 30 }}>
            {loading && <p>Loading...</p>}
            {!loading && error && <p>{error}</p>}
            {!loading && blogs && blogs.map(p => <p onClick={() => router.push(`/blogs/${p._id}`)} style={{ textAlign: "center" }}>{p.title}</p>)}
        </section>
    </main>
}