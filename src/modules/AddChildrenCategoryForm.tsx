import {SubmitHandler, useForm} from "react-hook-form";
import {getAllCategories} from "../api/categories.api.ts";
import {useEffect, useState} from "react";

interface IForm {
    parentId: number,
    name: string,
    properties: { name: string }[]
}

const AddTechnicForm = () => {
    const [parentCategories, setParentCategories] = useState([]);
    const [propertiesCount, setPropertiesCount] = useState<number>(1);
    const [properties, setProperties] = useState([]);

    const {
        handleSubmit,
        register,
        reset,
        setValue
    } = useForm<IForm>();

    useEffect(() => {
        const getParentCategories = async () => {
            const response = await getAllCategories();

            setParentCategories(response);
        }

        getParentCategories();
    }, []);

    const submit: SubmitHandler<IForm> = async (data) => {
        console.log(data);
        reset();
    }

    const parentCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const parentId = e.target.value;

        setValue("parentId", parentId);
    }

    const propertyHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setProperties([...properties, {name: value}]);
    }

    console.log(properties);

    return (
        <>
            <h1>Добавить категорию</h1>
            <form onSubmit={handleSubmit(submit)} className='formWrapper'>

                <label>Родительская категория
                <select onChange={parentCategoryHandler}>
                    {
                        parentCategories.map(c => (
                            <option value={c.id} key={c.id}>{c.name}</option>
                        ))
                    }
                </select>
                </label>

                <label>Название категории
                    <input type="text" {...register("name", {required: true})} />
                </label>

                {
                    Array.from({ length: propertiesCount }, (_, index) => (
                        <label key={index}>
                            Характеристика
                            <input type="text" onBlur={propertyHandler}/>
                        </label>
                    ))
                }
                <button type='button' onClick={() => setPropertiesCount(prev => prev + 1)}>+</button>

                <button>Отправить</button>
            </form>
        </>
    );
};

export default AddTechnicForm;