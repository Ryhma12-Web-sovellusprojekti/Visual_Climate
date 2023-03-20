import React from "react";
import { auth } from "../firebase-config";

function Profile({ isAuth, signUserOut }) {
    return (
        <section className="profile">
            <img src={auth?.currentUser.photoURL} alt={auth?.currentUser.displayName} title={auth?.currentUser.displayName}></img>
            <button className="small-btn" onClick={signUserOut}>Log Out</button>
            <button className="small-btn" onClick={null}>Delete Account</button>
        </section>
    );
}

export default Profile;