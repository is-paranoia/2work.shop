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
    const [currentFilter, setCurrentFilter] = useState(null)


    useEffect(() => {
        getOrders(currentFilter)
        console.log("CURR", currentFilter);
    }, [currentFilter])

    let getOrders = async (currentFilter) => {
        try {
            if (currentFilter != null) {
                const user = JSON.parse(localStorage.getItem("userData"))
                console.log("User", { token : user.token, userId: user.userId })
                let response = await fetch(`/api/orders/tag_id/${currentFilter}`, {
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
            } else {
                const user = JSON.parse(localStorage.getItem("userData"))
                console.log("User", { token : user.token, userId: user.userId })
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
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="OrdersPage">
            <OrdersList orders={orders}/>
            <Filters setCurrentFilter={setCurrentFilter}/>
        </div>
    )
}

export default OrdersPage