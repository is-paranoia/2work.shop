import React, {useState, useEffect} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import "./Filters.css";

const Filters = () => {

    let navigate = useNavigate();

    return (
        <div className="Filters">
            <div className="filtersHeader">Filters</div>
            <div className="filter">
                <input type={"checkbox"}/><label>Checkbox 1</label>
            </div>
            <div className="filter">
                <input type={"checkbox"}/><label>Checkbox 2</label>
            </div>
            <div className="filter">
                <input type={"checkbox"}/><label>Checkbox 3</label>
            </div>
            <div className="filter">
                <input type={"checkbox"}/><label>Checkbox 4</label>
            </div>
        </div>
    )
}

export default Filters