import React from "react";
import loader from "../assets/img/loader.svg";

const Loader = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={loader} alt="Loading..." />
    </div>
  );
};

export default Loader;
