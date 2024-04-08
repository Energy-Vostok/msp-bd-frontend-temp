import DropdownMenu from "./ui/DropdownMenu.tsx";
import type {NavType} from "./utils/NavItem.type.ts";
import AddTechnicForm from "./modules/AddTechnicForm.tsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

function App() {
    // const router = createBrowserRouter([
    //     {
    //         path: "/",
    //         element: <Root />,
    //         loader: rootLoader,
    //         children: [
    //             {
    //                 path: "team",
    //                 element: <Team />,
    //                 loader: teamLoader,
    //             },
    //         ],
    //     },
    // ]);


    return (
        <div className='App'>
            <DropdownMenu />

            <AddTechnicForm />
        </div>
    )
}

export default App
