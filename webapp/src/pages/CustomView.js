import React, { useState } from "react";
import { fsdb } from '../firebase-config';
import { doc, collection, setDoc } from "firebase/firestore";
import useAuth from "../components/CustomHooks";
import Switch from "../components/Switch";
import Visu1 from "../components/Visu1";
import Visu2 from "../components/Visu2";
import Visu3 from "../components/Visu3";
import Visu4 from "../components/Visu4";
import Visu5 from "../components/Visu5";

function CustomView({ goBack }) {
  const user = useAuth();
  const [title, setTitle] = useState("");
  const [viewText, setViewText] = useState("");
  const [docId, setDocId] = useState("");
  const [showUrl, setShowUrl] = useState("");
  const [showV1, setShowV1] = useState(false);
  const [showV2, setShowV2] = useState(false);
  const [showV3, setShowV3] = useState(false);
  const [showV4, setShowV4] = useState(false);
  const [showV5, setShowV5] = useState(false);

  const saveCustomView = async () => {
    const visuals = {
      v1: showV1,
      v2: showV2,
      v3: showV3,
      v4: showV4,
      v5: showV5,
    };

    const collectionRef = collection(fsdb, "customview");
    const docRef = doc(collectionRef);
  
    await setDoc(docRef, {
      user: user.uid,
      title: title,
      visuals: visuals,
      viewText: viewText,
    }).then(() => {
      setDocId(docRef.id);
    });
  };

  const generateUrl = () => {
    setShowUrl(`http://localhost:3000/customview/${docId}`);
  };


  return (
    <div>
      <button onClick={goBack}>Back</button>
      <form>

        <h3>Add title and text to your view</h3>
          <input type="text" value={title} placeholder="Title of your view..." onChange={e => setTitle(e.target.value)} />
          <textarea value={viewText} placeholder="Text or comments..." onChange={e => setViewText(e.target.value)} />

        <h3>Select visualizations</h3>
        <label>Visualization 1 <Switch isToggled={showV1} onToggle={() => {setShowV1(!showV1)}}/></label>
        <label>Visualization 2 <Switch isToggled={showV2} onToggle={() => {setShowV2(!showV2)}}/></label>
        <label>Visualization 3 <Switch isToggled={showV3} onToggle={() => {setShowV3(!showV3)}}/></label>
        <label>Visualization 4 <Switch isToggled={showV4} onToggle={() => {setShowV4(!showV4)}}/></label>
        <label>Visualization 5 <Switch isToggled={showV5} onToggle={() => {setShowV5(!showV5)}}/></label>

      </form>
    
      <button onClick={saveCustomView}>Save view info</button>     
      <button onClick={generateUrl}>Generate URL for this view</button>
      <p>{showUrl}</p>
           
      <h1 dangerouslySetInnerHTML={{ __html: title }} />
      <div dangerouslySetInnerHTML={{ __html: viewText }} />
    
      {showV1 && <Visu1 />}
      {showV2 && <Visu2 />}
      {showV3 && <Visu3 />}
      {showV4 && <Visu4 />}
      {showV5 && <Visu5 />}

    </div>
  );
}

export default CustomView;

