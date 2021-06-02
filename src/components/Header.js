import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.svg";

const Header = ({ setModal, userToken, setUser }) => {
  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>

      <div>
        {userToken ? (
          <button onClick={() => setUser(null)}>Se déconnecter</button>
        ) : (
          <button onClick={setModal}>Login | Join</button>
        )}
      </div>
    </div>
  );
};

export default Header;
