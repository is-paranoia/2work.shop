import React, {useState, useEffect} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import OrderCard from "../components/OrderCard/OrderCard";
import "./OrdersList.css";

const OrdersList = ({orders}) => {

    let navigate = useNavigate();

    return (
        <div className="OrdersList">
            <div className="counter">Orders ({orders.length})</div>
            {
                orders.map((order, index) => (
                    <OrderCard key={index} order={JSON.parse(JSON.stringify(order))}/>
                ))
            } 
        </div>
    )
}

export default OrdersList