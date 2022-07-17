import React, {useState, useEffect} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import "./Footer.css";

const Footer = () => {

    let navigate = useNavigate();

    return (
        <div className="Footer">
            Made by <a href="https://github.com/is-paranoia">paranoia</a> 2022
        </div>
    )
}

export default Footer