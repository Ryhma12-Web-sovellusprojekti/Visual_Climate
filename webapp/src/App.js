import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

// pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import View1 from "./pages/View1";
import View2 from "./pages/View2";
import ViewOwn from "./pages/ViewOwn";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
 
  return <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/home" element={<Home isAuth={isAuth} />} />
        <Route path="/view1" element={<View1 />} />
        <Route path="/view2" element={<View2 />} />
        <Route path="/viewown" element={<ViewOwn />} />
      </Routes>
    </Router>
  </div>;
}

export default App;