import React from "react";
import logo from "../assets/img/logo.svg";

const Header = () => {
  return (
    <div className="header">
      <img className="logo" src={logo} alt="logo" />
      <div>
        <a href="">Login / Join</a>
        <a href="">Login / Join</a>
      </div>
    </div>
  );
};

export default Header;
