import React from "react";
import Get_v4_national_emissions from "../components/V4_National_CO2_emissions";
import { Chart, LineController, LineElement, UpdateModeEnum } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import { yearsToMonths } from "date-fns";
import { getDocs, collection } from "firebase/firestore";

function Graphv2({ data }) {
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
  const V4_national = Get_v4_national_emissions();
  return (
    <div>
      <Graphv2 data={V4_national}/>
    </div>
  );
}

export default View2;