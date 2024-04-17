import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getTechnic} from "../api/technic.api.ts";

interface ITechnicPage {
    name: string,
    city: string,
    images: { id: number, url: string }[],
    price: {
        cash: number | null,
        withTax: number | null,
        withoutTax: number | null,
    },
    propertyValues: { id: number, propertyId: number, value: string }[],
    company: {
        name: string,
        inn: string,
        contacts: {
            id: number,
            fullName: string,
            phone: string,
            email: string,
            role: string
        }[]
    }
}

function TechnicPage() {
    const [technicData, setTechnicData] = useState<ITechnicPage>({
        name: '',
        city: 'string',
        images: [],
        price: {
            cash: null,
            withTax: null,
            withoutTax: null,
        },
        propertyValues: [],
        company: {
            name: '',
            inn: '',
            contacts: []
        }
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        const fetchTechnic = async () => {
            const data = await getTechnic(id);

            console.log(data);

            setTechnicData(data);
            setIsLoading(false);
        }

        fetchTechnic();
    }, [id]);

    return (
        <div>
            {
                isLoading && technicData
                    ? <h2>Loading...</h2>
                    : <>
                        <h1>{technicData.name}</h1>
                        <div>{technicData.city}</div>
                        <ul>
                            {
                                technicData.images && technicData.images.map(i => (
                                    <li key={i.url}>
                                        <img src={i.url} alt={`${i.id}`} />
                                    </li>
                                ))
                            }
                        </ul>
                        <div>
                            <div>Наличные</div>
                            <div>{technicData.price.cash}</div>
                        </div>
                        <div>
                            <div>С НДС</div>
                            <div>{technicData.price.withTax}</div>
                        </div>
                        <div>
                            <div>Без НДС</div>
                            <div>{technicData.price.withoutTax}</div>
                        </div>
                        <ul>
                            {
                                technicData.propertyValues && technicData.propertyValues.map(p => (
                                    <li key={p.propertyId}>
                                        <div>{p.value}</div>
                                    </li>
                                ))
                            }
                        </ul>
                        <h3>{technicData.company.name}</h3>
                        <div>{technicData.company.inn}</div>
                        <h3>Контакты</h3>
                        <ul>
                            {
                                technicData.company.contacts.map(c => (
                                    <li key={c.id}>
                                        <div>ФИО: {c.fullName}</div>
                                        <div>Телефон: {c.phone}</div>
                                        <div>Email: {c.email}</div>
                                        <div>Должность: {c.role}</div>
                                    </li>
                                ))
                            }
                        </ul>
                    </>
            }
        </div>
    );
}

export default TechnicPage;