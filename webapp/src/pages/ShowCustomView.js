import React, { useState, useEffect } from "react";
import { fsdb } from '../firebase-config';
import { collection, doc, getDoc } from "firebase/firestore";
import Visu1 from "../components/Visu1";
import Visu2 from "../components/Visu2";
import Visu3 from "../components/Visu3";
import Visu4 from "../components/Visu4";
import Visu5 from "../components/Visu5";

function ShowCustomView({ goBack }) {
    const [data, setData] = useState({});

    useEffect(() => {
        const docRef = doc(collection(fsdb, "customview"), "BXVmk9roiWQiCnalYyNL");
        getDoc(docRef)
            .then((doc) => {
                if (doc.exists()) {
                    setData(doc.data());
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error('Error getting the document:', error);
            });
    }, []);

    return (
        <div>
            <button onClick={goBack}>Back</button>
            <h1>{data.title}</h1>
            <p>{data.viewText}</p>
            <p>These visuals should be showing: {JSON.stringify(data.visuals)}</p>
        </div>
    );
}

export default ShowCustomView;