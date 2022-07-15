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
           <div className="hold hd1"></div>
           <div className="hold hd2"></div>
           <div className="hold hd3"></div>
           <div className="hold hd4"></div>
           <div className="hold hd5"></div>
        </div>
    )
}

export default MainPage