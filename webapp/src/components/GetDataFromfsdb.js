import { fsdb } from '../firebase-config';
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";

export default function GetDataFromfsdb({setData}) {
    useEffect(() => {
        const dataRef = doc(collection(fsdb, "testidata"), "1");
        getDoc(dataRef)
            .then((doc) => {
                if (doc.exists()) {
                    //setData(doc.data()); # Tällä saadaan koko datalähteen data (kaikki kentät)
                    const ikaValue = doc.get("ika");
                    setData(ikaValue);
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
