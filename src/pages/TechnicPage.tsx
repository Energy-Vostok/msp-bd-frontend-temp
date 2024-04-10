import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getTechnicByCategory} from "../api/categories.api.ts";

function TechnicPage() {
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
                {
                    techincList.map(t => (
                        <li key={t.id}>{t.name}</li>
                    ))
                }
            </ul>
        </div>
    );
}

export default TechnicPage;