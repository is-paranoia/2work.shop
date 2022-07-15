import React, {useState, useEffect} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import "./OrderCard.css";

const OrderCard = ({order}) => {

    let navigate = useNavigate();
    let date = new Date(order.createdAt)

    return (
        
        <div className="OrderCard">
            <Link className="link" to={`/orders/${order.id}`}>
                <div className="card-title">{order.title}</div>
            
            <div className="card-id">#{order.id}</div>
            <div className="card-info">
                <div className="card-price">{order.price}</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#52b788" class="bi bi-cash" viewBox="0 0 16 16">
                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
                </svg>
            </div>
            <div className="card-description">{order.description.slice(0,128)}</div>
            <div className="card-sides">
                <div className="card-authorId"><div className="sideName">Author</div><div className="markOff">{order.authorId}</div></div>
                <div className="card-workerId"><div className="sideName">Worker</div>{order.workerId !== null && order.workerId !== undefined ?  <div className="markOff"> {order.workerId} </div> : <div className="mark">Available</div>}</div>
            </div>
            <div className="card-timestamps">
                <div className="createdAt">
                    {date.toDateString()}
                </div>
                <div>{order.tagId}</div>
                <div className="endedAt">{order.endedAt}</div>
            </div>
            </Link>
        </div>
    )
}

export default OrderCard