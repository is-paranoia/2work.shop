import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import "./OrderActivity.css";

const OrderActivity = ({orderData}) => {

    const user = JSON.parse(localStorage.getItem("userData"))
    const params = useParams()
    let navigate = useNavigate();
    const [responds, setResponds] = useState([])

    useEffect(() => {
        getResponds()
    }, [])

    const getResponds = async () => {
        try{
            const user = JSON.parse(localStorage.getItem("userData"))
            const response = await fetch(`/api/responds/${params.id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                  },
                method: "GET"
            })
            if (response.ok) {
                const data = await response.json()
                console.log("Responds", data);
                setResponds(data)
            }
        } catch (e) {
            console.log(e);
        }
    }

    const respondHandler = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("userData"))
            const data = await fetch(`/api/responds/${params.id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                  },
                body: JSON.stringify({}),
                method: "POST"})
            console.log("Data", data)
        } catch (e) {
            console.log(e)
        }
    }

    const submitRespondHandler = async (userId) => {
        try {
            const user = JSON.parse(localStorage.getItem("userData"))
            const data = await fetch(`/api/orders/${params.id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                  },
                body: JSON.stringify({workerId: userId}),
                method: "PUT"})
            console.log("Data", data)
        } catch (e) {
            console.log(e)
        }
    }

    

    return (
        <div className="OrderActivity">
            <div className="activityBarHeader"><h2>Activities</h2></div>
            <div className="respondsList">
            {responds.map((respond) => {
                return <div className="respond">
                    <div>{respond.userId}</div>
                    { orderData.authorId === user.userId ? <button className="buttonSubmitRespond" value={respond.userId} onClick={(event)=>{submitRespondHandler(event.target.value)}}>Respond</button> :
                    <button className="buttonDeleteRespond" disabled={respond.userId === user.userId ? false : true}>Delete</button>}
                    </div>
            })}
            </div>
            <div className="activityButtonGroup">
            { orderData.authorId !== user.userId ? <button className="buttonRespond" onClick={respondHandler}>Respond</button> :
            <button className="buttonDelete" disabled={orderData.authorId === user.userId ? false : true}>Delete</button>}
            </div>
        </div>
    )
}

export default OrderActivity