import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import "./OrderPage.css";
import OrderInfo from "./OrderInfo/OrderInfo";
import OrderActivity from "./OrderActivity/OrderActivity";
import WebSocketChat from "../../components/WebSocketChat/WebSocketChat";
import io from "socket.io-client";
import OrderComments from "./OrderComments/OrderComments";
import EtherCard from "./EtherCard/EtherCard";
import {observer} from "mobx-react-lite"
import order from "./store/order";
import authUser from "../../store/authUser";

const PORT = 8000
const socket = io.connect(`http://2workshop.site`) //change this to website url!!!

const OrderPage = () => {

    const params = useParams()
    let navigate = useNavigate()
    

    useEffect(() => {
        order.getOrder(params.id)
    }, [])

    return (
        <div className="OrderPage">
            <div className="mainOrderContent">

                <OrderInfo />
                { order.workerId !== null && order.workerId !== undefined ? <EtherCard /> : null}
                <OrderComments />
            </div>
            { authUser.isAuthenticated ?
            <div className="sideBar">
                <OrderActivity />
                {(order.workerId !== null || order.workerId !== undefined) && (authUser.userId == order.authorId || authUser.userId == order.workerId || authUser.roleId == 2) ?
                 <WebSocketChat socket={socket} chatId={params.id}/> : null}
                
            </div>
            : null}
        </div>
    )
}

export default observer(OrderPage)