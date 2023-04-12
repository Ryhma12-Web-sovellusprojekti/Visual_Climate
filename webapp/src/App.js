import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

// pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import View1 from "./pages/View1";
import View2 from "./pages/View2";
import CustomView from "./pages/CustomView";
import ShowCustomView from "./pages/ShowCustomView";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
 
  return <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/home" element={<Home isAuth={isAuth} />} />
        <Route path="/view1" element={<View1 />} />
        <Route path="/view2" element={<View2 />} />
        <Route path="/customview" element={<CustomView />} />
        <Route path="/showcustomview" element={<ShowCustomView />} />
      </Routes>
    </Router>
  </div>;
}

export default App;