import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import "./OrderPage.css";
import { AuthContext } from "../../context/AuthContext";
import OrderInfo from "./OrderInfo/OrderInfo";
import OrderActivity from "./OrderActivity/OrderActivity";
import WebSocketChat from "../../components/WebSocketChat/WebSocketChat";
import io from "socket.io-client";
import OrderComments from "./OrderComments/OrderComments";


const PORT = 8000
const socket = io.connect(`http://localhost:${PORT}`) //change this to website url!!!

const OrderPage = () => {

    const params = useParams()
    let navigate = useNavigate();
    let [order, setOrder] = useState([])


    useEffect(() => {
        getOrder()
    }, [])

    let getOrder = async () => {
        const user = JSON.parse(localStorage.getItem("userData"))
        console.log("User", { token: user.token, id: user.userId})
        let response = await fetch(`/api/orders/${params.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token,
            }
        })
        
        if (response.ok) {
            let data = await response.json()
            console.log(data)
            setOrder(data)
        } else {
            console.log('Error')
        }
    }

    return (
        <div className="OrderPage">
            <div className="mainOrderContent">
                <OrderInfo orderData={order}/>
                <OrderComments order={order} />
            </div>
            <div className="sideBar">
                <OrderActivity orderData={order}/>
                <WebSocketChat socket={socket} chatId={params.id}/>
            </div>
        </div>
    )
}

export default OrderPage