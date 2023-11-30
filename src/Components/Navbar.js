import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <>
        <div style={{ display: "flex" }} className="Navbar">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <h1 style={{ margin: "1rem", color: "white" }}>Movies App</h1>
          </Link>
          <Link to={"/favourites"} style={{ textDecoration: "none" }}>
            <h2 style={{ margin: "1.5rem", color: "white" }}>Favourites</h2>
          </Link>
        </div>

        {/* <div>
          <hr></hr>
        </div> */}
      </>
    );
  }
}
