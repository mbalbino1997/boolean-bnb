import GlobalContext from "../../context/GlobalContext"
import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import HouseCard from "../HouseCard/HouseCard"
import { Link, useSearchParams, useLocation } from "react-router-dom"
import Loader from "../Loader/Loader"
import style from "./HouseList.module.css"
import Filters from "../Filters/Filters"

export default function HouseList() {
    const { houses, setHouses, searchedCity, fetchHouses, setSearchedCity, filters, setFilters, setSearchParams } = useContext(GlobalContext)

    const location = useLocation();

    function handleSearch(e) {
        const { name, value } = e.target;
        const newFilters = {
            ...filters,
            city: searchedCity
        };
        setFilters(newFilters);
        setSearchParams(newFilters);
        // fetchHouses()
    }
    useEffect(() => {

        const searchParams = new URLSearchParams(location.search);
        const queryParams = {};

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
        console.log("Parametri della query:", queryParams);
        fetchHouses(queryParams)

    }, [location.search]);





    return (<>
        {!houses ? (<Loader />) : houses.length > 0 ?
            (<div className={style.main_wrapper}>
                <div className={style.search_sidebar}>
                    <div className={style.search}>

                        <input type="text"
                            placeholder="Cerca per città..."
                            name="city"
                            value={searchedCity}
                            onChange={(e) => setSearchedCity(e.target.value)} />
                        <button onClick={handleSearch}><img src="search.png" alt="" /></button>
                    </div>
                    <Filters />
                </div>
                <div className="flex-grow-1">
                    <div className={style.house_type_bar}>
                        <button>Appartamento</button>
                        <button>Casa indipendente</button>
                        <button>Villa</button>
                        <button>Villetta a schiera</button>
                        <button>Chalet</button>
                        <button>Baita</button>
                    </div>
                    <div className="container">
                        <div className="row d-flex flex-wrap row-gap-5 mt-5 pb-5">
                            {houses.map((house, i) => (
                                <div key={i} className="col-lg-3 col-md-6 col-xs-12">
                                    <Link className="text-decoration-none text-dark" to={`/${house.title.replace(/ /g, '-')}`}>
                                        <HouseCard content={house} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>

            </div>) :
            (<h1 className="text-center">La ricerca non ha prodotto risultati</h1>)
        }

    </>)
}