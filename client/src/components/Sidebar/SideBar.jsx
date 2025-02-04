import React, { useState } from 'react';
import Filters from "../Filters/Filters";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import style from './SideBar.module.css';
import GlobalContext from '../../context/GlobalContext';
import { useContext } from 'react';
export default function SideBar() {
    const [isOpen, setIsOpen] = useState(false); // Stato per controllare se la sidebar è aperta o chiusa
    const { sidebarUserOrOwner } = useContext(GlobalContext);
    const toggleSidebar = () => {
        setIsOpen(prevState => !prevState); // Cambia lo stato di apertura della sidebar
    };

    return (
        <div>
            {/* Bottone per aprire/chiudere la sidebar */}
            <button
                className={`${style.toggleButton} ${isOpen ? style.open : ''}`}
                onClick={toggleSidebar}
            >
                <i className="fa-solid fa-bars" style={{ color: 'rgb(247 243 233)', zIndex: '999', display: 'block', fontSize: '1rem' }}></i>
            </button>

            {/* Sidebar che si espande e si chiude */}
            <div className={`${style.sidebar} ${isOpen ? style.openSidebar : style.closedSidebar}`}>
                <Nav />
                {sidebarUserOrOwner &&
                    <Filters />}
            </div>
        </div>
    );
}
