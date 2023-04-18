import React from "react";
import Visu4, { Visu4Information } from "../components/Visu4";
import Visu5, { Visu5Information } from "../components/Visu5";


function View2({goBack}) {
  return <div>
      <button onClick={goBack}>Back</button>
      <Visu4 />
      <Visu4Information />
      <Visu5 />
      <Visu5Information />
    </div>
}

export default View2;
