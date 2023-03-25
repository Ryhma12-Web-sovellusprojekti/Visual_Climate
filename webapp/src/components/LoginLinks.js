import React, { useState } from "react";
import RegisterForm, { LoginForm, GoogleForm } from "./LoginForms";

function LoginLinks({ setIsAuth }) {
    const [isClicked, setIsClicked] = useState(true);

    const [x, setX ] = useState("1");

    const changeView = (e) => {
        setX(e.target.value);
        setIsClicked(true);
    };
switch(x){
  
  case "1":
    return (
      <div>
        <button value={1} onClick={e => changeView(e)}>Sign In</button>
        <button value={2} onClick={e => changeView(e)}>Sign Up</button>
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

    case "2":
      return (
        <div>
        <button value={1} onClick={e => changeView(e)}>Sign In</button>
        <button value={2} onClick={e => changeView(e)}>Sign Up</button>
        {isClicked && 
        <div> 
        <h1>Not registered yet? Sign up here!</h1>
        <RegisterForm setIsAuth={setIsAuth}/> 
        </div>
       }
        </div>
      );

      }
  }

export default LoginLinks;