import React from "react";
import Profile from "./Profile";
import Footer from "../components/Footer";
import Viewlinks from "../components/Viewlinks";
import useAuth from "../components/CustomHooks";

function Home() {
    const user = useAuth();

    return (
        <div className="wrapper-side">
            <aside></aside>
            <section className="sidebyside">
                <main>
                    <h1>Welcome to The Visual Climate {user?.displayName}!</h1>
                    <Viewlinks />
                </main>
                <Profile />
            </section>
            <Footer />
        </div>
    );
}

export default Home;