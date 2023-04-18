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
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect( () => {
        const docRef = doc(collection(fsdb, "customview"), id);
         getDoc(docRef)
            .then((doc) => {
                if (doc.exists()) {
                    setData(doc.data());
                } else {
                    console.log("No data available");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error getting the document:', error);
            })
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }
    
    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.viewText}</p>
            {data.visuals.v1 && <Visu1 />}
            {data.visuals.v2 && <Visu2 />}
            {data.visuals.v3 && <Visu3 />}
            {data.visuals.v4 && <Visu4 />}
            {data.visuals.v5 && <Visu5 />}
        </div>
    );
}

export default ShowCustomView;