import React, { useState } from "react";
import Visu1 from "../components/Visu1";
import Visu2 from "../components/Visu2";
import Visu3 from "../components/Visu3";
import Visu5 from "../components/Visu5";

function CustomView({ goBack }) {
  const [viewData, setViewData] = useState("");
  const [showV1Component, setShowV1Component] = useState(false);
  const [showV2Component, setShowV2Component] = useState(false);
  const [showV3Component, setShowV3Component] = useState(false);
  const [showV5Component, setShowV5Component] = useState(false);

  const handleInputChange = (event) => {
    setViewData(event.target.value);
  };

  const handleV1Click = () => {
    if (showV1Component === false) {
      setShowV1Component(true);
    }
    else { setShowV1Component(false); }
  }

  const handleV2Click = () => {
    if (showV2Component === false) {
      setShowV2Component(true);
    }
    else { setShowV2Component(false); }
  }

  const handleV3Click = () => {
    if (showV3Component === false) {
      setShowV3Component(true);
    }
    else { setShowV3Component(false); }
  }

  const handleV5Click = () => {
    if (showV5Component === false) {
      setShowV5Component(true);
    }
    else { setShowV5Component(false); }
  }

  return (
    <div>
      <button onClick={goBack}>Back</button>
      <button onClick={handleV1Click}>Add / Delete V1</button>
      <button onClick={handleV2Click}>Add / Delete V2</button>
      <button onClick={handleV3Click}>Add / Delete V3</button>
      <button onClick={handleV5Click}>Add / Delete V5</button>
      {showV1Component && <Visu1 />}
      {showV2Component && <Visu2 />}
      {showV3Component && <Visu3 />}
      {showV5Component && <Visu5 />}
      <h3>Tällä voi lisätä tekstiä</h3>
      <textarea value={viewData} onChange={handleInputChange} />
      <div dangerouslySetInnerHTML={{ __html: viewData }} />
    </div>
  );
}

export default CustomView;

