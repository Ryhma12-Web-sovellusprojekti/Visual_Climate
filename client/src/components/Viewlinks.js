import React, { useState, useEffect } from "react";
import View1 from "../pages/View1";
import View2 from "../pages/View2";
import CustomView from "../pages/CustomView";
import CustomViewEdit from "../pages/CustomViewEdit";

function Viewlinks({route}) {

    // Declaratoion of state variable
    const [rview, setView ] = useState(route);

    // Function to change the view
    const changeView = (e) => {

        // Push new state to history API
        window.history.pushState(null, "", `/home/${e.target.value}`);
        setView(e.target.value);
    };
    
    useEffect(() => {

      // Handling popstate event
      const handlePopState = () => {
          setView(0);
      };

      // Adding popstate event listener
      window.addEventListener("popstate", handlePopState);

      return () => {
          // Removing popstate event listener on unmount
          window.removeEventListener("popstate", handlePopState);
      };
    }, []);

    // Function to go back to the default view
    const goBack = () => {

        // Pushing new state to history API
        window.history.pushState(null, "", "/home");

        // Set state to default view
        setView(0);
    };

    // Using switch statement to render different views based on rview state
    switch (rview) {
      case "View1":
          return <View1 goBack={goBack}/>;
      case "View2":
          return <View2 goBack={goBack}/>;
      case "CustomView":
          return <CustomView goBack={goBack}/>;
      case "CustomViewEdit":
          return <CustomViewEdit goBack={goBack}/>;
      default:
          // If no view is selected, rendering view selection buttons
          return (
              <>
                  <button value={"View1"} onClick={e => changeView(e)}>View 1</button>
                  <button value={"View2"} onClick={e => changeView(e)}>View 2</button>
                  <button value={"CustomView"} onClick={e => changeView(e)}>Create Custom View</button>
                  <button value={"CustomViewEdit"} onClick={e => changeView(e)}>Edit Custom Views</button>
              </>
          );
    }
}

export default Viewlinks;
