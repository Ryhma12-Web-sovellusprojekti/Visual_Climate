import React, { useState } from "react";
import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
import Footer from "../components/Footer";


function Login({ setIsAuth }) {
    return (
        <div className="wrapper">
            <header>
            </header>
            <main>
            <SignIn setIsAuth={setIsAuth}/>   
            <SignUp setIsAuth={setIsAuth}/>       
            </main>
            <Footer />
        </div>
    );
};

export default Login;