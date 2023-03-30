import { rtdb } from '../firebase-config';
import { ref, get} from "firebase/database";
import { useEffect } from "react";

function Get_v1_monthly_func({ Set_v1_monthly }) {
    useEffect(() => {
      const emissionsRef = ref(rtdb, "1/V1_Monthly");
      get(emissionsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            Set_v1_monthly(snapshot.val());
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

export default Get_v1_monthly_func;