import { useContext, useState, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import style from "./SearchBar.module.css"

export default function SearchBar() {
    const { searchedCity, setSearchedCity, fetchHouses, filters, setFilters, setSearchParams } = useContext(GlobalContext);


    function handleSearch(e) {
        const { name, value } = e.target;
        const newFilters = {
            ...filters,
            city: searchedCity
        };
        setFilters(newFilters);
        setSearchParams(newFilters);
        console.log('ciao')
        // fetchHouses()
    }

    useEffect(() => {

        const searchParams = new URLSearchParams(location.search);
        const queryParams = {};

        // for (const [key, value] of searchParams.entries()) {
        //     if (value && value !== "null") { // Ignora i parametri vuoti o "null"
        //         queryParams[key] = isNaN(value) ? value : Number(value); // Converte numeri
        //     }
        // }

        for (const key of searchParams.keys()) {
            const values = searchParams.getAll(key); // Ottieni tutti i valori della chiave

            if (values.length > 1) {
                queryParams[key] = values.map(value => (isNaN(value) ? value : Number(value)));
            } else {
                const value = values[0];
                if (value && value !== "null") {
                    queryParams[key] = isNaN(value) ? value : Number(value);
                }
            }
        }
        //console.log("Parametri della query:", queryParams);
        //fetchHouses(queryParams)

    }, [location.search]);



    return (
        <div className={`container  mb-5 ${style.padding_top}`}>
            <div className="input-group d-flex align-items-center">
                <input
                    type="text"
                    className={`form-control mx-5 rounded ${style.bar}`}
                    placeholder="Inserisci la città..."
                    name="city"
                    value={searchedCity}
                    onChange={(e) => setSearchedCity(e.target.value)}
                />
                <button
                    className={`text-white mx-3 ${style.customBtn}`}
                    onClick={handleSearch}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        style={{ width: "40px", height: "40px" }} // Stili inline
                        className="text-white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>


                </button>
            </div>
        </div>
    );
}
