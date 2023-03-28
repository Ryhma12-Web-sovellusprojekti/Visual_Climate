import Get_v4_national_emissions_func from "../components/V4_National_CO2_emissions";
import V5_sectors_func from "../components/V5_Sectors";
import Get_v5_subsectors_agriculture_func from "../components/V5_Subsectors_Agriculture";
import { useState, React } from "react";

function Graphv2({ V4_National_Data, V5_Sectors_data, V5_Subsectors_Agriculture_data}) {
    return (
      <div>
        {V5_Sectors_data ? (
          <pre>{JSON.stringify(V5_Sectors_data, null, 1)}</pre>
        ) : (
          <p>Data empty/null</p>
        )}
      </div>
    );
}

function View2() {
  const [V4_National_State, Set_V4_National] = useState(null);
  const [V5_Sectors_State, Set_V5_Sectors] = useState(null);
  const [V5_Subsectors_Agriculture_State, Set_V5_Subsectors_Agriculture] = useState(null);
  return (
    <div>
      <Get_v4_national_emissions_func Set_v4_national={Set_V4_National} />
      <V5_sectors_func Set_v5_sectors={Set_V5_Sectors} />
      <Get_v5_subsectors_agriculture_func Set_v5_subsectors_agriculture={Set_V5_Subsectors_Agriculture} />
      <Graphv2 V4_National_Data={V4_National_State} V5_Sectors_data={V5_Sectors_State} V5_Subsectors_Agriculture_data={V5_Subsectors_Agriculture_State}/>
    </div>
  );
}

export default View2;