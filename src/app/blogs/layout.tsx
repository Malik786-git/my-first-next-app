import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Devtrio Blogs",
    description: "Explore best deals and offer on Devtrio Shopping store",
    authors: [{ name: "Devtrio", url: "devtrio.pro" }], // for blogs post only..
    openGraph: {
        title: "Graph Devtrio Blogs",
        description: "Graph Explore best deals and offer on Devtrio Shopping store",
        url: "https://my-first-next-app-one-gamma.vercel.app/products",
        siteName: "Graph Devtrio",
        images: [
            {
                url: 'https://my-first-next-app-one-gamma.vercel.app/shopping.jpeg',
                alt: "Devtrio Blogs",
            }
        ],
    },
    twitter: {
        images: [
            {
                url: 'https://my-first-next-app-one-gamma.vercel.app/shopping.jpeg',
                alt: "Devtrio Blogs",
            }
        ],
    }
}


export default function BlogListingPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
