import { rtdb } from '../firebase-config';
import { ref, get} from "firebase/database";
import { useEffect } from "react";

function Get_v4_national_emissions_func({ Set_v4_national }) {
    useEffect(() => {
      const emissionsRef = ref(rtdb, "7/V4_National_CO2_emissions");
      get(emissionsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            Set_v4_national(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
    return null;
}

export default Get_v4_national_emissions_func;