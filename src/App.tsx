import DropdownMenu from "./modules/DropdownMenu.tsx";
import {Route, Routes} from "react-router-dom";
import AddParentCategoryForm from "./pages/AddParentCategoryForm.tsx";
import AddChildrenCategoryForm from "./pages/AddChildrenCategoryForm.tsx";
import AddTechnic from "./pages/AddTechnic.tsx";
import TechnicPage from "./pages/TechnicPage.tsx";
import Main from "./pages/Main.tsx";

function App() {
    return (
        <div className='App'>
            <DropdownMenu />
            <Routes>
                <Route path='/' element={<Main />} />

                <Route path='/technic/:id' element={<TechnicPage />} />

                <Route path='/new' element={<AddTechnic />} />
                <Route path='/new/parent-category' element={<AddParentCategoryForm />} />
                <Route path='/new/category' element={<AddChildrenCategoryForm />} />
            </Routes>
        </div>
    )
}

export default App
