import { rtdb } from '../firebase-config';
import { ref, get} from "firebase/database";
import { useEffect } from "react";

export default function DataImport({ setData, path }) {
    useEffect(() => {
      const dataRef = ref(rtdb, path);
      get(dataRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setData(snapshot.val());
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
