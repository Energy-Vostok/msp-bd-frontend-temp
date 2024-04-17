import {useParams} from "react-router-dom";
import styles from '../components/TechnicList.module.scss';
import {useEffect, useState} from "react";
import {getTechnicByCategory} from "../api/technic.api.ts";
import TechnicListItem from "../components/TechnicListItem.tsx";

function TechnicListPage() {
    const [techincList, setTechnicList] = useState([]);
    const [title, setTitle] = useState<string>('');
    const { id } = useParams();

    useEffect(() => {
        const fetchTechnic = async () => {
            const data = await getTechnicByCategory(id);

            setTitle(data.name);
            setTechnicList(data.goods);
        }

        fetchTechnic();
    }, [id]);

    return (
        <div>
            <h1>{title}</h1>
            <ul>
                <li className={`${styles.wrapper} ${styles.header}`}>
                    <div>Фото</div>
                    <div>Название</div>
                    <div>Город</div>
                    <div>Наличные</div>
                    <div>С НДС</div>
                    <div>Без НДС</div>
                </li>
                {
                    techincList.map(t => (
                        <li key={t.id}>
                            <TechnicListItem id={t.id} city={t.city} name={t.name} images={t.images} price={t.price} />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default TechnicListPage;