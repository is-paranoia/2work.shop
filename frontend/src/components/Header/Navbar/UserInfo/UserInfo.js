import React, {useState, useEffect} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import "./UserInfo.css"

const UserInfo = () => {

    let [user, setUser] = useState([])

    useEffect(() => {
        getUser()
    }, [])

    let getUser = async () => {
        const user = JSON.parse(localStorage.getItem("userData"))
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
            console.log('Error')
        }
    }

    return (
        <div className="UserInfo">
                {user? user.nickname  : <Link className="linkLogin" to={"/auth/login"}>Login</Link>}
        </div>
    )
}

export default UserInfo