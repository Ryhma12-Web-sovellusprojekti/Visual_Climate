import { rtdb } from '../firebase-config';
import { ref, get} from "firebase/database";
import { useEffect } from "react";

function Get_v1_annual_func({ Set_v1_annual }) {
    useEffect(() => {
      const emissionsRef = ref(rtdb, "0/V1_Annual");
      get(emissionsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            Set_v1_annual(snapshot.val());
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

export default Get_v1_annual_func;