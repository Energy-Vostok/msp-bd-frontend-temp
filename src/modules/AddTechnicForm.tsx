import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {getCategory} from "../api/categories.api.ts";

interface Props {
    id: number;
}

type AddForm = {
    name: string;
    city: string;
    price: {
        withTax: number,
        withoutTax: number,
        cash: number
    };
    propertyValues: {
        value: string,
        propertyId: number
    }[];
    categoryId: number;
    company: {
        name: string,
        inn: string,
        contacts: {
            fullName: string,
            phone: string,
            email: string,
            role: string
        }[]
    };
    images: FileList | null;
}

const AddTechnicForm = ({ id }: Props) => {
    const [properties, setProperties] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        handleSubmit,
        register,
    } = useForm<AddForm>();

    useEffect(() => {
        const fetchProperties = async () => {
            setIsLoading(true);

            if (id > 0) {
                const data = await getCategory(id);

                setProperties(data.properties);
            } else {
                setProperties([]);
            }
            setIsLoading(false);
        }

        fetchProperties();
    }, [id]);

    const submit: SubmitHandler<AddForm> = async (data) => {
        console.log(data);
    }

    return (
        <>
            { id > 0
                ? <form onSubmit={handleSubmit(submit)} className='formWrapper'>
                    <label>
                        Название
                        <input type="text" {...register("name")}/>
                    </label>

                    <label>
                        Город
                        <input type="text" {...register("city")}/>
                    </label>

                    <h3>Характеристики</h3>

                    {
                        isLoading
                            ? <h2>Загрузка...</h2>
                            : <>
                            {
                                properties.map(p => (
                                <label>{p.name}
                                    <input type="text" />
                                </label>
                                ))
                            }
                            </>
                    }

                    <h3>Цена</h3>
                    <label>
                        С НДС
                        <input type="number" {...register("price.withTax")}/>
                    </label>
                    <label>
                        Без НДС
                        <input type="number" {...register("price.withoutTax")}/>
                    </label>
                    <label>
                        Наличные
                        <input type="number" {...register("price.cash")}/>
                    </label>

                    <h3>Компания</h3>


                    <button>Отправить</button>
                </form>
                : <h2>Выберите тип техники</h2>
            }
        </>
    );
};

export default AddTechnicForm;