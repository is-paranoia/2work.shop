import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import "./OrderInfo.css";

const OrderInfo = ({orderData}) => {

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
        <div className="OrderInfo">
            <div>{order.id}</div>
            <div>{order.title}</div>
            <div>{order.description}</div>
            <div>{order.price}</div>
            <div>{order.stage}</div>
            <div>{order.workerId}</div>
            <div>{order.authorId}</div>
            <div>{order.createdAt}</div>
        </div>
    )
}

export default OrderInfo