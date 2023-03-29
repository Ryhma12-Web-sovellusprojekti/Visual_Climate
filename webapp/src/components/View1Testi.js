import Get_v1_annual_func from "../components/V1_Annual";
import Get_v1_monthly_func from "../components/V1_Monthly";
import Get_v1_recannual_func from "../components/V1_RecAnnual";
import { useState, React } from "react";

function Graphv2({V1_Monthly_Data, V1_Annual_Data, V1_Recannual_Data}) {
    return (
      <div>
        {V1_Recannual_Data ? (
          <pre>{JSON.stringify(V1_Recannual_Data, null, 1)}</pre>
        ) : (
          <p>Data empty/null</p>
        )}
      </div>
    );
}

function View1Testi() {
  const [V1_Monthly_State, Set_V1_Monthly] = useState(null);
  const [V1_Annual_State, Set_V1_Annual] = useState(null);
  const [V1_Recannual_State, Set_V1_Recannual] = useState(null);
  return (
    <div>
      <Get_v1_monthly_func Set_v1_monthly={Set_V1_Monthly} />
      <Get_v1_annual_func Set_v1_annual={Set_V1_Annual} />
      <Get_v1_recannual_func Set_v1_recannual={Set_V1_Recannual} />

      <Graphv2 
      V1_Monthly_Data={V1_Monthly_State} V1_Annual_Data={V1_Annual_State} V1_Recannual_Data={V1_Recannual_State} />
    </div>
  );
}

export default View1Testi;