import dat from "../data/V3.json";
import { Line } from "react-chartjs-2";

export default function V3graph() {
  const dat1 = Object.keys(dat.co2);
  const dat2 = Object.keys(dat.temperature);
  
    const data = {
        datasets: [{
            label: "CO2",
            data: dat1.map((v, i) => ({ x: v, y: Object.values(dat.co2)[i] })),
            borderColor: "rgba(3, 64, 120, 1)",
            backgroundColor: "rgba(3, 64, 120, 0.5)",
            pointRadius: 1,
            tension: 0.4,
            yAxisID: "y"
        },{
            label: "Temperature",
            data: dat2.map((v, i) => ({ x: v, y: Object.values(dat.temperature)[i] })),
            borderColor: "rgba(253, 99, 43, 1)",
            backgroundColor: "rgba(253, 99, 43, 0.5)",
            pointRadius: 1,
            tension: 0.4,
            yAxisID: "y2"
        },],
    };

    const options = {
      responsive: true,
      plugins: {
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
            stepSize: 1000
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
            <p><a href="https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf ">Link to data sources.</a></p>
        </div>
    ); 
}