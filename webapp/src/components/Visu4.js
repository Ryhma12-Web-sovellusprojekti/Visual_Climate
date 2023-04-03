import DataImport from "./DataImport";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function Visu4() {
  const [v4nationalstate, setV4National] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState(["Finland"]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (!selectedCountries.includes(value)) {
      setSelectedCountries([...selectedCountries, value]);
    }
    event.target.value = "";
  };

  const path = `7/V4_National_CO2_emissions`;

  useEffect(() => {
    setV4National(null);
  }, [path]);

  let countriesData = null;
  if (v4nationalstate) {
    countriesData = selectedCountries.map((country) => ({
      country,
      data: v4nationalstate[country],
    }));
  }
  return (
    <div>
      <input
        type="text"
        value=""
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
      {countriesData && <Graph countriesData={countriesData} />}
    </div>
  );
}

function Graph({ countriesData }) {
  const data = {
    labels: countriesData.length > 0 ? Object.keys(countriesData[0].data) : [],
    datasets: countriesData.map((cd, i) => ({
      label: cd.country,
      data: Object.values(cd.data),
      borderColor: `rgba(3, 64, 120, ${i / countriesData.length})`,
      backgroundColor: `rgba(3, 64, 120, ${i / countriesData.length})`,
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