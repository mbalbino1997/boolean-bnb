import HouseForm from "../../components/HouseForm/HouseForm";
import { useParams } from "react-router-dom";
import style from '../OwnerShowPage/OwnerShowPage.module.css'
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import HeaderOwners from "../../components/headerOwners/HeaderOwners";
import useLogout from "../../hook/useLogout";

export default function AddProperty() {

    const logout = useLogout()

    const { owner, setHeaderTitle } = useContext(GlobalContext);
    const { first_name, last_name } = owner;
    const { id } = useParams();


    setHeaderTitle(true);
    console.log(first_name, last_name)


    return (
        <section className={`flex-grow-1 ${style.page} `}>
            <HeaderOwners ownerId={id} onLogout={logout} firstName={first_name} lastName={last_name} />
            <div className={`card m-4 ${style.customCard}`}>


                <div className="row mt-4">
                    <h1 className="text-center">Aggiungi un nuovo immobile:</h1>
                    <div className="col mt-4">
                        <HouseForm id={id} />
                    </div>
                </div>
            </div>

        </section >
    )
}