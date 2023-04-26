import { useEffect } from "react";
import axios from "axios";
import { GetServerUrl } from "./GetUrls";

export default function DataImport({ setData, path }) {
  useEffect(() => {
    const serverUrl = GetServerUrl();  
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("id");
    axios.get(`${serverUrl}get/visudata/${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        ID: `${uid}`
      },
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  return null;
}
