import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import "./WebSocketChat.css";

const WebSocketChat = ({socket, chatId}) => {

    
    const params = useParams()
    const user = JSON.parse(localStorage.getItem("userData"))
    let navigate = useNavigate();
    const [history, setHistory] = useState([])
    const [chatJoined, setChatJoined] = useState(false)
    const [currentMessage, setCurrentMessage] = useState("")

    useEffect(() => {
        if (chatJoined == false) {
            joinChat()
        }
        let test = false;
        socket.on("receiveMessage", (data) => {
          if (!test) { 
              setHistory((list) => [...list, data]);
              console.log(history)
          }
        });
        return () => {
          test = true;
        };
    }, [history]);

    const getHistory = async () => {
        const user = JSON.parse(localStorage.getItem("userData"))
        try {
            await fetch(`/api/chat/${chatId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                  },
                method: "GET"
            }).then((response) => {
                return response.json()
            }).then((messages) => {
                console.log(messages);
                messages.forEach(element => {
                     setHistory((list) => [...list, element]);
                });
            })
        } catch (e) {
            console.log(e)
        }
    }
    
    const joinChat = async () => {
        try {
            socket.emit("joinChat", chatId)
            setChatJoined(true)
            getHistory()
        } catch (e) {
            console.log(e)
        }
        

    }


   
    const sendMessage = async () => {
        const user = JSON.parse(localStorage.getItem("userData"))
        if (currentMessage !== "") {
            const message = {
                chatId: chatId,
                userId: user.userId,
                message: currentMessage,
                timestamp: new Date(Date.now()).getTime()
            }
            await socket.emit("sendMessage", message)
            try {
                const user = JSON.parse(localStorage.getItem("userData"))
                const response = await fetch(`/api/chat/${chatId}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token,
                      },
                    body: JSON.stringify(message),
                    method: "POST"
                })
                if (response.ok) {
                    setHistory((list) => [...list, message]);
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <div className="WebSocketChat">
            <div className="chatTitle">
                <h2>Chat #{chatId}</h2>
            </div>
            <div className="chatBody">
                {history.map((messageData)=> {
                    return <div className="message" key={messageData.id} id={user.userId === messageData.userId ? "me" : "friend"}>
                            <div className="messageBody">
                                {messageData.message}
                            </div>
                        </div>
                })}
            </div>
            <div className="chatInputs">
                <input type={"text"} 
                placeholder={"Enter message"}
                onChange={(event)=>{
                    setCurrentMessage(event.target.value)
                }}></input>
                <button className="sendBtn" onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default WebSocketChat