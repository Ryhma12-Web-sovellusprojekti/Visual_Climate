import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import SignUserOut, { DeleteSignedUser } from "../components/SignOutDelete";
import ConfirmationDialog from "../components/ConfirmationDialog";

function Profile() {

    // Initializing state variables
    const [user, setUser] = useState({});
    const [removeState, setRemove] = useState(false);

    // Using useEffect hook to watch for changes in the authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    // Function to toggle the confirmation dialog box
    const toggleDialog = () => {
        setRemove(removeState => !removeState);
    }; 

    // Rendering Profile component
    return (
        <section className="profile">
            {user?.photoURL &&
                <img src={user?.photoURL} alt={user?.displayName} title={user?.displayName} width="100"></img> 
            }
            <button className="small-btn" onClick={SignUserOut}>Log Out</button>
            <button className="small-btn" onClick={toggleDialog} data-testid="delete">Delete Account</button>
            {removeState &&
                <ConfirmationDialog yesFunction={DeleteSignedUser} noFunction={toggleDialog} />
            }
        </section>
    );
}

export default Profile;
