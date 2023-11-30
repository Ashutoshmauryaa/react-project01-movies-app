import logo from "./logo.svg";
import React, { Component } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Movies from "./Components/Movies";
import Favourite from "./Components/Favourite";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route exact path="/" element={<Banner />} /> */}
        <Route
          exact
          path="/"
          Component={(props) => (
            <>
              <Banner {...props} />
              <Movies {...props} />
            </>
          )}
        />
        {/* <Banner /> */}
        <Route exact path="/favourites" element={<Favourite />} />
      </Routes>
    </Router>
  );
}

export default App;
