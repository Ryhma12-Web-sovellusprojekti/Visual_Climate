import { rtdb } from '../firebase-config';
import { ref, get} from "firebase/database";
import { useEffect } from "react";

function Get_v1_recannual_func({ Set_v1_recannual }) {
    useEffect(() => {
      const emissionsRef = ref(rtdb, "2/V1_RecAnnual");
      get(emissionsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            Set_v1_recannual(snapshot.val());
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

export default Get_v1_recannual_func;