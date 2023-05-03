import DataImport from "./DataImport";
import { useState, React } from "react";
import { Line } from "react-chartjs-2";

export default function Visu3({single}) {

    // Initializing four state variables using the useState hook
    const [co2, setCo2] = useState([]);
    const [temperature, setTemperature] = useState([]);
    const [events, setEvents] = useState([]);
    const [shortLabel, setShortLabel] = useState([]);

    return (
        // Setting state variables using the DataImport component with a path"
        <div>      
            <DataImport setData={setCo2} path={single+"5/V3_CO2_temperature/co2"} />
            <DataImport setData={setTemperature} path={single+"5/V3_CO2_temperature/temperature"} />
            <DataImport setData={setEvents} path={single+"6/V3_Events/event"} />
            <DataImport setData={setShortLabel} path={single+"6/V3_Events/shortLabel"} />
            <Graph co2={co2} temperature={temperature} events={events} shortLabel={shortLabel} />
        </div>
    );
}

function Graph({co2, temperature, events, shortLabel}) {

    // Five arrays of keys corresponding to the state variables
    const dat1 = Object.keys(co2);
    const dat2 = Object.keys(temperature);
    const dat3 = Object.keys(events);
    const eventLabels = Object.values(events);
    const eventTitles = Object.values(shortLabel);

        // The 'datasets' property is an array of objects, each defining a data set.
        const data = {
            datasets: [{
                label: "CO2",
                data: dat1.map((v, i) => ({ x: v, y: Object.values(co2)[i] })),
                borderColor: "rgba(3, 64, 120, 1)",
                backgroundColor: "rgba(3, 64, 120, 0.5)",
                pointRadius: 1,
                tension: 0.4,
                yAxisID: "y"
            },{
                label: "Temperature",
                data: dat2.map((v, i) => ({ x: v, y: Object.values(temperature)[i] })),
                borderColor: "rgba(253, 99, 43, 1)",
                backgroundColor: "rgba(253, 99, 43, 0.5)",
                pointRadius: 1,
                tension: 0.4,
                yAxisID: "y2"
            },{
                label: "Global events",
                data: dat3.map((v) => ({ x: v, y: 290 })),
                borderColor: "rgba(18, 130, 162, 1)",
                backgroundColor: "rgba(18, 130, 162, 0.5)",
                pointBorderColor: "rgba(18, 130, 162, 1)",
                pointBackgroundColor: "rgba(18, 130, 162, 0.5)",
                pointStyle: "rectRot", 
                radius: 5,
                showLine: false,
                yAxisID: "y"
            },],
        };

        // Define options for a chart with a responsive layout and various plugins
        const options = {
            responsive: true,
            plugins: {
                tooltip: {
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            if(context[0].dataset.label === "Global events") {
                                return `${eventTitles[context[0].dataIndex]}`;
                            };
                        },
                        afterBody: function(context) {
                            if(context[0].dataset.label === "Global events") {
                                return `${eventLabels[context[0].dataIndex]}`; 
                            };
                        }
                    }
                },
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "CO2 and surface temperature",
                },
            },
            scales: {
                x: {
                    type: "linear",
                    ticks: {
                        stepSize: 10000
                    }
                },
                y: {
                    beginAtZero: true,
                    type: "linear",
                    position: "left"
                },
                y2:  {
                    beginAtZero: true,
                    type: "linear",
                    position: "right"
                }
            },
        };
    return (
        <div className="chart">
            <h1>Evolution of global temperature over the past two million years</h1>
            <Line options={options} data={data} />
        </div>
    ); 
}

export function Visu3Information() {

  /*
  Visu3Information component is responsible for rendering the data information section
  for the visualization 1.
  */

    return(
        <section>
            <article>
                <p>Reconstruction of global average surface temperature over the past 2 million years and atmospheric CO2 levels over the past 800,000 years. Horizontal axis is negative values of years before the common era. Left vertical axis corresponds to CO2 concentration (in ppm) and right vertical axis is the surface temperature deviation (in Celsius) from the present.  Selected global events can be added to the figure to investigate their association with temperature and CO2 changes.</p>
                <a href="https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf"target="_blank"rel="noreferrer">CO2 and temperature data sources</a>
                <a href="https://www.southampton.ac.uk/~cpd/history.html"target="_blank"rel="noreferrer">Global events data source</a>
            </article>
        </section>
    );
}
