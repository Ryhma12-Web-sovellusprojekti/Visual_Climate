import DataImport from "./DataImport";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function Visu4({single}) {

    // Initializes state variables
    const [v4nationalstate, setV4National] = useState(null);
    const [selectedCountries, setSelectedCountries] = useState(["Finland"]);
    const [colors, setColors] = useState([]);

    function randomRGB(){ 

        // Generates a random RGB color with a high limit for the total color value
        const highLimit = 300;
        let red, green, blue;

        do{
            red = Math.floor(Math.random() * 256);
            green = Math.floor(Math.random() * 256);
            blue = Math.floor(Math.random() * 256);
        } while ((red + green + blue) < highLimit);

        return "rgb(" + red + ", " + green + ", " + blue + ")";
    }

    const handleInputChange = (event) => {

        // Handles changes to the search input field
        const value = event.target.value;
        const matchingCountries = Object.keys(v4nationalstate || {}).filter(
            (country) => country.toLowerCase().startsWith(value.toLowerCase())
        );

        // If only one matching country, add it to the selected countries list
        if (matchingCountries.length === 1) {
            const country = matchingCountries[0];
        
            if (!selectedCountries.includes(country)) {
                setSelectedCountries([...selectedCountries, country]);
                setColors([
                    ...colors,
                    randomRGB(),
                ]);
            }
            event.target.value = "";
        }
    };

    // Path for API data request
    const path = single+`7/V4_National_CO2_emissions`;

    // Resets V4 National CO2 emissions data when the path changes
    useEffect(() => {
        setV4National(null);
    }, [path]);

    // Formats data for each selected country for graphing
    let countriesData = null;
    if (v4nationalstate) {
        countriesData = selectedCountries.map((country, i) => ({
        country,
        data: v4nationalstate[country],
        color: colors[i],
    }));
    }

    // Returns JSX for rendering the component
    return (
        <div className="datalist-wrapper">
            <div className="search-wrapper">
                <div className="countries">
                {/* Maps through selected countries and displays them as tags */}
                {selectedCountries.map((country) => (
                <span key={country} className="selected-country">
                {country}
                    <button onClick={() => setSelectedCountries(selectedCountries.filter(c => c !== country))}>
                        &times;
                    </button>
                </span>
                ))}
                </div>
                    {/* Input field for searching for and adding countries */}
                    <input
                        className="inside-search"
                        type="search"
                        onChange={handleInputChange}
                        list="countryList"
                    />
                </div>
            {/* Data list for displaying all available countries */}
            <datalist id="countryList">
        {v4nationalstate &&
            Object.keys(v4nationalstate).map((country) => (
                <option key={country} value={country} />
            ))}
        </datalist>
            {/* Component for fetching V4 National CO2 emissions data */}
            <DataImport setData={setV4National} path={path} />
            {countriesData && <Graph countriesData={countriesData} />}
        </div>
    );
}

function Graph({ countriesData }) {
    const allYears = countriesData.reduce((years, { data }) => {
        // Extracting all the years from the data and get the minimum and maximum year
        const countryYears = Object.keys(data).map(Number);
        return [...years, ...countryYears];
    }, []);
    const minYear = Math.min(...allYears);
    const maxYear = Math.max(...allYears);

    // Create an array of all years between the minimum and maximum year
    const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => i + minYear);

    // For each country, creating an array of CO2 emissions for each year and store it as an object in the datasets array
    const datasets = countriesData.map(({ country, data, color }) => {
    const countryData = Array.from({ length: years.length }, () => null);
    Object.entries(data).forEach(([year, value]) => {
        const index = years.indexOf(Number(year));
        if (index !== -1) {
            countryData[index] = value;
        }
    });
    return {
        label: country,
        data: countryData,
        borderColor: color,
        backgroundColor: color,
        pointRadius: 1,
        tension: 0.4,
        yAxisID: "y",
    };
    });

    // Creating an object of data containing the labels and datasets for the line graph
    const data = {
        labels: years,
        datasets,
    };

    // Define options for a chart with a responsive layout and various plugins
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

    /*
    Visu4Information component is responsible for rendering the data information section
    for the visualization 1.
    */

    return (
        <section>
            <article>
                <p>National estimates of CO2 between years 1959-2020 (MtCO2/yr). Total emissions include emissions from fossil fuel combustion and oxidation and cement production and excludes emissions from bunker fuels. World totals include emissions from bunker fuels. </p>
                <a
                href="https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2021"
                target="_blank"
                rel="noreferrer"
                >
                National emissions data source
                </a>
            </article>
        </section>
    );
}
