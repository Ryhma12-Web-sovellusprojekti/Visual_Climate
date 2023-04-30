import React from "react";
import Visu4, { Visu4Information } from "../components/Visu4";
import Visu5, { Visu5Information } from "../components/Visu5";


function View2({goBack}) {

    // Return displays a Back button, each of the two visualizations, and their corresponding information components.
    return  <div>
                <button onClick={goBack}>Back</button>
                <Visu4 single=""/>
                <Visu4Information />
                <Visu5 single=""/>
                <Visu5Information />
            </div>
}

export default View2;
