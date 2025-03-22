import ProductCardClient from "../components/clients/product-card";
import ProductCardServer from "../components/server/product-card-server";

interface IProduct {
    id: string;
    title: string;
    thumbnail: string;
}
export const  revalidate = 60;
async function fetchProducts() {
    const res = await fetch('https://dummyjson.com/products', {
        cache: 'force-cache'
    });
    const data = await res.json();
    return data.products as IProduct[];
}

export default async function Page() {
    let data: IProduct[] | null = null;
    data = await fetchProducts();

    return <div>
        <h1>Products Listing in SSG</h1>
        <ul>{data && data?.map(p => <li key={p.id}>{p.title}</li>)}</ul>
    </div>
}
