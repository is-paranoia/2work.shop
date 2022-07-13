import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import "./RegisterForm.css";
import {observer} from "mobx-react-lite"
import authUser from "../../../store/authUser";

const RegisterForm = ({setShowRegister}) => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nickname: "",
        email: "",
        password: ""
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await fetch('/auth/register', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({...form}),
                method: "POST"})
        } catch (e) {
            console.log(e)
        }
    }

    const changeShowHandler = event => {
        setShowRegister(false)
    }

    return (
        <div className="RegisterForm">
               <div className="changeForm"><button onClick={changeShowHandler}><h1>Login</h1></button><h1>Register</h1></div>
               <div className="auth-fields">
                    <input className="nickname-field" name="nickname" placeholder="Nickname" onChange={changeHandler} />
                    <input className="email-field" name="email" placeholder="Email" onChange={changeHandler} />
                    <input className="password-field" name="password" placeholder="Password" onChange={changeHandler} />
               </div>
               <div className="btn-group">
                   <button className="button-27" onClick={registerHandler}>Register</button>
               </div>
        </div>
    )
}

export default observer (RegisterForm)