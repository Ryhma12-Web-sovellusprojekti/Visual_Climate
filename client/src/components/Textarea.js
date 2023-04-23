import React, { useState, useRef, useEffect, useMemo} from "react";
import {debounce} from "lodash";

const useDebounce = (callback) => {
    const ref = useRef();
  
    useEffect(() => {
      ref.current = callback;
    }, [callback]);
  
    const debouncedCallback = useMemo(() => {
      const func = () => {
        ref.current?.();
      };
  
      return debounce(func, 1000);
    }, []);
  
    return debouncedCallback;
  };

  const Textarea = ({placeholder, setParentValue }) => {
    const [value, setValue] = useState();
  
    const debouncedRequest = useDebounce(() => {
        setParentValue(value);
    });
  
    const onChange = (e) => {
      const value = e.target.value;
      setValue(value);
  
      debouncedRequest();
    };
  
    return <textarea value={value} placeholder={placeholder} onChange={onChange}/>;
  }

export default Textarea;