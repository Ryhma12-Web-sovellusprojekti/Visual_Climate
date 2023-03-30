import React from "react";
import Visu1,{Visu1Information} from "../components/Visu1";
import Visu3, { Visu3Information } from "../components/Visu3";

function View1( {goBack}) {
    return <div>
        <Visu1 goBack={goBack}/>
        <Visu1Information />
        <Visu3 />
        <Visu3Information />
     </div>
}

export default View1;