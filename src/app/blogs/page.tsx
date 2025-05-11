'use client';
import { useEffect } from "react";
import useApiState from "../hooks/use-api-state";

interface IBlog {
    _id: string;
    title: string;
    content: string
}
export default function ProductListing() {
    const [blogs, setBlogs, callBlogsApi, loading, error] = useApiState<IBlog[] | null>(null, true);

    async function getAllBlogs() {
        callBlogsApi(async function () {
            const url = `/api/blog/all`;
            const res = await fetch(url);
            const data = await res.json();
            const body = data.data;
            setBlogs(body);
        })
    }

    useEffect(() => {
        getAllBlogs();
    }, [])
    return <main>
        <h1 style={{ textAlign: 'center', marginBottom: 20 }}>All Blogs Page</h1>

        <section style={{ display: 'flex', justifyContent: "center", gap: 30 }}>
            {loading && <p>Loading...</p>}
            {!loading && error && <p>{error}</p>}
            {blogs && blogs.map(b => <p key={b._id}>{b.title}</p>)}
        </section>
    </main>
}
