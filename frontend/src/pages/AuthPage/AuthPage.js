import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import "./AuthPage.css";
import {observer} from "mobx-react-lite"
import authUser from "../../store/authUser";
import LogoutForm from "./LogoutForm/LogoutForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import LoginForm from "./LoginForm/LoginForm";

const AuthPage = () => {
    const navigate = useNavigate();
    const [showRegister, setShowRegister] = useState(false)

    useEffect(() => {
    }, [showRegister])

    return (
        <div className="AuthPage">
            { authUser.isAuthenticated ? <LogoutForm /> : showRegister ? 
            <RegisterForm setShowRegister={setShowRegister}/> : <LoginForm setShowRegister={setShowRegister}/>}
        </div>
    )
}

export default observer (AuthPage)