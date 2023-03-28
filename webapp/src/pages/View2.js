import Get_v4_national_emissions_func from "../components/V4_National_CO2_emissions";
import V5_sectors_func from "../components/V5_Sectors";
import Get_v5_subsectors_agriculture_func from "../components/V5_Subsectors_Agriculture";
import Get_v5_subsectors_energy_func from "../components/V5_Subsectors_Energy";
import Get_v5_subsectors_industrial_func from "../components/V5_Subsectors_Industrial";
import Get_v5_subsectors_waste_func from "../components/V5_Subsectors_Waste";
import { useState, React } from "react";

function Graphv2({ V4_National_Data, V5_Sectors_Data, V5_Subsectors_Agriculture_Data, V5_Subsectors_Energy_Data, V5_Subsectors_Industrial_Data, V5_Subsectors_Waste_Data }) {
    return (
      <div>
        {V5_Subsectors_Waste_Data ? (
          <pre>{JSON.stringify(V5_Subsectors_Waste_Data, null, 1)}</pre>
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
  const [V5_Subsectors_Energy_State, Set_V5_Subsectors_Energy] = useState(null);
  const [V5_Subsectors_Industrial_State, Set_V5_Subsectors_Industrial] = useState(null);
  const [V5_Subsectors_Waste_State, Set_V5_Subsectors_Waste] = useState(null);
  return (
    <div>
      <Get_v4_national_emissions_func Set_v4_national={Set_V4_National} />
      <V5_sectors_func Set_v5_sectors={Set_V5_Sectors} />
      <Get_v5_subsectors_agriculture_func Set_v5_subsectors_agriculture={Set_V5_Subsectors_Agriculture} />
      <Get_v5_subsectors_energy_func Set_v5_subsectors_energy={Set_V5_Subsectors_Energy} />
      <Get_v5_subsectors_industrial_func Set_v5_subsectors_industrial={Set_V5_Subsectors_Industrial} />
      <Get_v5_subsectors_waste_func Set_v5_subsectors_waste={Set_V5_Subsectors_Waste} />

      <Graphv2 
      V4_National_Data={V4_National_State} 
      V5_Sectors_Data={V5_Sectors_State} 
      V5_Subsectors_Agriculture_Data={V5_Subsectors_Agriculture_State} 
      V5_Subsectors_Energy_Data={V5_Subsectors_Energy_State} 
      V5_Subsectors_Industrial_Data={V5_Subsectors_Industrial_State}
      V5_Subsectors_Waste_Data={V5_Subsectors_Waste_State}/>
    </div>
  );
}

export default View2;