import React from "react";
import LoginLinks from "../components/LoginLinks"
import Footer from "../components/Footer";

function Login({ setIsAuth }) {
    return (
        <div className="wrapper">
            <header>
            </header>
            <main>  
            <LoginLinks setIsAuth={setIsAuth}/>
            </main>
            <Footer />
        </div>
    );
};

export default Login;