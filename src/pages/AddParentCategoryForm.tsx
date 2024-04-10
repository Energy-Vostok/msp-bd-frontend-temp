import {SubmitHandler, useForm} from "react-hook-form";
import {createCategory} from "../api/categories.api.ts";
import {Link} from "react-router-dom";

interface IForm {
    name: string
}

const AddTechnicForm = () => {
    const {
        handleSubmit,
        register,
        reset
    } = useForm<IForm>();

    const submit: SubmitHandler<IForm> = async (data) => {
        await createCategory(data);

        reset();
    }

    return (
        <>
            <h1>Добавить большую категорию</h1>
            <form onSubmit={handleSubmit(submit)}>

                <Link to='/new/category'>
                    <button type='button'>Добавить категорию</button>
                </Link>

                <label>
                    <input type="text" {...register("name", {required: true})} placeholder='Земляные'/>
                </label>

                <button>Отправить</button>
            </form>
        </>
    );
};

export default AddTechnicForm;