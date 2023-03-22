import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

// pages
import Home from "./pages/Home";
import View1 from "./pages/View1";
import View2 from "./pages/View2";
import ViewOwn from "./pages/ViewOwn";
import Login from "./pages/Login";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  }
  
  return <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/home" element={<Home isAuth={isAuth} signUserOut={signUserOut}/>} />
        <Route path="/view1" element={<View1 />} />
        <Route path="/view2" element={<View2 />} />
        <Route path="/viewown" element={<ViewOwn />} />
      </Routes>
    </Router>
  </div>;
}

export default App;