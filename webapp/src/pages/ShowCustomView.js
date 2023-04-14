import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fsdb } from '../firebase-config';
import { collection, doc, getDoc } from "firebase/firestore";
import Visu1 from "../components/Visu1";
import Visu2 from "../components/Visu2";
import Visu3 from "../components/Visu3";
import Visu4 from "../components/Visu4";
import Visu5 from "../components/Visu5";

function ShowCustomView() {
    const [data, setData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const docRef = doc(collection(fsdb, "customview"), id);
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
            })
    }, []);

    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.viewText}</p>
            <h2>These visuals should be showing: </h2>
            <h3>{JSON.stringify(data.visuals)}</h3>
        </div>
    );
}

export default ShowCustomView;