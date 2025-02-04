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
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Inserisci la città..."
                    name="city"
                    value={searchedCity}
                    onChange={(e) => setSearchedCity(e.target.value)}
                />
                <button
                    className={`btn text-white ${style.customBtn}`}
                    onClick={handleSearch}
                >
                    Cerca
                </button>
            </div>
        </div>
    );
}
