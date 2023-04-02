import React, { useState } from "react";

function CustomView({goBack}) {
    const [viewData, setViewData] = useState("");
  
    const handleInputChange = (event) => {
      setViewData(event.target.value);
    };
  
    return (
      <div>
        <button onClick={goBack}>Back</button>
        <h3>Tällä voi lisätä tekstiä</h3>
        <textarea value={viewData} onChange={handleInputChange} />
        <div dangerouslySetInnerHTML={{ __html: viewData }} />
      </div>
    );
  }

  export default CustomView;