import AddTechnicForm from "../modules/AddTechnicForm.tsx";
import {useEffect, useState} from "react";
import {getAllCategories} from "../api/categories.api.ts";
function AddTechnic() {
    const [categoriesList, setCategoriesList] = useState<{id: number, name: string}[]>([]);
    const [choosedCategory, setChoosedCategory] = useState<number>(-1);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getAllCategories();

            const categoriesToList: {id: number, name: string}[] = [];

            for (const categories of data) {
                for (const i of categories.children) {
                    categoriesToList.push(i);
                }
            }

            setCategoriesList(categoriesToList);
        }

        fetchCategories();
    }, []);

    const chooseCategoryHandler = (e) => {
        const value = e.target.value;

        setChoosedCategory(value);
    }

    return (
        <div>
            <h1>Добавить технику</h1>

            <select onChange={chooseCategoryHandler}>
                <option value={-1}>Не выбрано</option>
                {
                    categoriesList.map(c => (
                        <option value={c.id} key={c.id}>{c.name}</option>
                    ))
                }
            </select>

            <AddTechnicForm id={choosedCategory}/>
        </div>
    );
}

export default AddTechnic;