import React, {useState, useEffect} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import "./Filters.css";

const Filters = ({setCurrentFilter}) => {

    let navigate = useNavigate();
    const [filters, setFilters] = useState([])
    const [value, setValue] = useState(null);

    useEffect(()=>{
        getFilters()
    }, [])

    const getFilters = async () => {
        try{
            const user = JSON.parse(localStorage.getItem("userData"))
            const response = await fetch(`/api/tags`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
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

    const checkboxHandler = event => {
        setValue(event.target.name)
        if (event.target.name === "null") {
            setCurrentFilter(null)
            setValue(null)
        } else {
            setCurrentFilter(event.target.id)
        }        
    }

    return (
        <div className="Filters">
            <div className="filtersHeader">Filters</div>
            <div className="filter">
                <input type={"checkbox"} onChange={checkboxHandler} checked={value == null ? true : false} id={null} name={"null"}/><label>Default</label>
            </div>
            {filters.map((filter) => {
                return <div className="filter">
                <input type={"checkbox"} onChange={checkboxHandler} checked={value == filter.tag ? true : false} id={filter.id} name={filter.tag}/><label>{filter.tag}</label>
            </div>
            })}
        </div>
    )
}

export default Filters