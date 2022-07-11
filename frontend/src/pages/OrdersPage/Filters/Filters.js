import React, {useState, useEffect} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import "./Filters.css";

const Filters = () => {

    let navigate = useNavigate();
    const [filters, setFilters] = useState([])

    useEffect(()=>{
        getFilters()
    }, [])

    const getFilters = async () => {
        try{
            const user = JSON.parse(localStorage.getItem("userData"))
            const response = await fetch(`/api/tags`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                  },
                method: "GET"
            })
            if (response.ok) {
                const data = await response.json()
                console.log("Filters", data);
                setFilters(data)
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="Filters">
            <div className="filtersHeader">Filters</div>
            {filters.map((filter) => {
                return <div className="filter">
                <input type={"checkbox"}/><label>{filter.tag}</label>
            </div>
            })}
        </div>
    )
}

export default Filters