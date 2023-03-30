import React, { useState } from "react";
import { DateTime } from "luxon";
import { Chart, LineController, LineElement, UpdateModeEnum } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import { yearsToMonths } from "date-fns";
import { getDocs, collection } from "firebase/firestore";


function Visu1( {goBack}) {
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
    const [chartTime, setChartTime] = useState("year");
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
                    unit: chartTime,
                },
            },
            yAxis: {
                type: "linear",
            },
        },
    };
    const [isClicked, setIsClicked] = useState(true);

    const [x, setX] = useState("1");

    const changeView = (e) => {
        setX(e.target.value);
        setIsClicked(true);
        if (e.target.value === "1") {
            setChartTime("year");
        }
        else {
            setChartTime("month");
        }

    };

    switch (x) {

        case "1":
            return (
                <div className="chart">
                    <button onClick={goBack}>Back</button>
                    <h1>Global historical surface temperature</h1>
                    <button value={"1"} onClick={e => changeView(e)}>Annual</button>
                    <button value={"2"} onClick={e => changeView(e)}>Monthly</button>
                    {isClicked &&                     
                    <div style={{position: "relative", width:"100%"}}>
                        <Line options={options} data={year} />
                        <br />
                        <p><a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/">Link to data sources.</a></p>
                    </div>}
                </div>
            );

        case "2":
            return (
                <div className="chart">
                    <h1>Global historical surface temperature</h1>
                    <button value={"1"} onClick={e => changeView(e)}>Annual</button>
                    <button value={"2"} onClick={e => changeView(e)}>Monthly</button>
                    {isClicked &&
                    <div style={{position: "relative", width:"100%"}}>
                        <Line options={options} data={month} />
                        <br />
                        <p><a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/">Link to data sources.</a></p>
                    </div>}
                </div>
            );

    }


}
export default Visu1;