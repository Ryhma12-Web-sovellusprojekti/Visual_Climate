import { rtdb } from '../firebase-config';
import { ref, get} from "firebase/database";
import { useEffect } from "react";

function Get_v5_subsectors_energy_func({ Set_v5_subsectors_energy }) {
    useEffect(() => {
      const emissionsRef = ref(rtdb, "10/V5_Subsectors_Energy");
      get(emissionsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            Set_v5_subsectors_energy(snapshot.val());
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

export default Get_v5_subsectors_energy_func;