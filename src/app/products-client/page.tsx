'use client';

import { useEffect, useState } from "react";
import ProductCardClient from "../components/clients/product-card";
import ProductCardServer from "../components/server/product-card-server";
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
            {/* {data && data.map(p => <li key={p.id}>{p.title}</li>)} */}
            <ProductCardClient name="Bottle"></ProductCardClient>
            <ProductCardServer name="Bottle Server"></ProductCardServer>
        </ul>
    </div>
}