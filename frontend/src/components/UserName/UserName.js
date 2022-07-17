import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import "./UserName.css";
import {observer} from "mobx-react-lite"


const UserName = (userId) => {

    const params = useParams()
    let navigate = useNavigate()
    const [nickname, setNickname] = useState("")
    

    useEffect(() => {
        userId = userId.userId
        getUserNickname(userId)
    }, [userId])

    const getUserNickname = async (userId) => {
        let response = await fetch(`/api/users/${userId}`, 
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
        })
        let data = await response.json()
        if (data.nickname) {
            setNickname(data.nickname)
        } else {
            setNickname("")
        }
    }

    return (
        <div className="UserName">
            {nickname}
        </div>
    )
}

export default observer(UserName)