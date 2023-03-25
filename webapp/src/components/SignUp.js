import React, { useState } from "react";
import RegisterForm, { LoginForm, GoogleForm } from "../components/LoginForms";

function SignUp({ setIsAuth }) {
    const [isClicked, setIsClicked] = useState(false);
  
    function handleClick() {
        setIsClicked(true);
      }
      
    return (
      <div>
        <button onClick={handleClick}>Sign Up</button>
        {isClicked && 
        <div> 
        <h1>Not registered yet? Sign up here!</h1>
        <RegisterForm setIsAuth={setIsAuth}/> 
        </div>
       }
      </div>
    );
  }

export default SignUp;