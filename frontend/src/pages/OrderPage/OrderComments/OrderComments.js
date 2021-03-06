import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import "./OrderComments.css";
import {observer} from "mobx-react-lite"
import order from "../store/order";
import authUser from "../../../store/authUser";
import UserName from "../../../components/UserName/UserName";

const OrderComments = () => {

    const user = JSON.parse(localStorage.getItem("userData"))
    const params = useParams()
    let navigate = useNavigate();
    const [comment, setComment] = useState({
        message: ""
    })
    const [comments, setComments] = useState([])

    useEffect(() => {
        getComments()
    }, [])

    const getComments = async () => {
        const user = JSON.parse(localStorage.getItem("userData"))
        try{
            const user = JSON.parse(localStorage.getItem("userData"))
            const response = await fetch(`/api/comments/${params.id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                method: "GET"
            })
            if (response.ok) {
                let data = await response.json()
                data.forEach(comment => {
                    let data_time = new Date(Date.parse(comment.createdAt))
                    let commentCreatedAt = `${data_time.getHours()}:${data_time.getMinutes()} ${("0"+data_time.getDate()).slice(-2)}.${("0"+data_time.getMonth()).slice(-2)}.${data_time.getFullYear()}`
                    comment.createdAt = commentCreatedAt
                })
                console.log("Comments", data);
                setComments(data)
            }
        } catch (e) {
            console.log(e);
        }
    }

    const changeCommentHandler = event => {
        setComment({...comment, [event.target.name]: event.target.value})
    }

    const createCommentHandler = async () => {
        try {
            if (comment.message !== "") {
                const user = JSON.parse(localStorage.getItem("userData"))
                const data = await fetch(`/api/comments/${params.id}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token,
                    },
                    body: JSON.stringify(comment),
                    method: "POST"})
                getComments()
                setComment({message: ""})
                console.log("Comment create", data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const deleteCommentHandler = async () => {
        try {
            
        } catch (e) {
            console.log(e)
        }
    }

    

    return (
        <div className="OrderComments">
            <div className="commentsBarHeader"><h2>Comments ({comments.length})</h2></div>
            <div className="commentsContentSection">
            {comments.map((comment) => {
                return <div className="comment" key={comment.id}>
                    <div className="user">{comment.userId ? <UserName userId={comment.userId}></UserName> : null}</div>
                    <div className="content">{comment.message}</div>
                    <div className="time">{comment.createdAt}</div>
                    { authUser.isAuthenticated ? user.roleId == 2 ? <button className="button-27" onClick={deleteCommentHandler}>adminDelete</button> : <div></div> : null}
                </div>
            })}
            </div>
            { authUser.isAuthenticated ? 
            <div className="commentsCreateSection">
                <textarea className="commentField" name="message" placeholder="Type your comment..." onChange={changeCommentHandler} value={comment.message} />
                <button className="button-27" onClick={createCommentHandler}>Create</button>
            </div> : null }
        </div>
    )
}

export default OrderComments