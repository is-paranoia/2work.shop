import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import "./LogoutForm.css";
import {observer} from "mobx-react-lite"
import authUser from "../../../store/authUser";

const LogoutForm = () => {
    const navigate = useNavigate();

    const logoutHandler = event => {
        authUser.logout()
    }

    return (
        <div className="LogoutForm">
            <button onClick={logoutHandler} className="buttonDelete">Logout</button>
        </div>
    )
}

export default observer (LogoutForm)