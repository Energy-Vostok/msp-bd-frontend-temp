import styles from './DropdownMenu.module.scss';
import type {NavType} from "../utils/NavItem.type.ts";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllCategories} from "../api/categories.api.ts";

const DropdownItem = ({ name, children }: NavType) => {
    return (
            <ul className={styles.menu}>
                <li className={styles.menu__title}>
                    <h3>{name}</h3>
                </li>
                <div className={styles.menu__dropdown}>
                    { children.map(item => (
                        <Link to={`/technic-list/${item.id}`} key={item.name}>
                            <li className={styles.menu__item}>
                                {item.name}
                            </li>
                        </Link>
                    )) }
                </div>
            </ul>
    );
}

const DropdownMenu = () => {
    const [navData, setNavData] = useState([]);

    useEffect( () => {
        const fetchCategories = async () => {
            const data = await getAllCategories();

            setNavData(data);
        }

        fetchCategories();
    }, []);

    // const data: NavType[] = [
    //     {
    //         mainElement: 'Земляные', children: [
    //             {title: 'Экскаватор', url: '/1'},
    //             {title: 'Погрузчик', url: '/3'},
    //             {title: 'Буровая', url: '/4'},
    //         ]
    //     },
    //     {
    //         mainElement: 'Дорожные', children: [
    //             {title: 'Асфальтоукладчик', url: '/1'},
    //             {title: 'Грейдер', url: '/2'},
    //             {title: 'Каток', url: '/3'},
    //             {title: 'Комунальная', url: '/4'},
    //         ]
    //     },
    //     {
    //         mainElement: 'Дорожные', children: [
    //             {title: 'Грейдер', url: '/2'},
    //             {title: 'Каток', url: '/3'},
    //             {title: 'Комунальная', url: '/4'},
    //         ]
    //     },
    //     {
    //         mainElement: 'Дорожные', children: [
    //             {title: 'Грейдер', url: '/2'},
    //             {title: 'Каток', url: '/3'},
    //             {title: 'Комунальная', url: '/4'},
    //         ]
    //     },
    // ]

    return (
        <nav className={styles.navbar}>
            <Link to='/'>На главную</Link>
            {/*<div className={styles.navbar__categories}>*/}
                {
                    navData.map(e => (
                        <DropdownItem name={e.name} children={e.children} key={e.name} />
                    ))
                }
            {/*</div>*/}
            <Link to='/new'>Добавить технику</Link>
            <Link to='/new/category'>Добавить категорию</Link>
        </nav>
    )
}

export default DropdownMenu;