import DataImport from "./DataImport";
import { useState, React } from "react";
import { Line } from "react-chartjs-2";

export default function Visu4() {
  const [v4nationalstate, setV4National] = useState(null);
  return (
    <div>      
      <DataImport setData={setV4National}  path="7/V4_National_CO2_emissions/Finland" />
      <Graph v4nationalstate={v4nationalstate}/>
    </div>
  );
}

export function Visu4Information() {
  return(
    <div>
      <a href="https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2021"target="_blank"rel="noreferrer">National emissions data source</a>
    </div>
  );
}

function Graph(v4nationalstate) {
  const dat = Object.keys(v4nationalstate);
  
  const data = {
      datasets: [{
          label: "Finland" ,
          data: dat.map((v, i) => ({ x: v, y: Object.values(v4nationalstate)[i] })),
          borderColor: "rgba(3, 64, 120, 1)",
          backgroundColor: "rgba(3, 64, 120, 0.5)",
          pointRadius: 1,
          tension: 0.4,
          yAxisID: "y"
      },],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
            unit: dat,
        },
    },
    yAxis: {
        type: "linear",
    },
    },
  };

    return (
        <div>
            <h1> CO2 emissions by country </h1>
            <Line data={data} options={options}/>
        </div>
    ); 
}