import {Link} from "react-router-dom";
import styles from './TechnicList.module.scss';

interface ITechnicListItem {
    id: number,
    city: string,
    name: string,
    images: {id: number, url: string}[],
    price: {
        cash: number | null,
        withTax: number | null,
        withoutTax: number | null,
    }
}

function TechnicListItem({
    id, city, name, images, price
                         }: ITechnicListItem) {
    return (
        <Link className={styles.wrapper} to={`/technic/${id}`}>
            {
                images.length > 0 && <img src={images[0].url} alt="Фото"/>
            }
            <h2>{name}</h2>
            <h3>{city}</h3>
            <div>{price.cash}</div>
            <div>{price.withTax}</div>
            <div>{price.withoutTax}</div>
        </Link>
    );
}

export default TechnicListItem;