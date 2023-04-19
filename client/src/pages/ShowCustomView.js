import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GetServerUrl } from "../components/GetUrls";
import Visu1 from "../components/Visu1";
import Visu2 from "../components/Visu2";
import Visu3 from "../components/Visu3";
import Visu4 from "../components/Visu4";
import Visu5 from "../components/Visu5";

function ShowCustomView() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const serverUrl = GetServerUrl();

    useEffect( () => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(`${serverUrl}get/customview/${id}`)
                .then((res) => {
                    setData(res.data);
                    setLoading(false);
                })         
            .catch ((error) => {
                // status code not 2xx
                if (error.response) { 
                    console.log("Data :" , error.response.data);
                    console.log("Status :" + error.response.status);
                // The request was made but no response was received
                  } else if (error.request) { 
                    console.log(error.request);
                // Error on setting up the request
                  } else { 
                    console.log('Error', error.message);
                };
            });  
        };        
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    };
    
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