import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

function Profile({ signUserOut }) {
    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    function deleteSignedUser() {
        user
            .delete()
            .then(() => {
                console.log("User Account Deleted");
                localStorage.removeItem("user");
                localStorage.setItem("isAuth", false);
                signUserOut()
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <section className="profile">
            <img src={user?.photoURL} alt={user?.displayName} title={user?.displayName}></img> 
            <button className="small-btn" onClick={signUserOut}>Log Out</button>
            <button className="small-btn" onClick={deleteSignedUser}>Delete Account</button>
        </section>
    );
}

export default Profile;