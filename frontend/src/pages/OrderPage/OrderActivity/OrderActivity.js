import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import "./OrderActivity.css";
import {observer} from "mobx-react-lite"
import order from "../store/order";

const OrderActivity = () => {

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
            order.setWorker(userId)
            console.log("Data", data)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteHandler = async (event) => {
        try {
            const user = JSON.parse(localStorage.getItem("userData"))
            console.log(params.id);
            const data = await fetch(`/api/orders/${params.id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                  },
                body: JSON.stringify({orderId: order.id, userId: event.target.id}),
                method: "DELETE"})
            console.log("Data", data)
            navigate("..", { replace: true })
        } catch (e) {
            console.log(e)
        }
    }

    const deleteRespondHandler = async (event) => {
        try {
            const user = JSON.parse(localStorage.getItem("userData"))
            console.log(params.id);
            const data = await fetch(`/api/responds/${params.id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                  },
                body: JSON.stringify({orderId: order.id, userId: event.target.id}),
                method: "DELETE"
            })
            console.log("Data", data)
        } catch (e) {
            console.log(e)
        }
    }
    

    return (
        <div className="OrderActivity">
            <div className="activityBarHeader"><h2>Activities</h2></div>
            { order.workerId == null ? <div className="respondsList">
            {responds.map((respond) => {
                return <div className="respond" key={respond.id}>
                    <div>{respond.userId}</div>
                    { order.authorId === user.userId ? <button className="buttonSubmitRespond" value={respond.userId} onClick={(event)=>{submitRespondHandler(event.target.value)}}>Submit</button> :
                    <button className="buttonDeleteRespond" id={respond.userId} onClick={deleteRespondHandler} disabled={respond.userId === user.userId || user.roleId == 2 ? false : true}>Delete respond</button>}
                    </div>
            })}
            </div> : <div className="respondsList"></div>}
            <div className="activityButtonGroup">
            { order.authorId !== user.userId && order.workerId == null ? <button className="buttonRespond" onClick={respondHandler}>Respond</button> : order.authorId == user.userId && order.workerId == null ?
            <button className="buttonDelete" onClick={deleteHandler} disabled={order.workerId !== null ? true : false}>Delete order</button> : <button className="buttonDelete" onClick={deleteHandler} disabled={order.workerId !== null ? true : false}>Thank you!</button>}
            </div>
        </div>
    )
}

export default observer(OrderActivity)