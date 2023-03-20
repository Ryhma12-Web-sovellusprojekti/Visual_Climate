import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
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
  const [isAuth, setIsAuth] = useState(false);
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  }
  return <div className="App">
    <Router>
    <nav>
      {isAuth &&
            <>
              <Link to="/home"> Home </Link>     
              <Link to="/view1"> View 1 </Link>
              <Link to="/view2"> View 2 </Link>
              <Link to="/viewown"> Own View </Link>
              <button className="logout-btn" onClick={signUserOut}>Log Out</button>
            </>
          }
      </nav>
      <Routes>
        <Route path="/" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/view1" element={<View1 />} />
        <Route path="/view2" element={<View2 />} />
        <Route path="/viewown" element={<ViewOwn />} />
      </Routes>
    </Router>
  </div>;
}

export default App;