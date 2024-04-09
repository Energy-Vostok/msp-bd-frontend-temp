import DropdownMenu from "./ui/DropdownMenu.tsx";
import {Route, Routes} from "react-router-dom";
import AddTechnicForm from "./modules/AddTechnicForm.tsx";
import AddParentCategoryForm from "./modules/AddParentCategoryForm.tsx";
import AddChildrenCategoryForm from "./modules/AddChildrenCategoryForm.tsx";
// import AddTechnicForm from "./modules/AddTechnicForm.tsx";

function App() {
    return (
        <div className='App'>
            <DropdownMenu />
            <Routes>
                <Route path='/new' element={<AddTechnicForm />} />
                <Route path='/new/parent-category' element={<AddParentCategoryForm />} />
                <Route path='/new/category' element={<AddChildrenCategoryForm />} />
            </Routes>
        </div>
    )
}

export default App
