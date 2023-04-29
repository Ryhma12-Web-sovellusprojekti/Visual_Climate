import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

export default function useAuth() {

    // Declaration of state variable called currentUser
    const [currentUser, setCurrentUser] = useState();

    // useEffect hook to set up a listener for authentication state changes
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));

        // Return a cleanup function that removes the listener
        return unsub;
    }, [])

    // Return the currentUser state variable
    return currentUser;  
}
