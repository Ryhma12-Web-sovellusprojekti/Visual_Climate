import { rtdb } from '../firebase-config';
import { ref, get} from "firebase/database";
import { useEffect, useState, React } from "react";

function Get_v4_national_emissions() {
  const [data, setData] = useState(null);
    useEffect(() => {
        const emissionsRef = ref(rtdb, "V4_National_CO2_emissions");
        get(emissionsRef).then((snapshot) => {
        if (snapshot.exists()) {
            setData(snapshot.val());
            console.log(data);
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
            console.error(error);
        });
    return JSON.stringify(data, null, 2);
    }, []);
};

export default Get_v4_national_emissions;