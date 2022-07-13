import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import "./LoginForm.css";
import {observer} from "mobx-react-lite"
import authUser from "../../../store/authUser";

const LoginForm = ({setShowRegister}) => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            const data = await fetch('/auth/login', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({...form}),
                method: "POST"}).then(response=>{
                    return response.json();
                }).then(userData=>{
                    authUser.login(userData.token, userData.userId, userData.nickname, userData.roleId)
                    navigate("..", { replace: true })
                })
                console.log("DATA HERE", data);
        } catch (e) {
            console.log(e)
        }
    }

    const changeShowHandler = event => {
        setShowRegister(true)
    }

    return (
        <div className="LoginForm">
               <div className="changeForm"><h1>Login</h1><button onClick={changeShowHandler}><h1>Register</h1></button></div>
               <div className="auth-fields">
                    <input className="email-field" name="email" placeholder="Email" onChange={changeHandler} />
                    <input className="password-field" name="password" placeholder="Password" onChange={changeHandler} />
               </div>
               <div className="btn-group">
                   <button className="button-27" onClick={loginHandler}>Login</button>
               </div>
        </div>
    )
}

export default observer (LoginForm)