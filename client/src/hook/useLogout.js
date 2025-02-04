import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

function useLogout() {
    const { setOwner } = useContext(GlobalContext);
    const navigate = useNavigate();

    return function logout() {
        localStorage.removeItem("token");
        setOwner(null);
        navigate("/owners");
    };
}

export default useLogout;