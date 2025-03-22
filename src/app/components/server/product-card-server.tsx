interface IProps {
    name: string;
}

export default function ProductCardServer(props: IProps) {
    return (
        <div>
            <h1>Product Card Client Comp</h1>
            <p>Product Name: {props.name}</p>
        </div>
    )
}