'use client';
import { useState } from "react";
interface IProps {
    name: string;
}

export default function ProductCardClient(props: IProps) {
    const [name, setName] = useState<string | null>(props.name ?? null);
    return (
        <div>
            <h1>Product Card Client Comp</h1>
            <p>Product Name: {name}</p>
        </div>
    )
}