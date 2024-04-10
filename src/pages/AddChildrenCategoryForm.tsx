import {SubmitHandler, useForm} from "react-hook-form";
import {createCategory, getAllCategories} from "../api/categories.api.ts";
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

interface IForm {
    parentId: string,
    name: string,
    properties: { name: string }[]
}

const AddChildrenCategoryForm = () => {
    const [parentCategories, setParentCategories] = useState([]);
    const [propertiesCount, setPropertiesCount] = useState<number>(1);
    const [properties, setProperties] = useState([]);

    const parentIdRef = useRef();

    const {
        handleSubmit,
        register,
        reset,
        setValue
    } = useForm<IForm>({
        defaultValues: {
            parentId: '',
            name: '',
            properties: []
        }
    });

    useEffect(() => {
        const getParentCategories = async () => {
            const response = await getAllCategories();

            setParentCategories(response);
            setValue("parentId", response[0].id);
        }

        getParentCategories();
    }, []);

    const submit: SubmitHandler<IForm> = async (data) => {
        await createCategory({name: 'Грейдеры', parentId: 3, properties: [ {name: 'Тип'}, {name: 'Вес'}, {name: 'Навесное оборудование'} ]});

        // console.log(data);
        //
        // setPropertiesCount(1);
        // setProperties([]);
        //
        // reset();
    }

    const parentCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const parentId = e.target.value;

        setValue("parentId", parentId);
    }

    const propertyHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value) {
            setProperties([...properties, {name: value}]);
        }
    }

    return (
        <>
            <h1>Добавить категорию</h1>
            <form onSubmit={handleSubmit(submit)} className='formWrapper'>

                <Link to='/new/parent-category'>
                    <button type='button'>Добавить большую категорию</button>
                </Link>


                <label>Большая категория
                <select onChange={parentCategoryHandler} ref={parentIdRef}>
                    {
                        parentCategories.map(c => (
                            <option value={c.id} key={c.id}>{c.name}</option>
                        ))
                    }
                </select>
                </label>

                <label>Название категории
                    <input type="text" {...register("name")} />
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

                <button onClick={() => setValue("properties", properties)}>Отправить</button>
            </form>
        </>
    );
};

export default AddChildrenCategoryForm;