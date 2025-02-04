import GlobalContext from "../../context/GlobalContext"
import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import HouseCard from "../HouseCard/HouseCard"
import { Link, useSearchParams, useLocation } from "react-router-dom"
import Loader from "../Loader/Loader"

export default function HouseList() {


    const { houses, setHouses, searchedCity, fetchHouses } = useContext(GlobalContext)

    const location = useLocation();





    // useEffect(() => {
    //     fetchHouses()
    // }, []);

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





    return (

        !houses ? (<Loader />) : houses.length > 0 ?

            (<div className="container">
                <div className="row d-flex flex-wrap row-gap-5 pb-5">
                    {houses.map((house, i) => (
                        <div key={i} className="col-lg-4 col-md-6 col-xs-12">
                            <Link className="text-decoration-none text-dark" to={`/${house.title.replace(/ /g, '-')}`} >
                                <HouseCard content={house} />
                            </Link>


                        </div>
                    ))}
                </div>
            </div>) :
            (<h1 className="text-center">La ricerca non ha prodotto risultati</h1>)



    )
}