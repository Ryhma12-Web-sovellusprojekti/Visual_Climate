import { useEffect } from "react";
import axios from "axios";
import { GetServerUrl } from "./GetUrls";

export default function DataImport({ setData, path }) {
  useEffect(() => {
    const serverUrl = GetServerUrl();  
    axios.get(`${serverUrl}get/visudata/${path}`).then((res) => {
      setData(res.data);
    });
  }, []);
  
  return null;
}
