import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          color: "#000",
          padding: "20px",
          fontFamily: "cursive",
          cursor: "pointer",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 style={{ color: "#E50914", fontWeight: "800" }}>MovieApp</h1>
        </Link>
        <Link to="/favourites" style={{ textDecoration: "none" }}>
          <h2 style={{ marginLeft: "30px", color: "#E50914" }}>Features</h2>
        </Link>
      </div>
    );
  }
}
export default Navbar;
