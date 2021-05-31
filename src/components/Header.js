import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.svg";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>

      <div>
        <a href="">Login / Join</a>
        <a href="">Login / Join</a>
      </div>
    </div>
  );
};

export default Header;
