import React, { useEffect } from "react";
import api from "../services/api";
import { useHistory } from "react-router-dom";

//Componente para logout
const Logout = () => {
    let history = useHistory();

    useEffect(() => {
        localStorage.clear();
        localStorage.removeItem('token');
        //sessionStorage.removeItem("token");

        setTimeout(() => {
            window.location.href = "/login";
        }, 100);
    }, []);

    return (
    <>
    Saindo...
    </>
    );
}

export default Logout;