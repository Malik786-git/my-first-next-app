
interface IUsers {
    id: string;
    name: string;
}
// export const revalidate = 60;

async function fetchProducts() {
    const res = await fetch('https://devtrio-server.vercel.app/api/contact/all', {
        cache: 'force-cache',
        next:{revalidate: 60},
        method: 'POST',
        headers: {
            'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkNzQ0ODEyOWEzNDE2ZGU3OGUxNjNiIn0sImlhdCI6MTc0MjY3NTg4NiwiZXhwIjo0ODY2ODc4Mjg2fQ.xMyWzH0LY727qVM-10V1rFns7gErBxVreoiRFQhxJ6Y',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name: '',
            email: '',
            phone: '',
            message: '',
            type: '',
            packageName: '',
            take: 50,
            skip: 0
        }),

    })
    const data = await res.json();
    return data.data as IUsers[];
}

export default async function Page() {
    let data: IUsers[] | null = null;
    data = await fetchProducts();

    return <div>
        <h1>Users Listing</h1>
        <ul>{data && data?.map(p => <li key={p.id}>{p.name}</li>)}</ul>
    </div>
}
