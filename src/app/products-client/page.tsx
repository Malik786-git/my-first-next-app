'use client';

import { useEffect, useState } from "react";
interface IProduct {
    id: string;
    title: string;
    thumbnail: string;
}

export default function Page() {
    const [data, setData] = useState<IProduct[] | null>(null);

    async function fetchProducts() {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        setData(data.products);
    }

    useEffect(() => {
        fetchProducts()
    }, []);


    return <div>
        <h1>Products Listing</h1>
        <ul>
            {data && data.map(p => <li key={p.id}>{p.title}</li>)}
        </ul>
    </div>
}