import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

// pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import ShowCustomView from "./pages/ShowCustomView";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
 
  return <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/home" element={<Home isAuth={isAuth} route={0} />} />
        <Route path="/home/View1" element={<Home isAuth={isAuth} route={"View1"}/>} />
        <Route path="/home/View2" element={<Home isAuth={isAuth} route={"View2"}/>} />
        <Route path="/home/CustomView" element={<Home isAuth={isAuth} route={"CustomView"}/>} />
        <Route path="/home/ShowCustom" element={<Home isAuth={isAuth} route={"ShowCustom"}/>} />
        <Route path="/customview/:id" element={<ShowCustomView />} />
      </Routes>
    </Router>
  </div>;
}

export default App;