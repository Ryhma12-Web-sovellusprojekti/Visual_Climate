import DataImport from "./DataImport";
import { useState, React, useRef } from "react";
import { Doughnut, getElementsAtEvent  } from "react-chartjs-2";
let hasClicked = false;

export default function Visu5({single}) {

    // Initializing five state variables using the useState hook
    const [sectors, setSectors] = useState([]);
    const [subAgri, setSubAgri] = useState([]);
    const [subEnergy, setSubEnergy] = useState([]);
    const [subIndustry, setSubIndustry] = useState([]);
    const [subWaste, setSubWaste] = useState([]);

  return (
    // Setting state variables using the DataImport component with a path"
    <div>
        <DataImport setData={setSectors} path={single+"8/V5_Sectors"} />
        <DataImport setData={setSubAgri} path={single+"9/V5_Subsectors_Agriculture"} />
        <DataImport setData={setSubEnergy} path={single+"10/V5_Subsectors_Energy"} />
        <DataImport setData={setSubIndustry} path={single+"11/V5_Subsectors_Industrial"} />
        <DataImport setData={setSubWaste} path={single+"12/V5_Subsectors_Waste"} />
        <Graph sectors={sectors} subAgri={subAgri} subEnergy={subEnergy} subIndustry={subIndustry} 
            subWaste={subWaste}/>
    </div>
  );
};

function Graph({ sectors, subAgri, subEnergy, subIndustry, subWaste }) {

    // defines of multiple objects that contain data and styling information for different chart datasets.
    const dataSectors = {
        labels: Object.keys(sectors),
        datasets: [{
            label: "Main sectors",
            data: Object.values(sectors),
            backgroundColor: [
                "rgba(253, 99, 43, 1)" ,
                "rgba(18, 130, 162, 1)",
                "rgba(3, 64, 120, 1)",                
                "rgba(10, 17, 40, 1)",    
            ]
        }]
    };

    const dataSubAgri = {
        labels: Object.keys(subAgri),
        datasets: [{
            label: "Agriculture, Forestry and Land Use",
            data: Object.values(subAgri),
            backgroundColor: [
                "rgba(253, 99, 43, 1)" ,
                "rgba(18, 130, 162, 1)",
                "rgba(3, 64, 120, 1)",                
                "rgba(42, 157, 143, 1)",
                "rgba(10, 17, 40, 1)",  
                "rgba(233, 196, 106, 1)",
                "rgba(132, 165, 157, 1)"
            ]
        }]
    };

    const dataSubEnergy = {
        labels: Object.keys(subEnergy),
        datasets: [{
            label: "Energy",
            data: Object.values(subEnergy),
            backgroundColor: [
                "rgba(253, 99, 43, 1)" ,
                "rgba(18, 130, 162, 1)",
                "rgba(3, 64, 120, 1)",
                "rgba(241, 91, 181, 1)",                
                "rgba(10, 17, 40, 1)",
                "rgba(209, 179, 196, 1)",
                "rgba(233, 196, 106, 1)",
                "rgba(199, 249, 204, 1)",
                "rgba(15, 76, 92, 1)",
                "rgba(245, 202, 195, 1)",
                "rgba(247, 37, 133, 1)",
                "rgba(0, 245, 212, 1)",
                "rgba(112, 224, 0, 1)",
                "rgba(199, 125, 255, 1)",
                "rgba(184, 242, 230, 1)",
                "rgba(251, 111, 146, 1)",
                "rgba(42, 157, 143, 1)",
                "rgba(95, 168, 211, 1)"
            ]
        }]
    };

    const dataSubIndustry = {
        labels: Object.keys(subIndustry),
        datasets: [{
            label: "Industrial processes",
            data: Object.values(subIndustry),
            backgroundColor: [
                "rgba(253, 99, 43, 1)" ,
                "rgba(18, 130, 162, 1)"
            ]
        }]
    };

    const dataSubWaste = {
        labels: Object.keys(subWaste),
        datasets: [{
            label: "Waste",
            data: Object.values(subWaste),
            backgroundColor: [
                "rgba(3, 64, 120, 1)",
                "rgba(241, 91, 181, 1)", 
            ]
        }]
    };

    // Initialize React state variables
    const chartRef = useRef();
    const [subsectorData, setSubsectorData] = useState(dataSubAgri);
    const [doughnutDuo, setDoughnutDuo ] = useState("doughnuts one");
    const [dataTitle, setDataTitle] = useState("");
  
    const onClick = (event) => {

        // Checks if the click event occurred on an element of the chart
        if(getElementsAtEvent(chartRef.current, event).length > 0) {
            hasClicked = true;
            setDoughnutDuo("doughnuts two");
            const dataPoint = getElementsAtEvent(chartRef.current, event)[0].index;
            // Updates state variables based on the clicked element
            switch(dataPoint) {
                case 0:
                    setSubsectorData(dataSubAgri);
                    setDataTitle(chartRef.current.legend.legendItems[dataPoint].text);
                    break;               
                case 1:
                    setSubsectorData(dataSubEnergy);
                    setDataTitle(chartRef.current.legend.legendItems[dataPoint].text);
                    break;
                case 2:
                    setSubsectorData(dataSubIndustry);
                    setDataTitle(chartRef.current.legend.legendItems[dataPoint].text);
                    break;
                default:
                    setSubsectorData(dataSubWaste);
                    setDataTitle(chartRef.current.legend.legendItems[dataPoint].text);
            }
        };        
    };

    // Define sectorOptions for a chart with a responsive layout and various plugins
    const sectorOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Main Sectors"
            },
            legend: {
                display: true,
                position: "top"
            },
        },
        parsing: {
            key: 'emission'
        }
    };

    // Define subsectorOptions for a chart with a responsive layout and various plugins
    const subsectorOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: dataTitle
            },
            legend: {
                display: true,
                position: "top"
            },
        },
        parsing: {
            key: 'emission'
        }
    };

    return (
        <div className={doughnutDuo}>
            <h1>CO2 emissions by sectors</h1>
            <Doughnut options={sectorOptions} data={dataSectors} onClick={onClick} ref={chartRef} />
            {hasClicked &&
                <Doughnut options={subsectorOptions} data={subsectorData} />
            }
        </div>
    ); 
}

export function Visu5Information() {

    /*
    Visu5Information component is responsible for rendering the data information section
    for the visualization 1.
    */

    return(
        <div className="info">
            <a href="https://ourworldindata.org/emissions-by-sector#co2-emissions-by-sector"target="_blank"rel="noreferrer">Data description</a>
            <a href="https://ourworldindata.org/uploads/2020/09/Global-GHG-Emissions-by-sector-based-on-WRI-2020.xlsx"target="_blank"rel="noreferrer">Data sources</a>
        </div>
    );
}
