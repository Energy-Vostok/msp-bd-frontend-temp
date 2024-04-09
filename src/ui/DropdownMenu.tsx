import styles from './DropdownMenu.module.scss';
import type {NavType} from "../utils/NavItem.type.ts";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {getAllCategories} from "../api/categories.api.ts";

const DropdownItem = ({ mainElement, children }: NavType) => {
    return (
            <ul className={styles.menu}>
                <li className={styles.menu__title}>
                    <h3>{mainElement}</h3>
                </li>
                <div className={styles.menu__dropdown}>
                    { children.map(item => (
                        <Link to={item.url} key={item.title}>
                            <li className={styles.menu__item}>
                                {item.title}
                            </li>
                        </Link>
                    )) }
                </div>
            </ul>
    );
}

const DropdownMenu = () => {
    useEffect( () => {
        const fetchCategories = async () => {
            const data = await getAllCategories();

            console.log(data);
        }

        fetchCategories();
    }, []);

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
        <nav className={styles.navbar}>
            {/*<div className={styles.navbar__categories}>*/}
                {
                    data.map(e => (
                        <DropdownItem mainElement={e.mainElement} children={e.children} key={e.mainElement} />
                    ))
                }
            {/*</div>*/}
            <Link to='/new'>Добавить технику</Link>
        </nav>
    )
}

export default DropdownMenu;