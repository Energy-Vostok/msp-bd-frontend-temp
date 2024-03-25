import styles from './DropdownMenu.module.scss';
import type {NavType} from "../utils/NavItem.type.ts";
import {Link} from "react-router-dom";
interface Props {
    data: NavType[];
}

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

const DropdownMenu = ({data}: Props) => {
    return (
        <nav className={styles.navbar}>
            {
                data.map(e => (
                    <DropdownItem mainElement={e.mainElement} children={e.children} key={e.mainElement} />
                ))
            }
        </nav>
    )
}

export default DropdownMenu;