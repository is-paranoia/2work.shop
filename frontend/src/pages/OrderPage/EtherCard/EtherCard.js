import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {ethers} from "ethers"
import "./EtherCard.css"
import AuthorCard from "./AuthorCard/AuthorCard";
import WorkerCard from "./WorkerCard/WorkerCard";
import {observer} from "mobx-react-lite"
import order from "../store/order";
import status from "./store/status";
import contract from "./store/contract";


const EtherCard = () => {
    const user = JSON.parse(localStorage.getItem("userData"))
    const params = useParams()
    let navigate = useNavigate();

    useEffect(() => {
        if (order.id !== undefined && order.id !== null){
            status.getPaymentStatus(order.id)
        } else {
            console.log("KAK")
        }
    }, [order.id])

    

    return (
        <div className="EtherCard">
                { user.userId == order.authorId ? <AuthorCard orderData={order} status={status} contract={contract}/> : <div></div>}
                <div className="txList">
                    <div>{status.globalStatus}</div>
                    {status.payments.map((payment) => {
                        return <div className="payment" key={payment.id}>
                            <div>Tx: {payment.txHash}</div>
                            <div>User: {payment.userId}</div>
                            <div>Status: {payment.status}</div>
                            <div>Eth spend: {payment.value}</div>
                            <div>Status: {payment.comment}</div>
                            <div>Time: {payment.timestamp}</div>
                        </div>
                    })}
                </div>
                { user.userId == order.workerId ? <WorkerCard orderData={order} status={status} contract={contract}/> : <div></div>}
                
        </div>
    )
}

export default observer(EtherCard)