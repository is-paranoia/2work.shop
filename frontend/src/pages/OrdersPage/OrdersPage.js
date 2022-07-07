import React, {useState, useEffect} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import OrderCard from "./components/OrderCard/OrderCard";
import OrdersList from "./OrdersList/OrdersList";
import Filters from "./Filters/Filters";
import "./OrdersPage.css";

const OrdersPage = () => {

    let navigate = useNavigate();
    let [orders, setOrders] = useState([])

    useEffect(() => {
        getOrders()
    }, [])

    let getOrders = async () => {
        let response = await fetch('/api/orders')
        
        if (response.ok) {
            let data = await response.json()
            setOrders(data)
        } else {
            console.log('Error')
        }
    }

    return (
        <div className="OrdersPage">
            <OrdersList orders={orders}/>
            <Filters/>
        </div>
    )
}

export default OrdersPage