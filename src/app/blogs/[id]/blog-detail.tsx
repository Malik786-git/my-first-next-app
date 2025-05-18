'use client';

import useApiState from "@/app/hooks/use-api-state";
import { useEffect } from "react";
interface IBlog {
    title: string;
    content: string;
}

interface IProps {
    blogId: string
}
export default function BlogDetail({ blogId }: IProps) {
    const [blogs, setBlogs, callBlogApi, loading, error] = useApiState<IBlog | null>(null, true);

    async function getAllBlogs() {
        callBlogApi(async function () {
            const url = `/api/blog/${blogId}`
            const res = await fetch(url);
            const body = await res.json();
            setBlogs(body.data);
        })
    }

    useEffect(() => {
        getAllBlogs();
    }, [])
    return <main>
        <h1 style={{ textAlign: 'center', marginBottom: 20 }}>{blogId} Blog Page</h1>

        <section style={{ display: 'flex', justifyContent: "center", flexDirection: "column", gap: 30 }}>
            {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
            {!loading && error && <p style={{ textAlign: "center" }}>{error}</p>}
            {!loading && blogs && <h2 style={{ textAlign: "center" }}>{blogs.title}</h2>}
        </section>
    </main>
}