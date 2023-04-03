import DataImport from "./DataImport";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function Visu4() {
  const [v4nationalstate, setV4National] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleInputChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedCountries(selectedOptions);
  };

  const path = `7/V4_National_CO2_emissions`;

  useEffect(() => {
    setV4National(null);
  }, [path]);

  let countryData = null;
  if (v4nationalstate) {
    countryData = selectedCountries.reduce((data, country) => {
      data[country] = v4nationalstate[country];
      return data;
    }, {});
  }
  return (
    <div>
      <select
        value={selectedCountries}
        onChange={handleInputChange}
        multiple
      >
        {v4nationalstate &&
          Object.keys(v4nationalstate).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
      </select>
      <DataImport setData={setV4National} path={path} />
      {countryData && <Graph countryData={countryData} />}
    </div>
  );
}

function Graph({ countryData }) {
  const data = {
    labels: Object.keys(countryData)[0],
    datasets: Object.keys(countryData).map((country) => ({
      label: country,
      data: Object.values(countryData[country]),
      borderColor: "rgba(3, 64, 120, 1)",
      backgroundColor: "rgba(3, 64, 120, 0.5)",
      pointRadius: 1,
      tension: 0.4,
      yAxisID: "y",
    })),
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