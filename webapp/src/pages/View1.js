import React from "react";
import Visu3 from "../components/Visu3";
import Visu1,{Visu1Information} from "../components/Visu1";

function View1() {
    return <div>
        <Visu1/>
        <Visu1Information/>
        <Visu3/>
     </div>
}

export default View1;