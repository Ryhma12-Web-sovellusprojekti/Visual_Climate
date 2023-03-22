import React from "react";
import RegisterForm, { LoginForm, GoogleForm } from "../components/LoginForms";
import Footer from "../components/Footer";

function Login({ setIsAuth }) {
    return (
        <div className="wrapper">
            <header>
            </header>
            <main>
                <h1>Sign in to Continue</h1>
                <LoginForm setIsAuth={setIsAuth} />   
                <h3>Or use your Google account</h3>
                <GoogleForm setIsAuth={setIsAuth}/>
                <h1>Not registered yet? Sign up here!</h1>
                <RegisterForm setIsAuth={setIsAuth}/>  
            </main>
            <Footer />
        </div>
    );
};

export default Login;