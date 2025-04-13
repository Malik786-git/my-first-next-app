import styles from './product.module.scss';
import Link from 'next/link';
interface IProps {
    data: any
}
export default function ProductCard(props: IProps) {
    return <Link href={`/product-detail?id=${props.data.id}`}><div className={styles.product_card}>
        <figure>
        </figure>
        <div>
            <p>{props.data.name}</p>
            <p>{props.data.price_label}</p>
        </div>
    </div></Link>
}