import GetDataFromfsdb from "../components/GetDataFromfsdb";
import AddDataTofsdb from "../components/AddDataTofsdb";
import { useState, React } from "react";

function Graphv2(dataFromDatabase) {
    return (
      <div>
        {dataFromDatabase ? (
          <pre>{JSON.stringify(dataFromDatabase, null, 1)}</pre>
        ) : (
          <p>Data empty/null</p>
        )}
      </div>
    );
}

function View1Testi() {
  const [dataFromDatabase, setData] = useState(null);
  return (
    <div>
      <GetDataFromfsdb setData={setData} />
      <Graphv2 dataFromDatabase={dataFromDatabase} />
      <AddDataTofsdb />
    </div>
  );
}

export default View1Testi;