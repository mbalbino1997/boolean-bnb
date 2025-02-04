import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import style from './HeaderOwners.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import GlobalContext from "../../context/GlobalContext";

export default function HeaderOwners({ ownerId, onLogout, firstName, lastName }) {
    const { setSidebarUserOrOwner, headerTitle } = useContext(GlobalContext);
    const [showPopover, setShowPopover] = useState(false);
    const menuButtonRef = useRef(null);
    const navigate = useNavigate();


    const handleOption = (option) => {
        setShowPopover(false);
        if (option === "messages") {
            navigate(`/owners/${ownerId}/messages`);
        } else if (option === "profile") {
            navigate(`/owners/${ownerId}/owners-data`);
        } else if (option === "logout") {
            localStorage.removeItem("token");
            onLogout();
        }
    };


    const popover = (
        <Popover id="popover-basic" className={style.customPopover}>
            <Popover.Body>
                <ul className="list-group">
                    <li className={`list-group-item ${style.menuItem}`} onClick={() => handleOption("messages")}>
                        I miei messaggi
                    </li>
                    <li className={`list-group-item ${style.menuItem}`} onClick={() => handleOption("profile")}>
                        Dati personali
                    </li>
                    <li className={`list-group-item text-danger ${style.menuItem}`} onClick={() => handleOption("logout")}>
                        Esci
                    </li>
                </ul>
            </Popover.Body>
        </Popover>
    );

    return (
        <header className={`d-flex justify-content-around align-items-center rounded-0 ${style.header}`}>
            <h3 className={style.custom_margin_left}>{headerTitle ? (`Benvenuto, ${firstName} ${lastName}`) : "Area messaggi"}</h3>


            <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popover}
                show={showPopover}
                onToggle={() => setShowPopover(!showPopover)}
            >
                <Button
                    ref={menuButtonRef}
                    variant="primary"
                    onClick={() => setSidebarUserOrOwner(false)}
                    className={style.customMenuButton}
                >
                    <FontAwesomeIcon icon={faCircleUser} style={{ color: "#ffffff" }} /> Menu
                </Button>
            </OverlayTrigger>
        </header>
    );
}
