import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ViewFavorites from "./genres/ViewFavorites";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/favorites" element={<ViewFavorites />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
