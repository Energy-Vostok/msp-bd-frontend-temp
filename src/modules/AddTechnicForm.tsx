import {SubmitHandler, useForm} from "react-hook-form";

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

const AddTechnicForm = () => {

    const {
        handleSubmit,
        register,
    } = useForm<AddForm>();

    const submit: SubmitHandler<AddForm> = async () => {
        const newData = {name: 'Земляные'};

        alert(JSON.stringify(newData));
        await fetch('http://51.250.115.182:8080/api/admin/category', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(newData)
        })
            .then((res) => console.log(res))
            .catch((e) => console.log(e))
    }

    return (
        <>
            <h1>Добавить новую технику</h1>
            <form onSubmit={handleSubmit(submit)}>
                <label>
                    Название
                    <input type="text" {...register("name")}/>
                </label>

                <label>
                    Город
                    <input type="text" {...register("city")}/>
                </label>

                <label>Цена</label>
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

                <label>Компания</label>

                <label>
                    Фотографии
                    <input type="file" multiple {...register("images")} />
                </label>


                <button>Отправить</button>
            </form>
        </>
    );
};

export default AddTechnicForm;