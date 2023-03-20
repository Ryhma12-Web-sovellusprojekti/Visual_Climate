import React from "react";
import { Chart, LineController, LineElement, UpdateModeEnum } from "chart.js/auto";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import { yearsToMonths } from "date-fns";

export default function TimeLineGraphDemo() {
  const year = {
    //Muuta tähän tietojen haku Firebasesta
    datasets: [
      {
        label: "Global",
        data:  
        [
          {
            time: "1850",
            value: "-0.41765878",
          },
          {
            time: "1851",
            value: "-0.2333498",
          },
          {
            time: "1852",
            value: "-0.22939907",
          },
          {
            time: "1853",
            value: "-0.27035445",
          },
          {
            time: "1854",
            value: "-0.29163003",
          },
          {
            time: "1855",
            value: "-0.2969512",
          },
          {
            time: "1856",
            value: "-0.32035372",
          },
          {
            time: "1857",
            value: "-0.46723005",
          },
          {
            time: "1858",
            value: "-0.3887657",
          },
          {
            time: "1859",
            value: "-0.28119546",
          },
          {
            time: "1860",
            value: "-0.39016518",
          },
          {
            time: "1861",
            value: "-0.42927712",
          },
          {
            time: "1862",
            value: "-0.53639776",
          },
          {
            time: "1863",
            value: "-0.3443432",
          },
          {
            time: "1864",
            value: "-0.4654367",
          },
          {
            time: "1865",
            value: "-0.33258784",
          },
          {
            time: "1866",
            value: "-0.34126064",
          },
          {
            time: "1867",
            value: "-0.35696334",
          },
        ],
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        pointRadius: 1,
      },
      {
        label: "North",
        data: 
        [
        {
          time: "1850",
          value: "-0.43579108",
        },
        {
          time: "1851",
          value: "-0.21924901",
        },
        {
          time: "1852",
          value: "-0.23570205",
        },
        {
          time: "1853",
          value: "-0.24539217",
        },
        {
          time: "1854",
          value: "-0.17490809",
        },
        {
          time: "1855",
          value: "-0.24564321",
        },
        {
          time: "1856",
          value: "-0.33354086",
        },
        {
          time: "1857",
          value: "-0.45139664",
        },
        {
          time: "1858",
          value: "-0.3586044",
        },
        {
          time: "1859",
          value: "-0.24764407",
        },
        {
          time: "1860",
          value: "-0.45903206",
        },
        {
          time: "1861",
          value: "-0.42927712",
        },
        {
          time: "1862",
          value: "-0.7015686",
        },
        {
          time: "1863",
          value: "-0.30135897",
        },
        {
          time: "1864",
          value: "-0.46164352",
        },
        {
          time: "1865",
          value: "-0.367516",
        },
        {
          time: "1866",
          value: "-0.37373003",
        },
        {
          time: "1867",
          value: "-0.40509325",
        },
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        pointRadius: 1,
      },
      {
        label: "South",
        data: 
         [
          {
            time: "1850",
            value: "-0.39952648",
          },
          {
            time: "1851",
            value: "-0.24745059",
          },
          {
            time: "1852",
            value: "-0.2230961",
          },
          {
            time: "1853",
            value: "-0.2953167",
          },
          {
            time: "1854",
            value: "-0.408352",
          },
          {
            time: "1855",
            value: "-0.3482592",
          },
          {
            time: "1856",
            value: "-0.30716658",
          },
          {
            time: "1857",
            value: "-0.48306343",
          },
          {
            time: "1858",
            value: "-0.41892695",
          },
          {
            time: "1859",
            value: "-0.31474683",
          },
          {
            time: "1860",
            value: "-0.32129827",
          },
          {
            time: "1861",
            value: "-0.4530126",
          },
          {
            time: "1862",
            value: "-0.37122685",
          },
          {
            time: "1863",
            value: "-0.38732743",
          },
          {
            time: "1864",
            value: "-0.4692299",
          },
          {
            time: "1865",
            value: "-0.2976597",
          },
          {
            time: "1866",
            value: "-0.30879125",
          },
          {
            time: "1867",
            value: "-0.30883342",
          },
        ],
        borderColor: "rgb(255, 145, 0)",
        backgroundColor: "rgba(255, 145, 0, 0.5)",
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        pointRadius: 1,
      },
    ],
  };
  const month = {
    //Muuta tähän tietojen haku Firebasesta
    datasets: [
      {
        label: "Global",
        data:  
        [
          {
            time: "1850-01",
            value: "-0.67456436",
          },
          {
            time: "1850-02",
            value: "-0.333416",
          },
          {
            time: "1850-03",
            value: "-0.59132266",
          },
          {
            time: "1850-04",
            value: "-0.58872116",
          },
          {
            time: "1850-05",
            value: "-0.5081851",
          },
        ],
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        pointRadius: 1,
      },
      {
        label: "North",
        data: 
        [
        {
          time: "1850-01",
          value: "-0.9006187",
        },
        {
          time: "1850-02",
          value: "-0.15071486",
        },
        {
          time: "1850-03",
          value: "-0.50326127",
        },
        {
          time: "1850-04",
          value: "-0.67327887",
        },
        {
          time: "1850-05",
          value: "-0.60724604",
        },
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        pointRadius: 1,
      },
      {
        label: "South",
        data: 
         [
          {
            time: "1850-01",
            value: "-0.44851005",
          },
          {
            time: "1850-02",
            value: "-0.5161171",
          },
          {
            time: "1850-03",
            value: "-0.679384",
          },
          {
            time: "1850-04",
            value: "-0.50416344",
          },
          {
            time: "1850-05",
            value: "-0.40912414",
          },
        ],
        borderColor: "rgb(255, 145, 0)",
        backgroundColor: "rgba(255, 145, 0, 0.5)",
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        pointRadius: 1,
      },
    ],
  };
  var x=year;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Global historical surface temperature anomalies from January 1850 onwards",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "year",
        },
      },
      yAxis: {
        type: "linear",
      },
    },
  };

  function timeFrame(period){
    if(period == "year") {
      options.scales.x.time.unit = period;
      x=year;
    }
    else if(period == "month") {
      options.scales.x.time.unit = period;
      x=month;
    }
    //tähän pitäisi saada päivitystoiminto, mutta en vielä saanut toimimaan
  }

  
  
  return (
    <div style={{ width: "1000px" }}>
      <h1>Global historical surface temperature</h1>
      <button onClick={timeFrame(year)} value="year">Annual</button>
      <br/>
      <br/>
      <button onClick={timeFrame(month)} value="month">Monthly</button>
      <Line options={options} data={x} />
      <p><a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/">Link to data sources.</a></p>
    </div>
  );
}
