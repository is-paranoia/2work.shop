import React, {useState, useEffect} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import MainBanner from "./MainBanner/MainBanner";
import "./MainPage.css";
//import videoBg from "../../media/workspace.webm"
//<video className="videoBg" src={videoBg} autoPlay loop muted/>
const MainPage = () => {

    let navigate = useNavigate();

    return (
        <div className="MainPage">
           <MainBanner/>
        </div>
    )
}

export default MainPage