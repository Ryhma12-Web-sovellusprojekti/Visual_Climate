import React from "react";
import Visu3 from "../components/Visu3";
import Visu1 from "../components/Visu1";

function View1( {goBack}) {
    return <div>
        <Visu1 goBack={goBack}/>
        <Visu3/>
     </div>
}

export default View1;