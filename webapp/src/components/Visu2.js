import DataImport from "./DataImport";
import { useState, React } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import "chartjs-adapter-date-fns";
Chart.register(...registerables);

export default function Visu2() {
  const [maunaloa_annual, setMaunaloa_annual] = useState([]);
  const [maunaloa_monthly, setMaunaloa_monthly] = useState([]);
  const [de08_ice, setDe08_ice] = useState([]);
  const [de08_2_ice, setDe08_2_ice] = useState([]);
  const [dss_ice, setDss_ice] = useState([]);
  

  return (
    <div>   
      <DataImport setData={setMaunaloa_annual} path="4/V2_MaunaLoa/annual" />
      <DataImport setData={setMaunaloa_monthly} path="4/V2_MaunaLoa/monthly" />
      <DataImport setData={setDe08_ice} path="3/V2_Cores/DE08" />
      <DataImport setData={setDe08_2_ice} path="3/V2_Cores/DE08_2" />
      <DataImport setData={setDss_ice} path="3/V2_Cores/DSS" />
      <Graph1  maunaloa_annual={maunaloa_annual} maunaloa_monthly={maunaloa_monthly}de08_ice={de08_ice} de08_2_ice={de08_2_ice}dss_ice={dss_ice}/>
    </div>
  );
}

function Graph1({maunaloa_annual, maunaloa_monthly, de08_ice, de08_2_ice, dss_ice}) {
    const dat1 = Object.keys(maunaloa_annual);
    const dat2 = Object.keys(maunaloa_monthly);
    const dat3 = Object.keys(de08_ice);
    const dat4 = Object.keys(de08_2_ice);
    const dat5 = Object.keys(dss_ice);
    
      const data = {
          datasets: [{
              label: "CO2 Annual",
              data: dat1.map((v, i) => ({ x: v, y: Object.values(maunaloa_annual)[i] })),
              borderColor: "rgb(0, 0, 0)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              pointRadius: 1,
              tension: 0.4,
              yAxisID: "y"
          },{
              label: "CO2 Monthly",
              data: dat2.map((v, i) => ({ x: v, y: Object.values(maunaloa_monthly)[i] })),
              borderColor: "rgb(255, 145, 0)",
              backgroundColor: "rgba(255, 145, 0, 0.5)",
              pointRadius: 1,
              tension: 0.4,
              yAxisID: "y"
            },{
                label: "DE08 ice",
                data: dat3.map((v, i) => ({ x: v, y: Object.values(de08_ice)[i] })),
                borderColor: "rgb(3, 64, 120)",
                backgroundColor: "rgba(3, 64, 120, 0.5)",
                pointRadius: 1,
                tension: 0.4,
                yAxisID: "y",
                hidden: true
              },{
                label: "DE08-2 ice",
                data: dat4.map((v, i) => ({ x: v, y: Object.values(de08_2_ice)[i] })),
                borderColor: "rgb(0, 178, 53)",
                backgroundColor: "rgba(0, 178, 53, 0.5)",
                pointRadius: 1,
                tension: 0.4,
                yAxisID: "y",
                hidden: true
              },{
                label: "DSS ice",
                data: dat5.map((v, i) => ({ x: v, y: Object.values(dss_ice)[i] })),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                pointRadius: 1,
                tension: 0.4,
                yAxisID: "y",
                hidden: true
              },
      ],
      };
      const [chartTime, setChartTime] = useState("month");
      const options = {
        responsive: true,
        plugins: {
          tooltip: {
            displayColors: false,
          },
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958",
          },
        },
        scales: {
          x:{
            type: "time",
            time:{unti: chartTime},
            ticks: {
              stepSize: 1
            }
          },
            y:  {
              type: "linear",
              position: "left",
              ticks: {
                stepSize: 1
              }
            }
        },
      };

            return (
                <div className="chart">
                    <h1>Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958</h1>
                    <Line options={options} data={data} />
                   
                </div>
            );
}

export function Visu2Information() {
    return(<>
    </>
    );
  }

