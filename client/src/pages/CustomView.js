import React, { useState, useEffect } from "react";
import debounce from "lodash";

import useAuth from "../components/CustomHooks";
import Switch from "../components/Switch";
import Visu1 from "../components/Visu1";
import Visu2 from "../components/Visu2";
import Visu3 from "../components/Visu3";
import Visu4 from "../components/Visu4";
import Visu5 from "../components/Visu5";
import Textarea from "../components/Textarea";

import { CopyToClipboard } from 'react-copy-to-clipboard';
import GetCustomViewRootUrl, { GetServerUrl } from "../components/GetUrls";
import axios from "axios";

function CustomView({ goBack }) {
  const user = useAuth();
  const [title, setTitle] = useState("");
  const [viewText, setViewText] = useState("");

  const [showV1, setShowV1] = useState(false);
  const [showV2, setShowV2] = useState(false);
  const [showV3, setShowV3] = useState(false);
  const [showV4, setShowV4] = useState(false);
  const [showV5, setShowV5] = useState(false);

  const [textV1, setTextV1] = useState("");
  const [textV2, setTextV2] = useState("");
  const [textV3, setTextV3] = useState("");
  const [textV4, setTextV4] = useState("");
  const [textV5, setTextV5] = useState("");

  const [sidebySide, setSidebySide] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [docId, setDocId] = useState("");
  const customViewUrl = GetCustomViewRootUrl();
  const serverUrl = GetServerUrl();

  const saveCustomView = () => {
    try {
      let visuals = {
        ...(showV1 && {v1: showV1}),
        ...(showV2 && {v2: showV2}),
        ...(showV3 && {v3: showV3}),
        ...(showV4 && {v4: showV4}),
        ...(showV5 && {v5: showV5}),
        ...(sidebySide && {ss: sidebySide}),
      }
      let visuTexts = {
        ...(showV1 && {v1: textV1}),
        ...(showV2 && {v2: textV2}),
        ...(showV3 && {v3: textV3}),
        ...(showV4 && {v4: textV4}),
        ...(showV5 && {v5: textV5}),
      };

      const customView = {
        user: user.uid,
        title: title,
        viewText: viewText,
        visuals: visuals,
        visuTexts: visuTexts
      };

      axios.post(`${serverUrl}create/customview`, customView).then((res) => {
        setDocId(res.data._path.segments[1]);
        console.log(res.status, res.data);
      });

    } catch (error) {
      console.log(error.message);
    };
  };

  const generateUrl = () => {
    setNewUrl(`${customViewUrl}${docId}`);
  };
  
  // timer to make copy to clipboard button remain orange for 1 s after clicking it
  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  },[copied]);

  function updateText(){

  }

  return (
    <div className="customview">
      <button onClick={goBack}>Back</button>
      <section className="selectors">
        <h3 className="titletext">Add title and text to your view</h3>
        <form>
          <input type="text" value={title} placeholder="Title of your view..." onChange={e => setTitle(e.target.value)} />
          <textarea value={viewText} placeholder="General comments to this view..." onChange={e => setViewText(e.target.value)} />
          {showV1 && <Textarea placeholder="Text or comments to visualization 1..." setParentValue={setTextV1} />}
          {showV2 && <Textarea placeholder="Text or comments to visualization 2..." setParentValue={setTextV2}/>}
          {showV3 && <Textarea placeholder="Text or comments to visualization 3..." setParentValue={setTextV3}/>}
          {showV4 && <Textarea placeholder="Text or comments to visualization 4..." setParentValue={setTextV4}/>}
          {showV5 && <Textarea  placeholder="Text or comments to visualization 5..." setParentValue={setTextV5}/>}
        </form>
        <h3 className="selectVis">Select visualizations</h3>
      <div className="visualizations">
          <label>Visualization 1 <Switch isToggled={showV1} onToggle={() => {setShowV1(!showV1)}}/></label>
          <label>Visualization 2 <Switch isToggled={showV2} onToggle={() => {setShowV2(!showV2)}}/></label>
          <label>Visualization 3 <Switch isToggled={showV3} onToggle={() => {setShowV3(!showV3)}}/></label>
          <label>Visualization 4 <Switch isToggled={showV4} onToggle={() => {setShowV4(!showV4)}}/></label>
          <label>Visualization 5 <Switch isToggled={showV5} onToggle={() => {setShowV5(!showV5)}}/></label>
          <label>Side by Side <Switch isToggled={sidebySide} onToggle={() => {setSidebySide(!sidebySide)}}/></label>
      </div>
        <button onClick={saveCustomView}>Save view info</button>     
        <button onClick={generateUrl}>Generate URL for this view</button>
    </section>  
      <section className="copy-clipboard">
        {newUrl.length > 0 &&
        <>
          <p>{newUrl}</p>
          <CopyToClipboard 
            text={newUrl}
            onCopy={() => setCopied(true)} >
            <button className={copied ? "copied" : ""}>Copy to clipboard</button>
          </CopyToClipboard>
        </>
        }
      </section>
      <div>
        <h1>{title}</h1>
        <p>{viewText}</p>
      </div>
      <div className={
        sidebySide ? 'twoColumns' : 'oneColumn'
      }>
        {showV1 && 
        <div>
          <p>{textV1}</p>
            <Visu1 />
        </div>
        }
        {showV2 && 
        <div>
          <p>{textV2}</p>
            <Visu2 />
        </div>
        }
        {showV3 && 
        <div>
          <p>{textV3}</p>
            <Visu3 />
        </div>
        }
        {showV4 && 
        <div>
          <p>{textV4}</p>
            <Visu4 />
        </div>
        }
        {showV5 && 
        <div>
          <p>{textV5}</p>
            <Visu5 />
        </div>
        }
      </div>

    </div>
  );
}

export default CustomView;




