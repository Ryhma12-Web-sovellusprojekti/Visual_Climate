import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import SignUserOut, { DeleteSignedUser } from "../components/SignOutDelete";

function Profile() {
    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    return (
        <section className="profile">
                {user?.photoURL &&
                    <img src={user?.photoURL} alt={user?.displayName} title={user?.displayName}></img> 
                }
            <button className="small-btn" onClick={SignUserOut}>Log Out</button>
            <button className="small-btn" onClick={DeleteSignedUser}>Delete Account</button>
        </section>
    );
}

export default Profile;