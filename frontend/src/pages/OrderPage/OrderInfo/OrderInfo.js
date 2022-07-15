import React, {useState, useEffect} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import "./OrderInfo.css";
import {observer} from "mobx-react-lite"
import order from "../store/order";

const OrderInfo = () => {

    useEffect(() => {

    }, [])

    return (
        <div className="OrderInfo">
            <div className="orderCornerHolder">
                <div className="orderPay"><div className="priceText">Price</div> <div className="price">{order.price}</div></div>
                <div className="orderId">Order ID: #{order.id}</div>
            </div>
            <div className="order-title">{order.title}</div>
            <div className="orderSides">
                <div className="orderAuthor">{order.authorNickname}</div>
                {order.workerNickname !== null && order.workerNickname !== undefined ? <div className="orderWorker">{order.workerNickname}</div> : null}
            </div>
            <div className="info">
                <div className="order-description">{order.description}</div>
                
            </div>
            <div className="order-time">{order.createdAt}</div>
            <div className="order-time">{order.endedAt}</div>
        </div>
    )
}

export default observer(OrderInfo)