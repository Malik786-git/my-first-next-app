import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Devtrio E Shopping Store",
    description: "Explore best deals and offer on Devtrio E shopping store",
    authors: [{ name: "Devtrio", url: "devtrio.pro" }], // for blogs posts
    openGraph: {
        title: "Graph Devtrio E Shopping Store",
        description: "Graph Explore best deals and offer on Devtrio E shopping store",
        url: "https://my-first-next-app-one-gamma.vercel.app/products",
        siteName: "Graph Devtrio",
        images: [
            {
                url: "/shopping.jpeg",
                alt: "Devtrio E Shopping Store",
            },
        ],
    },
    twitter: {
        images: [
            {
                url: "/shopping.jpeg",
                alt: "Devtrio E Shopping Store",
            },
        ],
    }
}


export default function ProductListingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <main>{children}</main>
}