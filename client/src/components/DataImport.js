import { useEffect } from "react";
import axios from "axios";
import { GetServerUrl } from "./GetUrls";

export default function DataImport({ setData, path }) {

    useEffect(() => {

      // Call of GetServerUrl function to get the server URL
      const serverUrl = GetServerUrl();

      // User's token from local storage
      const token = localStorage.getItem("token");

      // User's ID from local storage
      const uid = localStorage.getItem("id");

      // a GET request to the server to get the data for the specified path
      axios.get(`${serverUrl}get/visudata/${path}`, {
        headers: {
          // The header of the request includes the user's token and ID
          Authorization: `Bearer ${token}`,
          ID: `${uid}`
        },
      })
        .then((res) => {
          // If the request is successful, update the state using the setData function with the data received from the server
          setData(res.data);
        })
        .catch((error) => {
          // If the request fails, log the error to the console
          console.error(error);
        });
        // An empty dependency array to ensure that the effect only runs once, when the component mounts

    }, []);
    // Return null since this component doesn't render anything

    return null;
}
