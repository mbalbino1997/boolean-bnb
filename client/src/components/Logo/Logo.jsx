import LogoBoolBnb from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import style from "./Logo.module.css";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

export default function Logo() {
    const { setSearchedCity, fetchHouses, filters, setFilters, setSearchParams, setSelectedSize, setSelectedPrice, setSelectedRoomNumbers, setSelectedBeds, setSelectedBathrooms } = useContext(GlobalContext);
    return (
        <div className={style.logoContainer}>
            <Link
                to="/"
                onClick={() => {
                    setSearchedCity("");
                    //fetchHouses();
                    setFilters({
                        city: "",
                        rooms: "",
                        beds: "",
                        bathrooms: "",
                        size: "",
                        price: ""
                    });
                    setSelectedPrice([0, 5000]);
                    setSelectedSize([0, 3000]);
                    setSelectedRoomNumbers(null);
                    setSelectedBeds(null);
                    setSelectedBathrooms(null);
                }}
            >
                <img className={style.logoImage} src={LogoBoolBnb} alt="Logo Boolbnb" />
            </Link>
        </div>
    );
}
