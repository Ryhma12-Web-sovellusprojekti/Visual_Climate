import React from "react";
import "../App.css";

// A Switch component that can be toggled on and off
function Switch({ isToggled, onToggle }) {

    // The component is rendered using JSX
    return (
        <label className="switch">
            <input type="checkbox" checked={isToggled} onChange={onToggle}/>
            <span className="slider" />
        </label>
    );
};

export default Switch;
