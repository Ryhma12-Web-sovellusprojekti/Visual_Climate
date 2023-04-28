import React from "react";
import Visu1,{Visu1Information} from "../components/Visu1";
import Visu2, {Visu2Information} from "../components/Visu2";
import Visu3, { Visu3Information } from "../components/Visu3";

function View1({goBack}) {
    return <div>
        <button onClick={goBack}>Back</button>
        <Visu1 single=""/>
        <Visu1Information />
        <Visu2 single=""/>
        <Visu2Information/>
        <Visu3 single=""/>
        <Visu3Information />
     </div>
}

export default View1;