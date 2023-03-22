import React, { useState } from "react";
import View1 from "../pages/View1";
import View2 from "../pages/View2";
//import { Link } from "react-router-dom";

function Viewlinks() {
    const [rview, setView ] = useState(0);

    const changeView = (e) => {
        setView(e.target.value);
    };
        switch (rview) {
          case "1":
            return <View1 />;
          case "2":
            return <View2 />;
          default:
            return (
                <>
                    <button value={1} onClick={e => changeView(e)}>View 1</button>
                    <button value={2} onClick={e => changeView(e)}>View 2</button>
                </>
            );
        }
}
export default Viewlinks;