import React from "react";
import donuts from "../assets/img/home.webp";

const SearchHome = () => {
  return (
    <div className="donuts_search">
      <img className="donuts" src={donuts} alt="donuts" />
      <div className="search">
        <h1>Find Vegan Restaurants Nearby</h1>
      </div>
    </div>
  );
};

export default SearchHome;
