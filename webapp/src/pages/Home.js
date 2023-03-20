import React from "react";
import { auth } from "../firebase-config";

function Home({ isAuth }) {
    return (
        <div>
            <h1>Welcome to The Visual Climate, {auth?.currentUser.displayName}!</h1>
        </div>
    );
}

export default Home;