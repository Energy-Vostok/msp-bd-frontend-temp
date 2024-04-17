import styles from './AddTechnicForm.module.scss';
import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {getCategory} from "../api/categories.api.ts";
import {createTechnic} from "../api/technic.api.ts";

interface Props {
    id: number;
}

type AddForm = {
    name: string;
    city: string;
    price: {
        withTax: number | null,
        withoutTax: number | null,
        cash: number | null
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
            email: string | null,
            role: string
        }
    };
    files: FileList | [];
}

const AddTechnicForm = ({ id }: Props) => {
    const [properties, setProperties] = useState<string[]>([]);
    // const [contactsCount, setContactsCount] = useState<number>(1);
    const [propertiesToPost, setPropertiesToPost] = useState<{id: number, value: string}[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        handleSubmit,
        register,
        setValue,
        reset,
        formState: { errors, isValid },
        watch
    } = useForm<AddForm>({
        defaultValues: {
            categoryId: id,
            price: {
                withTax: null,
                withoutTax: null,
                cash: null
            },
            company: {
                contacts: {
                    email: null
                }
            },
            files: []
        }
    });

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

    useEffect(() => {
        setValue("propertyValues", propertiesToPost);
    }, [propertiesToPost]);

    useEffect(() => {
        setValue("categoryId", id);
    }, [id])

    const submit: SubmitHandler<AddForm> = async (data) => {
        const formattedData = {
            ...data,
            categoryId: Number(data.categoryId),
            price: {
                withTax: Number(data.price.withTax),
                withoutTax: Number(data.price.withoutTax),
                cash: Number(data.price.cash),
            }
        }

        if (!formattedData.company.contacts.email) {
            delete formattedData.company.contacts.email;
        }
        if (!formattedData.price.withTax) {
            delete formattedData.price.withTax;
        }
        if (!formattedData.price.withoutTax) {
            delete formattedData.price.withoutTax;
        }
        if (!formattedData.price.cash) {
            delete formattedData.price.cash;
        }

        const formData = new FormData();

        if (formattedData.files.length > 0) {
            for (let i = 0; i < data.files.length; i++) {
                formData.append('files', data.files[i]);
            }
        } else {
            formData.append('files', []);
        }

        delete formattedData['files'];

        formData.append('data', JSON.stringify(formattedData));

        createTechnic(formData);

        alert('Отправлено');

        // reset({name: '', city: '', propertyValues: []});

        const fetchProperties = async () => {
            setIsLoading(true);

            const data = await getCategory(id);

            setProperties(data.properties);

            setIsLoading(false);
        }

        setPropertiesToPost([]);
        fetchProperties();
    }

    const inputPropertyHandler = (e) => {

        const value = e.target.value;
        const propertyId = Number(e.target.dataset.propertyid);

        const propertyToAdd = {"value": value, "propertyId": Number(propertyId)};

        const clearPropertiesToPost = propertiesToPost.filter(e => { return e.propertyId !== propertyId });

        setPropertiesToPost([...clearPropertiesToPost, propertyToAdd]);

        setValue("propertyValues", propertiesToPost);
    }

    return (
        <>
            { id > 0
                ? <form onSubmit={handleSubmit(submit)} className='formWrapper'>
                    <label>
                        Название
                        <input type="text" {...register("name", {
                            required: 'Данное поле является обязательным',
                            minLength: {
                                value: 2,
                                message: 'Длина должна быть больше 2 символов'
                            }
                        })}/>
                    </label>
                    <div>{errors?.name && <p className={styles.error}>{errors?.name?.message || 'Ошибка'}</p>}</div>

                    <label>
                        Город
                        <input type="text" {...register("city", {
                            required: 'Данное поле является обязательным',
                            minLength: {
                                value: 2,
                                message: 'Длина должна быть больше 2 символов'
                            }
                        })}/>
                    </label>
                    <div>{errors?.city && <p className={styles.error}>{errors?.city?.message || 'Ошибка'}</p>}</div>

                    <h3>Характеристики</h3>

                    {
                        isLoading
                            ? <h2>Загрузка...</h2>
                            : <>
                            {
                                properties.map(p => (
                                <label>{p.name}
                                    <input type="text" data-propertyid={p.id} onBlur={inputPropertyHandler} />
                                </label>
                                ))
                            }
                            </>
                    }

                    <h3>Цена</h3>
                    <label>
                        С НДС
                        <input type="number" {...register("price.withTax")}
                            onChange={(e) => {
                                const value = e.target.value;

                                if (value) {
                                    setValue("price.withTax", parseInt(value))
                                }
                            }}
                        />
                    </label>
                    <label>
                        Без НДС
                        <input type="number" {...register("price.withoutTax")}
                               // onChange={(e) => {
                               //     const value = e.target.value;
                               //
                               //     console.log(typeof value);
                               //     console.log(typeof +value);
                               //
                               //     setValue("price.withoutTax", +value)
                               // }}
                        />
                    </label>
                    <label>
                        Наличные
                        <input type="number" {...register("price.cash")}
                               // onChange={(e) => {
                               //     const value = e.target.value;
                               //
                               //     setValue("price.cash", Number(value))
                               // }}
                        />
                    </label>

                    <h3>Компания</h3>
                    <label>Название
                        <input type="text" {...register("company.name", {
                            required: 'Данное поле является обязательным',
                            minLength: 2
                        })}/>
                    </label>

                    <label>ИНН
                        <input type="number" {...register("company.inn", {
                            required: 'Данное поле является обязательным',
                            minLength: 10,
                            maxLength: 12
                        })}/>
                    </label>

                    <h3>Контакты</h3>
                    <label>ФИО
                        <input type="text" {...register("company.contacts.fullName")}/>
                    </label>
                    <label>Телефон c +7
                        <input type="text" {...register("company.contacts.phone", {
                            required: 'Данное поле обязательно',
                            pattern: /(\+7)[\d]{10}/
                        })}/>
                    </label>
                    <label>Email
                        <input type="text" {...register("company.contacts.email")}/>
                    </label>
                    <label>Должность
                        <input type="text" {...register("company.contacts.role", {
                            required: true
                        })}/>
                    </label>

                    {/*{*/}
                    {/*    Array.from({ length: contactsCount }, (_, index) => (*/}
                    {/*        <div key={index}>*/}
                    {/*            <label>ФИО*/}
                    {/*                <input type="text"/>*/}
                    {/*            </label>*/}
                    {/*            <label>Телефон*/}
                    {/*                <input type="text"/>*/}
                    {/*            </label>*/}
                    {/*            <label>Email*/}
                    {/*                <input type="text"/>*/}
                    {/*            </label>*/}
                    {/*            <label>Должность*/}
                    {/*                <input type="text"/>*/}
                    {/*            </label>*/}
                    {/*        </div>*/}
                    {/*    ))*/}
                    {/*}*/}
                    {/*<button type='button' onClick={() => setContactsCount(prev => prev + 1)}>+</button>*/}

                    <h3>Фотографии</h3>
                    <input multiple type="file" {...register("files")}/>

                    <button disabled={!isValid}>Отправить</button>
                </form>
                : <h2>Выберите тип техники</h2>
            }
        </>
    );
};

export default AddTechnicForm;