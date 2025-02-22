import style from "./HeaderMain.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useState } from "react";
export default function HeaderMain() {
    const [modal, setModal] = useState(false)
    return (
        <div className={style.header}>
            <Logo />
            <div className={style.first_modal} >
                <button className={style.customMenuButton} onClick={() => {
                    setModal(prev => !prev)
                    console.log(modal)
                }} > Login/Registrati</button>
                {modal && <div className={style.modal}>
                    <NavLink className={style.btn_modal} to='/owners'><FontAwesomeIcon icon={faCircleUser} style={{ color: "#bc3636" }} />Proprietario</NavLink>
                    <NavLink className={style.btn_modal} ><FontAwesomeIcon icon={faCircleUser} style={{ color: "#bc3636" }} />Utente</NavLink>

                </div>}
            </div>
        </div >
    )
}
