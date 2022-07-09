import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import "./OrderActivity.css";

const OrderActivity = ({orderData}) => {

    const user = JSON.parse(localStorage.getItem("userData"))
    const params = useParams()
    let navigate = useNavigate();
    let [order, setOrder] = useState([])


    useEffect(() => {
        getOrder()
    }, [])

    let getOrder = async () => {
    }

    return (
        <div className="OrderActivity">
            <div className="activityBarHeader"></div>
            <button className="buttonRespond">Respond</button>
            <button className="buttonDelete" disabled={orderData.authorId === user.userId ? false : true}>Delete</button>
        </div>
    )
}

export default OrderActivity