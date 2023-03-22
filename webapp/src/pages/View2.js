import React from "react";
import { rtdb } from '../firebase-config'; // Tämä on meidän realtime database
import { ref, child, get } from "firebase/database";
import { useEffect, useState } from "react";
import { Chart, LineController, LineElement, UpdateModeEnum } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import { yearsToMonths } from "date-fns";
import { getDocs, collection } from "firebase/firestore";

function Graphv2() {
    const [data, setData] = useState(null);

    useEffect(() => {
      const emissionsRef = ref(rtdb, "V4_National_CO2_emissions/Afghanistan");
      get(emissionsRef).then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }, []);

    return (
      <div>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
}
function View2() {
    return <div> 
        <Graphv2 /> 
        </div>
}

export default View2;