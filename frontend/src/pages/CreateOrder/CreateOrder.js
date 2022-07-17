import React, {useState, useEffect, useContext} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import "./CreateOrder.css";

const CreateOrder = (isAuthenticated) => {
    //const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: 0
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const createHandler = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("userData"))
            const data = await fetch('/api/orders', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                  },
                body: JSON.stringify({...form}),
                method: "POST"})
            console.log("Data", data)
        } catch (e) {
            console.log(e)
        }
        navigate("../orders")
    }

    return (
        <div className="CreateOrder">
           <div className="createOrderForm">
               <h1>Create new order</h1>
               <div className="fields">
                    <input className="title-field" name="title" placeholder="Title" onChange={changeHandler} maxLength="64"/>
                    <textarea className="description-field" name="description" placeholder="Description" onChange={changeHandler} maxLength="1000"/>
                    <input className="price-field" name="price" placeholder="Price" onChange={changeHandler} maxLength="4" onKeyPress={(event) => {
                    if (!/[0-9.]/.test(event.key)) {
                    event.preventDefault();
                    }
      }}/>
               </div>
               <div className="btn-group">
                   <button className="button-27" onClick={createHandler}>Create</button>
               </div>
           </div>
        </div>
    )
}

export default CreateOrder