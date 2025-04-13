'use client';
import { Product } from "@/models/app/product.model";
import useApiState from "../hooks/use-api-state";
import { useEffect } from "react";
import { Constants } from "../../../constants";
import ProductCard from "../components/card/product-card";

interface IProps {
    id: string;
}

export default function ProductDetail({ id }: IProps) {
    const [product, setProduct, callProductApi, loading, error] = useApiState<Product | null>(null);
    async function fetchProduct(product_id: string) {
        callProductApi(async function () {
            let url = `${Constants.API_BASE}/product/${product_id}`;
            const res = await fetch(url);
            const body = await res.json();
            setProduct(new Product(body));
        })
    }
    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id]);

    return <div style={{ display: "flex", justifyContent: 'center', flexWrap: "wrap", gap: 20 }}>
        {loading && <p>Loading...</p>}
        {!loading && error && <p>{error}</p>}
        {product && <ProductCard data={product}></ProductCard>}
    </div>
}