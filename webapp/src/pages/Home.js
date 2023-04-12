import React from "react";
import Profile from "./Profile";
import Footer from "../components/Footer";
import Viewlinks from "../components/Viewlinks";
import useAuth from "../components/CustomHooks";
import LoginLinks from "../components/LoginLinks";

function Home() {
    const user = useAuth();
if(user){
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
} else{
    return(
        <div className="wrapper-side">
        <aside></aside>
        <section className="sidebyside">
            <main>
                <h1 id="error">Session timeout</h1>
                <LoginLinks/>
            </main>
            <h1>No profile</h1>
        </section>
        <Footer />
    </div>
    );
}

}

export default Home;