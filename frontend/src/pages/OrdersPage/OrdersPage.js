import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import OrderCard from "./components/OrderCard/OrderCard";
import OrdersList from "./OrdersList/OrdersList";
import Filters from "./Filters/Filters";
import "./OrdersPage.css";
import { AuthContext } from "../../context/AuthContext";

const OrdersPage = () => {

    let navigate = useNavigate();
    let [orders, setOrders] = useState([])


    useEffect(() => {
        getOrders()
    }, [])

    let getOrders = async () => {
        const user = JSON.parse(localStorage.getItem("userData"))
        console.log("UserTOken", user.token)
        let response = await fetch('/api/orders', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token,
              }
        })
        
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