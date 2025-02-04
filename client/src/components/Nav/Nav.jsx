import { NavLink } from "react-router-dom";
import style from './Nav.module.css';
import { useContext } from "react";
import { useParams } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";

export default function Nav() {
    const { sidebarUserOrOwner, } = useContext(GlobalContext);
    const { id } = useParams();
    return (
        <nav className={`${style.nav}`}>
            <ul className={`p-0 ${style.navlink}`}>

                {/* Primo elemento sempre visibile */}
                <li className={style.customList}>
                    <NavLink className={({ isActive }) => `${style.link} ${isActive ? style.active : ""} text-decoration-none text-white fw-bold`}
                        to='/'>Tutte le case</NavLink>
                </li>

                {/* Mostra questi due elementi solo quando !sidebarUserOrOwner */}
                {!sidebarUserOrOwner && (
                    <>
                        <li className={style.customList}>
                            <NavLink className={({ isActive }) => `${style.link} ${isActive ? style.active : ""} text-decoration-none text-white fw-bold`}
                                to={`/owners/${id}`} >Le tue proprietà</NavLink>
                        </li>
                        <li className={style.customList}>
                            <NavLink className={({ isActive }) => `${style.link} ${isActive ? style.active : ""} text-decoration-none text-white fw-bold`}
                                to={`/owners/${id}/add-property`}>Aggiungi struttura</NavLink>
                        </li>
                    </>
                )}

            </ul>
        </nav>
    );
}
