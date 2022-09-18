import React from "react";

import spinner from "./spinner.svg";

import './Spinner.css';

const Spinner = () => {
    return(
        <div className="spinner">
            <img src={spinner} alt="Загрузка" className="spinner__img" />
        </div>
    )  
}

export default Spinner;