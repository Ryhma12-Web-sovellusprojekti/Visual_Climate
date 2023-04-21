import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import ShowCustomView from "./pages/ShowCustomView";

function App() {
 
  return <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home route={0} />} />
        <Route path="/home/View1" element={<Home route={"View1"}/>} />
        <Route path="/home/View2" element={<Home route={"View2"}/>} />
        <Route path="/home/CustomView" element={<Home route={"CustomView"}/>} />
        <Route path="/CustomView/:id" element={<ShowCustomView />} />
        <Route path="/home/CustomViewEdit" element={<Home route={"CustomViewEdit"}/>} />
      </Routes>
    </Router>
  </div>;
}

export default App;