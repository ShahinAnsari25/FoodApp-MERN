import { useState } from "react";
import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/login";
import Signup from "./screens/signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route exact path="/" Component={Home}></Route>
        <Route exact path="login" Component={Login}></Route>
        <Route exact path="signup" Component={Signup}></Route>
      </Routes>
    </Router>
  );
}

export default App;
