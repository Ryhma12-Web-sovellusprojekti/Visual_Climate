import React, { useState } from "react";
import RegisterForm, { LoginForm, GoogleForm } from "./LoginForms";

function LoginLinks() {

    // Declaration of state variables called isClicked and x using the useState hook
    const [isClicked, setIsClicked] = useState(true);
    const [x, setX ] = useState("1");

    // Function to change the view according to the clicked button
    const changeView = (e) => {
        setX(e.target.value);
        setIsClicked(true);
    };

    // Switch statement to determine which view should be shown based on the value of x
    switch(x){
        // The first case - for sign in view
        case "1":
            return (
                <div>
                <button className="signinselect active" value={1} onClick={e => changeView(e)}>Sign In</button>
                <button className="signinselect" value={2} onClick={e => changeView(e)}>Sign Up</button>
                {isClicked && 
                    <div> 
                    <h1>Sign in to Continue</h1>
                    <LoginForm />
                    <h3>Or use your Google account</h3>
                    <GoogleForm />
                    </div>
                }
            </div>
        );

        // The second case - for sign up view
        case "2":
            return (
                <div>
                <button className="signinselect" value={1} onClick={e => changeView(e)}>Sign In</button>
                <button className="signinselect active" value={2} onClick={e => changeView(e)}>Sign Up</button>
                {isClicked && 
                    <div> 
                    <h1>Not registered yet? Sign up here!</h1>
                    <RegisterForm /> 
                    </div>
                }
            </div>
        );
    }
}

export default LoginLinks;
