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
            <div className="order-id">Order ID: #{order.id}</div>
            <div className="order-title">{order.title}</div>
            <div className="order-description">{order.description}</div>
            <div className="order-price">{order.price}</div>
            <div className="order-worker">{order.workerNickname}</div>
            <div className="order-author">{order.authorNickname}</div>
            <div className="order-time">{order.createdAt}</div>
        </div>
    )
}

export default observer(OrderInfo)