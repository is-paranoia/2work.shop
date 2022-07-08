import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import "./OrderActivity.css";

const OrderActivity = ({orderData}) => {

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
        <div className="OrderActivity">

            <button className="button-27">Откликнуться</button>
        </div>
    )
}

export default OrderActivity