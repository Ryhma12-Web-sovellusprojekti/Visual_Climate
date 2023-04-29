import React, { useState, useRef, useEffect, useMemo} from "react";
import {debounce} from "lodash";

// A custom hook for debouncing a callback function
const useDebounce = (callback) => {
    const ref = useRef();

    // Keeping track of the latest callback function
    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    // Using `useMemo` to memoize the debounced callback function
    const debouncedCallback = useMemo(() => {
        const func = () => {
            ref.current?.();
        };

        // Debounce the callback function by 1 second
        return debounce(func, 1000);
    }, []);

    return debouncedCallback;
  };

const Textarea = ({placeholder, setParentValue }) => {

    // Keeping track of the current value of the textarea
    const [value, setValue] = useState();

    // Using the `useDebounce` hook to debounce the `setParentValue` function
    const debouncedRequest = useDebounce(() => {
        setParentValue(value);
    });

    // Handling changes to the textarea's value
    const onChange = (e) => {

        // Getting the current value of the textarea
        const value = e.target.value;

        // Updating the state with the new value
        setValue(value);

        // Calling the `debouncedRequest` function, which will call `setParentValue` after the debounce interval
        debouncedRequest();
    };

    return <textarea value={value} placeholder={placeholder} onChange={onChange}/>;
}

export default Textarea;
