import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import HouseCard from "../../components/HouseCard/HouseCard";
import HouseForm from "../../components/HouseForm/HouseForm";
import style from './OwnerShowpage.module.css';
import axios from "axios";
import HeaderOwners from "../../components/headerOwners/HeaderOwners";
import useLogout from "../../hook/useLogout";


export default function OwnerShowpage() {
    const { owner, setOwner, setSidebarUserOrOwner, setHeaderTitle } = useContext(GlobalContext);

    const logout = useLogout()


    const navigate = useNavigate();
    const { id } = useParams();
    function fetchOwner() {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token non trovato");
            navigate("/login");
            return;
        }

        axios.get('http://localhost:3000/api/boolbnb/owner', {
            headers: {
                Authorization: `Bearer ${token}` // Aggiungi il token come intestazione
            }
        })
            .then(res => {
                console.log(res.data);
                setOwner(res.data); // Imposta l'owner nello stato
                setSidebarUserOrOwner(false);
                setHeaderTitle(true);
            })
            .catch(err => {
                console.error(err);
                if (err.response && err.response.status === 401) {
                    navigate("/login"); // Reindirizza al login in caso di errore 401
                }
            });
    }




    useEffect(() => {
        fetchOwner();
    }, []);

    if (!owner) {
        return <div>Loading...</div>;
    }

    const { first_name, last_name, email, propertiesOwned } = owner;

    return (
        <section className={`flex-grow-1 ${style.page}`}>
            <HeaderOwners ownerId={id} onLogout={logout} firstName={first_name} lastName={last_name} />
            <div className={`card  ${style.customCard}`}>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <h3 className="mb-3">I tuoi immobili:</h3>
                            {propertiesOwned?.length > 0 ? (
                                <div className="row g-3">
                                    {propertiesOwned.map((property, i) => (
                                        <div key={i} className="col-12 col-md-6 col-lg-4">
                                            <HouseCard content={property} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-white">Nessuna proprietà trovata.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
