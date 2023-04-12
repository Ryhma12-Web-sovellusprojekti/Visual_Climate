import React, { useState } from "react";
import View1 from "../pages/View1";
import View2 from "../pages/View2";
import CustomView from "../pages/CustomView";
import ShowCustomView from "../pages/ShowCustomView";
import { useNavigate } from 'react-router-dom';

function Viewlinks() {
    const [rview, setView ] = useState(0);

    const changeView = (e) => {
        setView(e.target.value);
    };

    const goBack = () => {
      setView(0);
    };
    
        switch (rview) {
          case "1":
            return <View1 goBack={goBack}/>;
          case "2":
            return <View2 goBack={goBack}/>;
          case "3":
            return <CustomView goBack={goBack}/>;
          case "4":
            return <ShowCustomView goBack={goBack}/>;
          default:
            return (
                <>
                    <button value={1} onClick={e => changeView(e)}>View 1</button>
                    <button value={2} onClick={e => changeView(e)}>View 2</button>
                    <button value={3} onClick={e => changeView(e)}>Custom View</button>
                    <button value={4} onClick={e => changeView(e)}>Show Custom View</button>
                </>
            );
        }
}
export default Viewlinks;