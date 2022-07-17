import React, {useState, useEffect} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {NavLink} from "react-router-dom";
import authUser from "../../../store/authUser";
import "./Navbar.css"


const Navbar = () => {

    let navigate = useNavigate();

    return (
        <div className={"navbar-list"}>
            <NavLink to="/" className={({ isActive }) =>
                (isActive ? "navbar-item-active" : "navbar-item")}>Main</NavLink>
            <NavLink to="/orders" className={({ isActive }) =>
                (isActive ? "navbar-item-active" : "navbar-item")}>Find Job</NavLink>
            <NavLink to="/orders/my" className={({ isActive }) =>
                (isActive ? "navbar-item-active" : "navbar-item")}>My Orders</NavLink>
            {authUser.roleId == 2 ? <NavLink to="/admin" className={({ isActive }) =>
                (isActive ? "navbar-item-active" : "navbar-item")}>Admin</NavLink> : null}
        </div>
    )
}

export default Navbar