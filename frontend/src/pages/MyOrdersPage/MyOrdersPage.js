import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import "./MyOrdersPage.css";
import OrdersList from "../OrdersPage/OrdersList/OrdersList";
import Filters from "../OrdersPage/Filters/Filters";

const MyOrdersPage = () => {

    let navigate = useNavigate();
    let [orders, setOrders] = useState([])
    let [ordersAuthor, setOrdersAuthor] = useState([])


    useEffect(() => {
        getOrders()
    }, [])

    let getOrders = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("userData"))
            console.log("User", { token : user.token, userId: user.userId })
            let response = await fetch(`/api/orders/worker_id/${user.userId}`, {
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
        } catch (e) {
            console.log(e)
        }
        try {
            const user = JSON.parse(localStorage.getItem("userData"))
            console.log("User", { token : user.token, userId: user.userId })
            let response = await fetch(`/api/orders/author_id/${user.userId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                  }
            })
            if (response.ok) {
                let data = await response.json()
                setOrdersAuthor(data)
            } else {
                console.log('Error')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="MyOrdersPage">
            <div>
            <h2>As worker</h2>
                <OrdersList orders={orders}/>
            </div>
            <div>
                <h2>As author</h2>
            <OrdersList orders={ordersAuthor}/>
            </div>
        </div>
    )
}

export default MyOrdersPage