import React, { useState } from "react";
import { auth, provider } from "../firebase-config"; 
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

function Login({ setIsAuth }) {
    let navigate = useNavigate();

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth, 
                registerEmail, 
                registerPassword
            );
            console.log(user);
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/home");
        } catch (error) {
            console.log(error.message);
        }
    };

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth, 
                loginEmail, 
                loginPassword
            );
            console.log(user);
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/home");
        } catch (error) {
            console.log(error.message);
        }
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/home");
        });

    };
    return (
        <div className="loginPage">
            <h1>Sign in to Continue</h1>
            <form action="">
                <input 
                    placeholder="Email..." 
                    type="email" onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }} 
                />
                <input 
                    placeholder="Password..." 
                    type="password" onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }}
                />
                <button onClick={login}>Sign In</button>

                <h3>Not yet registered? Sign up!</h3>
                <input 
                    placeholder="Email..." 
                    type="email" onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }} 
                />
                <input 
                    placeholder="Password..." 
                    type="password" onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}
                />
                <button onClick={register}>Sign Up</button>            
            </form>
            <h3>Or use your Google account</h3>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    );
};

export default Login;