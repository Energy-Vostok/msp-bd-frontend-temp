import {SubmitHandler, useForm} from "react-hook-form";
import {createCategory} from "../api/categories.api.ts";

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
                <label>
                    <input type="text" {...register("name", {required: true})} placeholder='Земляные'/>
                </label>

                <button>Отправить</button>
            </form>
        </>
    );
};

export default AddTechnicForm;