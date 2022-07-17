import React, {useState, useEffect} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import OrderCard from "../../OrdersPage/components/OrderCard/OrderCard";
import "./MainBanner.css"

const MainBanner = () => {

    let navigate = useNavigate();
    const [ordersCount, setOrdersCount] = useState(0)
    const [orders, setOrders] = useState([])
    const [tagsCount, setTagsCount] = useState(0)

    useEffect(() => {
        countOrders()
        countTags()
    }, [])

    const countOrders = async () => {
        let response = await fetch('/api/orders', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        })
        if (response.ok) {
            let data = await response.json()
            setOrders(data.slice(0,3))
            setOrdersCount(data.length)
        } else {
            console.log('Error')
        }
    }

    const countTags = async () => {
        let response = await fetch('/api/tags', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        })
        if (response.ok) {
            let data = await response.json()
            setTagsCount(data.length)
        } else {
            console.log('Error')
        }
    }


    return (
        <div className="MainBanner">
            <div className="leftSide">
            Currently created {ordersCount} orders at {tagsCount} themes
            
                <div className="circle"></div>
                <div>From </div>
                <div>best talents</div>
                <div>to</div>
                <div>best clients</div>
            </div>
            <div className="center">
            {orders.map((order, index) => (
                    <OrderCard key={index} order={JSON.parse(JSON.stringify(order))}/>
                ))}
            </div>
        </div>
    )
}

export default MainBanner