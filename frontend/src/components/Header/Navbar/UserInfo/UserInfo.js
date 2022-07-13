import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import "./UserInfo.css"
import {observer} from "mobx-react-lite"
import authUser from "../../../../store/authUser";

const UserInfo = () => {
    let [user, setUser] = useState([])

    useEffect(() => {
        getUser()
    }, [])

    let getUser = async () => {
        const user = JSON.parse(localStorage.getItem("userData"))
        console.log("Local user", user)
        if (user !== null) {
            console.log("UserToken", user.token)
            let response = await fetch('/api/user', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                }
            })
            if (response.ok) {
                let data = await response.json()
                console.log("UserInfo", data)
                setUser(data)
            } else {
                authUser.logout()
                console.log('Error')
            }
        } else {
            setUser(null)
        }
    }

    const logoutHandler = () => {
        authUser.logout()
    }

    return (
        <div className="UserInfo">
                {(authUser.token !== null)? <div>{authUser.nickname} <button className="logoutBtn" onClick={logoutHandler}>X</button></div> : <Link className="linkLogin" to={"/auth/login"}>Login</Link>}
        </div>
    )
}

export default observer(UserInfo)