import React, { useState, useEffect } from "react";
import { auth } from "../firebase-config";
import axios from "axios";
import GetCustomViewRootUrl, { GetServerUrl } from "../components/GetUrls";

function CustomViewEdit({ goBack }) {
    // definition state and initializing with the useState() hook
    const user = auth.currentUser;
    const [views, setViews] = useState([]);

    // GetCustomViewRootUrl() and GetServerUrl() are helper functions that return URLs.
    const customViewUrl = GetCustomViewRootUrl();
    const serverUrl = GetServerUrl();

    // get current user's custom views
    useEffect(() => {
        const fetchViews = () => {
            const token = localStorage.getItem("token");
            const uid = localStorage.getItem("id");
            axios.get(`${serverUrl}all/customview/${user.uid}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    ID: `${uid}`
                },
              })
                .then((res) => {
                    setViews(res.data);
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
        }  
            fetchViews();
    }, []);      

    // delete custom view:
    function deleteView (id) {

        // The token and uid variables from localStorage
        const token = localStorage.getItem("token");
        const uid = localStorage.getItem("id");

        // The axios.delete function sends an HTTP POST request to the server to delete a custom view
        axios.delete(`${serverUrl}delete/customview/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                ID: `${uid}`
            },
        })
        .then(() => {
            setViews((prevViews) => prevViews.filter((view) => view.id !== id));
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div>
            <button onClick={goBack}>Back</button>
            {views.map((view) => {
                return (
                    <div className="ownviews">
                        <div className="viewheader">
                            <div className="title">
                                <h1>{view.title}</h1>
                            </div>
                            <div className="deleteView">
                                <button onClick={() => deleteView(view.id)}>&#128465;</button>
                            </div>
                        </div>
                        <div className="link" >
                            {customViewUrl}{view.id}
                        </div>
                        <div className="text">
                            {view.viewText}
                        </div>

                    </div>
                );
            })}

        </div>
    );
}

export default CustomViewEdit;
