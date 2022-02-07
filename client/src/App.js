import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/application"} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
