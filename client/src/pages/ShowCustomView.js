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

    // definition state and initializing with the useState() hook
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    // GetServerUrl() is a helper function that return URL.
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

    // Shows the user made custom view
    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.viewText}</p>
            <div className={data.sidebySide ? 'twoColumns' : 'oneColumn'}>
                {data.visuals.v1 && <div>
                    {data.visuTexts.v1 && <p>{data.visuTexts.v1}</p>}
                    <Visu1 single="single/"/>
                </div>}
                {data.visuals.v2 && <div>
                    {data.visuTexts.v2 && <p>{data.visuTexts.v2}</p>}
                    <Visu2 single="single/"/>
                </div>}
                {data.visuals.v3 && <div>
                    {data.visuTexts.v3 && <p>{data.visuTexts.v3}</p>}
                    <Visu3 single="single/"/>
                </div>}
                {data.visuals.v4 &&<div>
                    {data.visuTexts.v4 && <p>{data.visuTexts.v4}</p>}
                    <Visu4 single="single/"/>
                </div>}
                {data.visuals.v5 &&<div>
                    {data.visuTexts.v5 && <p>{data.visuTexts.v5}</p>}
                    <Visu5 single="single/"/>
                </div>}
            </div>
        </div>
    );
}

export default ShowCustomView;
