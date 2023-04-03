import DataImport from "./DataImport";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function Visu4() {
  const [v4nationalstate, setV4National] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleInputChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const path = `7/V4_National_CO2_emissions`;

  useEffect(() => {
    setV4National(null);
  }, [path]);

  let countryData = null;
  if (v4nationalstate) {
    countryData = v4nationalstate[selectedCountry];
  }
  return (
    <div>
      <input
        type="text"
        value={selectedCountry}
        onChange={handleInputChange}
        list="countryList"
      />
      <datalist id="countryList">
        {v4nationalstate &&
          Object.keys(v4nationalstate).map((country) => (
            <option key={country} value={country} />
          ))}
      </datalist>
      <DataImport setData={setV4National} path={path} />
      {countryData && <Graph countryData={countryData} />}
    </div>
  );
}
function Graph({ countryData }) {
  const data = {
    labels: Object.keys(countryData),
    datasets: [
      {
        label: "CO2 emissions by country",
        data: Object.values(countryData),
        borderColor: "rgba(3, 64, 120, 1)",
        backgroundColor: "rgba(3, 64, 120, 0.5)",
        pointRadius: 1,
        tension: 0.4,
        yAxisID: "y",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        type: "linear",
      },
    },
  };
  return (
    <div className="chart">
      <h1>CO2 emissions by country</h1>
      <Line data={data} options={options} />
    </div>
  );
}

export function Visu4Information() {
  return (
    <div>
      <a
        href="https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2021"
        target="_blank"
        rel="noreferrer"
      >
        National emissions data source
      </a>
    </div>
  );
}