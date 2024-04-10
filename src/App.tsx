import DropdownMenu from "./modules/DropdownMenu.tsx";
import {Route, Routes} from "react-router-dom";
import AddTechnicForm from "./modules/AddTechnicForm.tsx";
import AddParentCategoryForm from "./pages/AddParentCategoryForm.tsx";
import AddChildrenCategoryForm from "./pages/AddChildrenCategoryForm.tsx";
import AddTechnic from "./pages/AddTechnic.tsx";

function App() {
    return (
        <div className='App'>
            <DropdownMenu />
            <Routes>
                <Route path='/new' element={<AddTechnic />} />
                <Route path='/new/parent-category' element={<AddParentCategoryForm />} />
                <Route path='/new/category' element={<AddChildrenCategoryForm />} />
            </Routes>
        </div>
    )
}

export default App
