import React from "react";
import Visu1,{Visu1Information} from "../components/Visu1";
import Visu2 from "../components/Visu2";
import Visu3, { Visu3Information } from "../components/Visu3";
import Visu5 from "../components/Visu5";

function View1( {goBack}) {
    return <div>
        <Visu1 goBack={goBack}/>
        <Visu1Information />
        <Visu2/>
        <Visu3 />
        <Visu3Information />
     </div>
}

export default View1;