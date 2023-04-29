import DataImport from "./DataImport";
import { useState, React } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import "chartjs-adapter-date-fns";
Chart.register(...registerables);

export default function Visu2({single}) {
  const [maunaloa_annual, setMaunaloa_annual] = useState([]);
  const [maunaloa_monthly, setMaunaloa_monthly] = useState([]);
  const [de08_ice, setDe08_ice] = useState([]);
  const [de08_2_ice, setDe08_2_ice] = useState([]);
  const [dss_ice, setDss_ice] = useState([]);
  

  return (
    <div>   
      <DataImport setData={setMaunaloa_annual} path={single+"4/V2_MaunaLoa/annual"}/>
      <DataImport setData={setMaunaloa_monthly} path={single+"4/V2_MaunaLoa/monthly"}/>
      <DataImport setData={setDe08_ice} path={single+"3/V2_Cores/DE08"}/>
      <DataImport setData={setDe08_2_ice} path={single+"3/V2_Cores/DE08_2"}/>
      <DataImport setData={setDss_ice} path={single+"3/V2_Cores/DSS"}/>
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
              borderColor: "rgb10, 17, 40)",
              backgroundColor: "rgba(10, 17, 40, 0.5)",
              pointRadius: 1,
              tension: 0.4,
              yAxisID: "y"
          },{
              label: "CO2 Monthly",
              data: dat2.map((v, i) => ({ x: v, y: Object.values(maunaloa_monthly)[i] })),
              borderColor: "rgb(3, 64, 120)",
              backgroundColor: "rgba(3, 64, 120, 0.5)",
              pointRadius: 1,
              tension: 0.4,
              yAxisID: "y"
            },{
                label: "DE08 ice",
                data: dat3.map((v, i) => ({ x: v, y: Object.values(de08_ice)[i] })),
                borderColor: "rgb(253, 99, 43)",
                backgroundColor: "rgba(253, 99, 43, 0.5)",
                pointRadius: 1,
                tension: 0.4,
                yAxisID: "y",
                hidden: true
              },{
                label: "DE08-2 ice",
                data: dat4.map((v, i) => ({ x: v, y: Object.values(de08_2_ice)[i] })),
                borderColor: "rgb(18, 130, 162)",
                backgroundColor: "rgba(18, 130, 162, 0.5)",
                pointRadius: 1,
                tension: 0.4,
                yAxisID: "y",
                hidden: true
              },{
                label: "DSS ice",
                data: dat5.map((v, i) => ({ x: v, y: Object.values(dss_ice)[i] })),
                borderColor: "rgb(255, 235, 44)",
                backgroundColor: "rgba(255, 235, 44, 0.5)",
                pointRadius: 1,
                tension: 0.4,
                yAxisID: "y",
                hidden: true
              },
      ],
      };
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
            text: "Atmospheric CO2 concentrations and Antarctic Ice Core records",
          },
        },
        scales: {
          x:{
            type: "time",
            time:{unti: "month"},
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
                    <h1>Atmospheric CO2 concentrations from Mauna Loa measurements and Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements</h1>
                    <Line options={options} data={data} />
                   
                </div>
            );
}

export function Visu2Information() {

    /*
    Visu2Information component is responsible for rendering the data information section
    for the visualization 1.
    */

    return(<section>
        <article>
            <h3>Annual and monthly CO2 data</h3>
            <p>The CO2 measurements are made in Mauna Loa Observatory and findings shows the changes in the atmosphere. All of the measurements are rigorously and very frequently calibrated and these independent measurements are constantly compared. Therefore, the measurements can be considered reliable. You can learn more from the links below.</p>
            <a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html" target="_blank" rel="noreferrer" title="link to data description">CO2 data description</a>
            <a href="https://gml.noaa.gov/ccgg/trends/data.html" target="_blank" rel="noreferrer" title="link to data sources">CO2 data sources</a>
            <h3>Antarctic Ice Core records</h3>
            <p>The CO2 records (DE08 ice, DE08-2 ice and DSS ice) are from three ice cores obtained at East Antarctica. The place where the measurements were made fullfills many of the desirable characteristics of an ideal ice core site for atmospheric CO2 reconstructions, for example negligible melting of the ice sheet surface and high snow accumulation rate. You can learn more from the links below.</p>
            <a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html" target="_blank" rel="noreferrer" title="link to reconstruction data description">Antarctic Ice Core data description</a>
            <a href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/lawdome.combined.dat" target="_blank" rel="noreferrer" title="link to reconstruction">Antarctic Ice Core records</a>
        </article>
    </section>
    );
}

