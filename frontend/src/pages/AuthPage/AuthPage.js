import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./AuthPage.css";

const AuthPage = (isAuthenticated) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nickname: "",
        email: "",
        wallet: "",
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
                }).then(final=>{
                    console.log("AGA? = ", final)
                    //localStorage.setItem("userData", JSON.stringify({userId: final.userId, token: final.token}))
                    auth.login(final.token, final.userId)
                    //navigate("orders")
                })
            //console.log("DATA HERE?? = ", JSON.stringify(final))
            
            //
            
            //
        } catch (e) {
            console.log(e)
        }
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
            console.log("Data", data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="AuthPage">
           <div className="authForm">
               <h1>Log in to your account</h1>
               <div className="fields">
                    <input className="nickname-field" name="nickname" placeholder="Nickname" onChange={changeHandler} />
                    <input className="email-field" name="email" placeholder="Email" onChange={changeHandler} />
                    <input className="wallet-field" name="wallet" placeholder="Wallet" onChange={changeHandler} />
                    <input className="password-field" name="password" placeholder="Password" onChange={changeHandler} />
               </div>
               <div className="btn-group">
                   <button className="button-27" onClick={loginHandler}>Login</button>
                   <button className="button-27" onClick={registerHandler}>Register</button>
               </div>
           </div>
        </div>
    )
}

export default AuthPage