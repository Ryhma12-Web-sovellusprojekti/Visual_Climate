import React, { useState } from "react";
import RegisterForm, { LoginForm, GoogleForm } from "../components/LoginForms";

function SignIn({ setIsAuth }) {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
      setIsClicked(true);
    }

  return (
    <div>
      <button onClick={handleClick}>Sign In</button>
      {isClicked && 
      <div> 
      <h1>Sign in to Continue</h1>
      <LoginForm setIsAuth={setIsAuth} />
      <h3>Or use your Google account</h3>
      <GoogleForm setIsAuth={setIsAuth}/>
      </div>
     }
    </div>
  );
}

export default SignIn;