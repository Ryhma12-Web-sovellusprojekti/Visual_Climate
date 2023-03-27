import { rtdb } from '../firebase-config';
import { ref, get} from "firebase/database";
import { useEffect } from "react";

function V5_sectors_func({ Set_v5_sectors }) {
    useEffect(() => {
      const emissionsRef = ref(rtdb, "7/V5_Sectors");
      get(emissionsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            Set_v5_sectors(snapshot.val());
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

export default V5_sectors_func;