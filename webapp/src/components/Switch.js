import React from "react";
import "../App.css";


function Switch({ isToggled, onToggle }) {
    return (
        <label className="switch">
            <input type="checkbox" checked={isToggled} onChange={onToggle}/>
            <span className="slider" />
        </label>

    );
};

export default Switch;