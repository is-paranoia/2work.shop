import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {ethers} from "ethers"
import "./EtherCard.css"
import AuthorCard from "./AuthorCard/AuthorCard";
import WorkerCard from "./WorkerCard/WorkerCard";

const EtherCard = ({order}) => {

    const user = JSON.parse(localStorage.getItem("userData"))
    const params = useParams()
    let navigate = useNavigate();
    const [payments, setPayments] = useState([])
    const [status, setStatus] = useState("")

    useEffect(() => {
        if (status == ""){
            getPayments()
        }
        checkStatus()
    }, [payments, order])

    const getPayments = async () => {
        try{
            const user = JSON.parse(localStorage.getItem("userData"))
            const response = await fetch(`/api/payments/order_id/${params.id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                  },
                method: "GET"
            })
            if (response.ok) {
                let data = await response.json()
                data.forEach(payment => {
                    let data_time = new Date(Date.parse(payment.timestamp))
                    let paymentCreatedAt = `${data_time.getHours()}:${data_time.getMinutes()} ${("0"+data_time.getDate()).slice(-2)}.${("0"+data_time.getMonth()).slice(-2)}.${data_time.getFullYear()}`
                    payment.timestamp = paymentCreatedAt
                })
                console.log("Payments", data);
                setPayments(data)
            }
        } catch (e) {
            console.log(e);
        }
    }

    const checkStatus = () => {
        let authorSendPayment = false
        let workerReceivePayment = false
        payments.forEach((payment)=>{
            console.log({pay: payment.userId, ord: order.authorId});
            if (payment.userId == order.authorId && payment.comment == "Good") {
                console.log("ALO");
                authorSendPayment = true
            }
            if (payment.userId == order.workerId && payment.comment == "Good") {
                workerReceivePayment = true
            }
        })
        if (authorSendPayment && workerReceivePayment) {
            setStatus("Ended")
        } else if (authorSendPayment && !workerReceivePayment) {
            setStatus("Wait worker receive")
        } else if (!authorSendPayment && !workerReceivePayment) {
            setStatus("Wait author payment")
        } else {
            setStatus("Error")
        }
    }
    

    return (
        <div className="EtherCard">
                { user.userId == order.authorId ? <AuthorCard orderData={order} status={status}/> : <div></div>}
                <div className="txList">
                    <div>{status}</div>
                    {payments.map((payment) => {
                        return <div className="payment" key={payment.id}>
                            <div>{payment.txHash}</div>
                            <div>{payment.userId}</div>
                            <div>{payment.status}</div>
                            <div>{payment.value}</div>
                            <div>{payment.comment}</div>
                            <div>{payment.timestamp}</div>
                        </div>
                    })}
                </div>
                { user.userId == order.workerId ? <WorkerCard orderData={order} status={status}/> : <div></div>}
                
        </div>
    )
}

export default EtherCard