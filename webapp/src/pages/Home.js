import React from "react";
import { auth } from "../firebase-config";
import Profile from "./Profile";

function Home({ isAuth, signUserOut }) {
    return (
        <div className="wrapper-side">
            <aside></aside>
            <section className="sidebyside">
                <main>
                    <h1>Welcome to The Visual Climate, {auth?.currentUser.displayName}!</h1>
                    <div>
                    viewit tähän
                    </div>
                </main>
                <Profile signUserOut={signUserOut} />
            </section>
        </div>
    );
}

export default Home;