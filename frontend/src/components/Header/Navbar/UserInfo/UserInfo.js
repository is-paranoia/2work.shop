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
                {(authUser.token !== null)? <div className="nicknameGroupHolder"><div className="nicknameHolder">{authUser.nickname}</div><Link className="logoutBtn" to={"/auth/login"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#c1121f" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
        </svg>
                    </Link></div> : <Link className="linkLogin" to={"/auth/login"}>Login</Link>}
        </div>
    )
}

export default observer(UserInfo)