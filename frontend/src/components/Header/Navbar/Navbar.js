import React, {useState, useEffect} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {NavLink} from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {

    let navigate = useNavigate();

    return (
        <div className={"navbar-list"}>
            <NavLink to="/" className={({ isActive }) =>
                (isActive ? "navbar-item-active" : "navbar-item")}>Main</NavLink>
            <NavLink to="/orders" className={({ isActive }) =>
                (isActive ? "navbar-item-active" : "navbar-item")}>Find Job</NavLink>
            <NavLink to="/create_order" className={({ isActive }) =>
                (isActive ? "navbar-item-active" : "navbar-item")}>Find Talent</NavLink>
            <NavLink to="/my-orders" className={({ isActive }) =>
                (isActive ? "navbar-item-active" : "navbar-item")}>My Orders</NavLink>
        </div>
    )
}

export default Navbar