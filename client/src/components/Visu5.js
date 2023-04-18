import DataImport from "./DataImport";
import { useState, React, useRef } from "react";
import { Doughnut, getElementsAtEvent  } from "react-chartjs-2";

export default function Visu5() {
    const [sectors, setSectors] = useState([]);
    const [subAgri, setSubAgri] = useState([]);
    const [subEnergy, setSubEnergy] = useState([]);
    const [subIndustry, setSubIndustry] = useState([]);
    const [subWaste, setSubWaste] = useState([]);

  return (
    <div>
        <DataImport setData={setSectors} path="8/V5_Sectors" />
        <DataImport setData={setSubAgri} path="9/V5_Subsectors_Agriculture" />
        <DataImport setData={setSubEnergy} path="10/V5_Subsectors_Energy" />
        <DataImport setData={setSubIndustry} path="11/V5_Subsectors_Industrial" />
        <DataImport setData={setSubWaste} path="12/V5_Subsectors_Waste" />
        <Graph sectors={sectors} subAgri={subAgri} subEnergy={subEnergy} subIndustry={subIndustry} 
            subWaste={subWaste}/>
    </div>
  );
};

export function Visu5Information() {
    return(
      <div className="info">
        <a href="https://ourworldindata.org/emissions-by-sector#co2-emissions-by-sector"target="_blank"rel="noreferrer">Data description</a>
        <a href="https://ourworldindata.org/uploads/2020/09/Global-GHG-Emissions-by-sector-based-on-WRI-2020.xlsx"target="_blank"rel="noreferrer">Data sources</a>
      </div>
    );
  }

function Graph({ sectors, subAgri, subEnergy, subIndustry, subWaste }) {
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

    const chartRef = useRef();
    const [subsectorData, setSubsectorData] = useState(dataSubAgri);
    const [dataTitle, setDataTitle] = useState("");
  
    const onClick = (event) => {
        if(getElementsAtEvent(chartRef.current, event).length > 0) {
            const dataPoint = getElementsAtEvent(chartRef.current, event)[0].index;
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
        <div className="doughnuts">
            <h1>CO2 emissions by sectors</h1>
            <Doughnut options={sectorOptions} data={dataSectors} onClick={onClick} ref={chartRef} />
            <Doughnut options={subsectorOptions} data={subsectorData} />
        </div>
    ); 
}
