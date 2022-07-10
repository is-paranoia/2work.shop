import React, {useState, useEffect} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import "./Header.css"
import Navbar from "./Navbar/Navbar";
import UserInfo from "./Navbar/UserInfo/UserInfo";

const Header = () => {

    let navigate = useNavigate();

    return (
        <div className="header">
            <div className="menu">
                <div className="logo">2Work</div>
                <Navbar/>
            </div>
            <div className="user-info">
                <UserInfo />
            </div>
        </div>
    )
}

export default Header