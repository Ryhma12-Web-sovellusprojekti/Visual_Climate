import React from "react";
import { auth } from "../firebase-config";
import Profile from "./Profile";
import Footer from "./Footer";
import Viewlinks from "./Viewlinks";

function Home({ isAuth, signUserOut }) {
    return (
        <div className="wrapper-side">
            <aside></aside>
            <section className="sidebyside">
                <main>
                    <h1>Welcome to The Visual Climate, {auth?.currentUser.displayName}!</h1>
                    <Viewlinks />
                </main>
                <Profile signUserOut={signUserOut} />
            </section>
            <Footer />
        </div>
    );
}

export default Home;