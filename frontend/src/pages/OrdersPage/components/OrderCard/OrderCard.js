import React, {useState, useEffect} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import "./OrderCard.css";

const OrderCard = ({order}) => {

    let navigate = useNavigate();
    let date = new Date(order.createdAt)

    return (
        
        <div className="OrderCard">
            <Link className="link" to={`/orders/id/${order.id}`}>
                <div className="title">{order.title}</div>
            </Link>
            <div className="id">#{order.id}</div>
            <div className="info">
                    <svg xmlns={"http://www.w3.org/2000/svg"} width={"24"} height={"24"} fill={"currentColor"} class={"bi bi-cash"} viewBox={"0 0 16 16"}>
                        <path d={"M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"}/>
                        <path d={"M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"}/>
                    </svg>
                    <div className="price">
                        
                        {order.price} ETH</div>
                    <div className="isStarted">{order.isStarted}</div>
            </div>
            <div className="sides">
                <div className="authorId">Author: {order.authorId}</div>
                <div className="workerId">Worker: {order.workerId}</div>
            </div>
            <div className="timestamps">
                <div className="createdAt">
                <svg xmlns={"http://www.w3.org/2000/svg"} x={"0px"} y={"0px"} width={"24"} height={"24"} viewBox={"0 0 30 30"} style={{fill:"#000000"}}>
                    <path d={"M 15 3 C 8.3844276 3 3 8.3844276 3 15 C 3 21.615572 8.3844276 27 15 27 C 21.615572 27 27 21.615572 27 15 C 27 8.3844276 21.615572 3 15 3 z M 14.001953 5.0488281 A 1 1 0 0 0 15 6 A 1 1 0 0 0 15.998047 5.0488281 C 20.73255 5.5157016 24.484298 9.2674502 24.951172 14.001953 A 1 1 0 0 0 24 15 A 1 1 0 0 0 24.951172 15.998047 C 24.484298 20.73255 20.73255 24.484298 15.998047 24.951172 A 1 1 0 0 0 15 24 A 1 1 0 0 0 14.001953 24.951172 C 9.2674502 24.484298 5.5157016 20.73255 5.0488281 15.998047 A 1 1 0 0 0 6 15 A 1 1 0 0 0 5.0488281 14.001953 C 5.5157016 9.2674502 9.2674502 5.5157016 14.001953 5.0488281 z M 15 7 C 10.582 7 7 10.582 7 15 C 7 19.418 10.582 23 15 23 C 19.418 23 23 19.418 23 15 C 23 10.582 19.418 7 15 7 z M 15 9 C 15.553 9 16 9.448 16 10 L 16 14.585938 L 18.707031 17.292969 C 19.098031 17.683969 19.098031 18.316031 18.707031 18.707031 C 18.512031 18.902031 18.256 19 18 19 C 17.744 19 17.487969 18.902031 17.292969 18.707031 L 14 15.414062 L 14 10 C 14 9.448 14.447 9 15 9 z"}>
                        </path>
                </svg>
                    {date.toDateString()}</div>
                <div className="endedAt">{order.endedAt}</div>
            </div>
        </div>
    )
}

export default OrderCard