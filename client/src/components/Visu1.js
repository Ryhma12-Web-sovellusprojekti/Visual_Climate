import DataImport from "./DataImport";
import { useState, React } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import "chartjs-adapter-date-fns";
Chart.register(...registerables);

export default function Visu1({single}) {

    // Initializing seven state variables using the useState hook
    const [annual_global, setAnnual_global] = useState([]);
    const [annual_north, setAnnual_north] = useState([]);
    const [annual_south, setAnnual_south] = useState([]);
    const [annual_rec, setAnnual_rec] = useState([]);
    const [monthly_global, setMonthly_global] = useState([]);
    const [monthly_north, setMonthly_north] = useState([]);
    const [monthly_south, setMonthly_south] = useState([]);

    return (
        // Setting state variables using the DataImport component with a path"
        <div>   
            <DataImport setData={setAnnual_global} path={single+"0/V1_Annual/global"}/>
            <DataImport setData={setAnnual_north} path={single+"0/V1_Annual/north"}/>
            <DataImport setData={setAnnual_south} path={single+"0/V1_Annual/south"}/>
            <DataImport setData={setAnnual_rec} path={single+"2/V1_RecAnnual/reconstructed"}/>
            <DataImport setData={setMonthly_global} path={single+"1/V1_Monthly/global"}/>
            <DataImport setData={setMonthly_north} path={single+"1/V1_Monthly/north"}/>
            <DataImport setData={setMonthly_south} path={single+"1/V1_Monthly/south"}/>
            <Graph1  annual_global={annual_global} annual_north={annual_north} annual_south={annual_south} annual_rec={annual_rec} monthly_global={monthly_global} monthly_north={monthly_north} monthly_south={monthly_south}/>
        </div>
    );
}

function Graph1({annual_global, annual_north, annual_south, annual_rec, monthly_global, monthly_north, monthly_south }) {

    // Seven arrays of keys corresponding to the state variables
    const dat1 = Object.keys(annual_global);
    const dat2 = Object.keys(annual_north);
    const dat3 = Object.keys(annual_south);
    const dat4 = Object.keys(annual_rec);
    const dat5 = Object.keys(monthly_global);
    const dat6 = Object.keys(monthly_north);
    const dat7 = Object.keys(monthly_south);
        // The 'datasets' property is an array of objects, each defining a data set.
        const annual = {
            datasets: [{
                label: "Global annual anomalies",
                data: dat1.map((v, i) => ({ x: v, y: Object.values(annual_global)[i] })),
                borderColor: "rgb(10, 17, 40)",
                backgroundColor: "rgba(10, 17, 40, 0.5)",
                pointRadius: 1,
                tension: 0.4,
                yAxisID: "y"
            },{
                label: "North annual anomalies",
                data: dat2.map((v, i) => ({ x: v, y: Object.values(annual_north)[i] })),
                borderColor: "rgb(3, 64, 120)",
                backgroundColor: "rgba(3, 64, 120, 0.5)",
                pointRadius: 1,
                tension: 0.4,
                yAxisID: "y"
            },{
                label: "South annual anomalies",
                data: dat3.map((v, i) => ({ x: v, y: Object.values(annual_south)[i] })),
                borderColor: "rgb(253, 99, 43)",
                backgroundColor: "rgba(253, 99, 43, 0.5)",
                pointRadius: 1,
                tension: 0.4,
                yAxisID: "y"
            },
            {
                label: "Reconstruction",
                data: dat4.map((v, i) => ({ x: v, y: Object.values(annual_rec)[i] })),
                borderColor: "rgb(18, 130, 162)",
                backgroundColor: "rgba(18, 130, 162, 0.5)",
                pointRadius: 1,
                tension: 0.4,
                yAxisID: "y",
                hidden: true
            },],
        };

    const monthly = {
        datasets: [{
              label: "Global monthly anomalies",
              data: dat5.map((v, i) => ({ x: v, y: Object.values(monthly_global)[i] })),
              borderColor: "rgb(0, 0, 0)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              pointRadius: 1,
              tension: 0.4,
              yAxisID: "y"
          },{
              label: "North monthly anomalies",
              data: dat6.map((v, i) => ({ x: v, y: Object.values(monthly_north)[i] })),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              pointRadius: 1,
              tension: 0.4,
              yAxisID: "y"
          },{
              label: "South monthly anomalies",
              data: dat7.map((v, i) => ({ x: v, y: Object.values(monthly_south)[i] })),
              borderColor: "rgb(255, 145, 0)",
              backgroundColor: "rgba(255, 145, 0, 0.5)",
              pointRadius: 1,
              tension: 0.4,
              yAxisID: "y"
          },],
      };
      
      const options1 = {
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
                  text: "Global historical surface temperature anomalies from January 1850 onwards",
              },
            },
          scales: {
              x:{
                  type: "time",
                  time:{unit: "year"},
                  ticks: {
                      stepSize: 1
                  }
              },
              y:  {
                  beginAtZero: true,
                  type: "linear",
                  position: "left"
              }
          },
      };

      const options2 = {
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
                  text: "Global historical surface temperature anomalies from January 1850 onwards",
              },
          },
          scales: {
              x:{
                  type: "time",
                  time:{unit: "month"},
              ticks: {
                  stepSize: 1
              }
              },
              y:  {
                  beginAtZero: true,
                  type: "linear",
                  position: "left"
              }
          },
      };
      
    // Initializing two state variables using the useState hook
    const [isClicked, setIsClicked] = useState(true);
    const [x, setX] = useState("1");

    // ChangeView which sets x and isClicked state based on button clicked
    const changeView = (e) => {
        setX(e.target.value);
        setIsClicked(true);
    };

    // Switch statement to conditionally render a different set of JSX based on the value of x
    switch (x) {
        case "1":
            return (
                <div className="chart" data-testid="visu1">
                    <button value={"1"} onClick={e => changeView(e)}>Annual</button>
                    <button value={"2"} onClick={e => changeView(e)}>Monthly</button>
                    {isClicked &&                     
                    <div>
                        <h1>Global historical surface temperature</h1>
                        <Line options={options1} data={annual} />
                    </div>}
                </div>
            );
        case "2":
            return (
                <div className="chart" data-testid="visu1">
                    <button value={"1"} onClick={e => changeView(e)}>Annual</button>
                    <button value={"2"} onClick={e => changeView(e)}>Monthly</button>
                    {isClicked &&
                    <div>
                        <h1>Global historical surface temperature anomalies from January 1850 onwards</h1>
                        <Line options={options2} data={monthly} />
                    </div>}
                </div>
            );
    }
}

export function Visu1Information() {

    /*
    Visu1Information component is responsible for rendering the data information section
    for the visualization 1. It displays information about the data sources used to generate
    the visualizations along with their characteristics.
    */

    return(
    <section>
        <article>
        <h3>Annual and monthly global, north and south area data</h3>
        <p>The HadCRUT5 near surface temperature data set is produced by blending data from the CRUTEM5 surface air temperature dataset and the HadSST4 sea-surface temperature dataset. The dataset are presented as an ensemble of 200 dataset realisations that sample the distribution of uncertainty. Time series are presented as temperature anomalies (deg C) relative to 1961-1990. It is good to note that in the ensemble generated from the statistical analysis includes uncertainties which can be caused, for example, by a measurement error. You can learn more from the links below.</p>
        <a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/" target="_blank" rel="noreferrer" title="link to data sources">Global, north and south data sources</a>
        <h3>Reconstruction data</h3>
        <p>In reconstruction data set there is Northern Hemisphere temperatures from 2,000 years which is provided by combining low-resolution proxies with tree-ring data, using a wavelet transform technique to reach timescale-dependent processing of the data. The reconstruction shows larger multicentennial variability than most previous multi-proxy reconstructions. It agrees well with temperatures reconstructed from borehole measurements and also with temperatures obtained with a general circulation model. These findings can be found in the study, which you can read more about in the link below.</p>
        <a href="https://www.ncei.noaa.gov/pub/data/paleo/contributions_by_author/moberg2005/nhtemp-moberg2005.txt" target="_blank" rel="noreferrer" title="link to reconstruction">Reconstructions data sources</a>
        <a href="https://www.nature.com/articles/nature03265" target="_blank" rel="noreferrer" title="link to the study">Leran more about the study.</a>
      </article>
    </section>
    );
}
