'use client';
import { Product } from "@/models/app/product.model";
import useApiState from "../hooks/use-api-state";
import { useEffect } from "react";
import { Constants } from "../../../contants";
import { IProductResponse } from "@/models/api/response/product.response";
import ProductCard from "../components/card/product-card";

export default function ProductListingPage() {
    const [products, setProducts, callProductsApi, loading, error] = useApiState<Product[] | null>(null);

    async function fetchAllProducts() {
        callProductsApi(async function () {
            let url = Constants.API_BASE + 'product';
            const res = await fetch(url);
            const body = await res.json();
            const products = body.map((p: IProductResponse) => new Product(p));
            setProducts(products);
        })
    }
    useEffect(() => {
        fetchAllProducts();
    }, []);

    return <div style={{ display: "flex", justifyContent: 'center', flexWrap: "wrap", gap: 20 }}>
        {loading && <p>Loading...</p>}
        {!loading && error && <p>{error}</p>}
        {products && products.length === 0 && <p>No items available</p>}
        {products && products.map(p => <ProductCard key={p.id} data={p}></ProductCard>)}
    </div>
}