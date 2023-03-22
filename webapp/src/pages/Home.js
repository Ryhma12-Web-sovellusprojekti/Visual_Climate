import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import Profile from "./Profile";
import Footer from "../components/Footer";

function Home() {
    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    return (
        <div className="wrapper-side">
            <aside></aside>
            <section className="sidebyside">
                <main>
                    <h1>Welcome to The Visual Climate {user?.displayName}!</h1>
                    <div>
                    viewit tähän
                    </div>
                </main>
                <Profile />
            </section>
            <Footer />
        </div>
    );
}

export default Home;