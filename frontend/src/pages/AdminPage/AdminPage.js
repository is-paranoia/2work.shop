import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import "./AdminPage.css";
import WebSocketChat from "../../components/WebSocketChat/WebSocketChat";
import io from "socket.io-client";
import {observer} from "mobx-react-lite"
import authUser from "../../store/authUser";

const PORT = 8000
const socket = io.connect(`http://185.173.38.128:8000/`) //change this to website url!!! 185.173.38.128:8000

const AdminPage = () => {

    const params = useParams()
    let navigate = useNavigate()
    const [currentChatIdField, setCurrentChatIdField] = useState("")
    const [currentChatId, setCurrentChatId] = useState("")

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            setCurrentChatId(currentChatIdField)
        }
    }
    

    useEffect(() => {
    }, [])

    return (
        <div className="AdminPage">
            <input className={"inputChatId"} type={"text"} placeholder={"Enter chat id"}
                onChange={(event)=>{
                    setCurrentChatIdField(event.target.value)
                }} value={currentChatIdField} onKeyPress={handleKeyPress}></input>
            { authUser.isAuthenticated && authUser.roleId == 2 ?
            <WebSocketChat socket={socket} chatId={currentChatId}/> : null}
        </div>
    )
}

export default observer(AdminPage)