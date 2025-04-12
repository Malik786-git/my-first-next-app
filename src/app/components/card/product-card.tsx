import { Product } from '@/models/app/product.model';
import styles from './product.module.scss';
import Image from 'next/image';
import ImageFallBack from '../common/image-fallback';
interface IProps {
    data: Product
}
export default function ProductCard(props: IProps) {
    return <div className={styles.product_card}>
        <figure>
            <ImageFallBack src={props.data.image} className={styles.product_img} alt={'product img'} width={300} height={300}></ImageFallBack>
        </figure>
        <div>
            <p>{props.data.name}</p>
            <p>{props.data.price_label}</p>
        </div>
    </div>
}