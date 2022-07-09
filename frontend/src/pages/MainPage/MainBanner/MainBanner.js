import React, {useState, useEffect} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import "./MainBanner.css"
import teamImg from "../../../media/team.jpg"

const MainBanner = () => {

    let navigate = useNavigate();

    return (
        <div className="MainBanner">
            <div className="leftSide">
                <div className="circle"></div>
                <div>From </div>
                <div>best talents</div>
                <div>to</div>
                <div>best clients</div>
            </div>
            <div className="center">
                <img className="imgTeam" src={teamImg}></img>
            </div>
        </div>
    )
}

export default MainBanner