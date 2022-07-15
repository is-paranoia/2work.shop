import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import OrdersList from "./OrdersList/OrdersList";
import Filters from "./Filters/Filters";
import {NavLink} from "react-router-dom";

import "./OrdersPage.css";

const OrdersPage = () => {

    let navigate = useNavigate();
    let [orders, setOrders] = useState([])
    const [currentFilter, setCurrentFilter] = useState(null)
    let [search, setSearch] = useState("")


    useEffect(() => {
        getOrders(currentFilter)
    }, [currentFilter])

    let getOrders = async (currentFilter) => {
        try {
            if (currentFilter != null) {
                const user = JSON.parse(localStorage.getItem("userData"))
                let response = await fetch(`/api/orders/tag_id/${currentFilter}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
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
                let response = await fetch('/api/orders', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
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

    const handleEnterSearch = (event) => {
        if(event.key === 'Enter'){
          console.log('enter press here! ')
        }
    }

    const changeSearch = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div className="OrdersPage">
            <div className="ordersFunc">
                <div className="searchHolder">
                    <input className="search" name="Search" placeholder="Search" onChange={changeSearch} onKeyPress={handleEnterSearch} ></input>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </div>
                
                <NavLink to="/orders/create" className="createOrderNav">Create order</NavLink>
            </div>
            <div className="ordersView">
                <OrdersList orders={orders}/>
                <Filters setCurrentFilter={setCurrentFilter}/>
            </div>
        </div>
    )
}

export default OrdersPage