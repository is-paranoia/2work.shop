import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import "./UserInfo.css"

const UserInfo = () => {

    const auth = useContext(AuthContext);
    let [user, setUser] = useState([])

    useEffect(() => {
        getUser()
    }, [])

    let getUser = async () => {
        const userLocal = JSON.parse(localStorage.getItem("userData"))
        console.log("Local user", userLocal)
        if (userLocal !== null) {
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
                console.log(data)
                setUser(data)
            } else {
                auth.logout()
                console.log('Error')
            }
        } else {
            setUser(null)
        }
    }

    return (
        <div className="UserInfo">
                {(user !== null)? user.nickname  : <Link className="linkLogin" to={"/auth/login"}>Login</Link>}
        </div>
    )
}

export default UserInfo