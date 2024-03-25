import DropdownMenu from "./ui/DropdownMenu.tsx";
import type {NavType} from "./utils/NavItem.type.ts";

function App() {
    const data: NavType[] = [
        {
            mainElement: 'Земляные', children: [
                {title: 'Экскаватор', url: '/1'},
                {title: 'Погрузчик', url: '/3'},
                {title: 'Буровая', url: '/4'},
            ]
        },
        {
            mainElement: 'Дорожные', children: [
                {title: 'Асфальтоукладчик', url: '/1'},
                {title: 'Грейдер', url: '/2'},
                {title: 'Каток', url: '/3'},
                {title: 'Комунальная', url: '/4'},
            ]
        },
        {
            mainElement: 'Дорожные', children: [
                {title: 'Грейдер', url: '/2'},
                {title: 'Каток', url: '/3'},
                {title: 'Комунальная', url: '/4'},
            ]
        },
        {
            mainElement: 'Дорожные', children: [
                {title: 'Грейдер', url: '/2'},
                {title: 'Каток', url: '/3'},
                {title: 'Комунальная', url: '/4'},
            ]
        },
    ]

    return (
        <div className='App'>
            <DropdownMenu data={data}/>
        </div>
    )
}

export default App
