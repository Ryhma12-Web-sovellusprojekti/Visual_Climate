import React from "react";
import LoginLinks from "../components/LoginLinks"
import Footer from "../components/Footer";

function Login() {

    // The function returns the login page layout, including LoginLinks and Footer components
    return (
        <div className="wrapper">
            <header>
            </header>
            <main>  
                <LoginLinks />
            </main>
                <Footer />
        </div>
    );
};

export default Login;
