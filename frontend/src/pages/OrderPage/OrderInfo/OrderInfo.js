import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import EtherCard from "./EtherCard/EtherCard";
import "./OrderInfo.css";

const OrderInfo = ({orderData}) => {

    const user = JSON.parse(localStorage.getItem("userData"))
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
            let data_time = new Date(Date.parse(data.createdAt))
            let orderCreatedAt = `${data_time.getHours()}:${data_time.getMinutes()} ${("0"+data_time.getDate()).slice(-2)}.${("0"+data_time.getMonth()).slice(-2)}.${data_time.getFullYear()}`
            data.createdAt = orderCreatedAt
            console.log(data)
            setOrder(data)
        } else {
            console.log('Error')
        }
    }

    return (
        <div className="OrderInfo">
            <div className="order-id">Order ID: #{order.id}</div>
            <div className="order-title">{order.title}</div>
            <div className="order-description">{order.description}</div>
            <div className="order-price">{order.price}</div>
            <div className="order-worker">{order.workerId}</div>
            <div className="order-author">{order.authorId}</div>
            <div className="order-time">{order.createdAt}</div>
            { order.workerId == user.userId || order.authorId == user.userId ?
                <EtherCard order={order}/> : <div></div>}
        </div>
    )
}

export default OrderInfo