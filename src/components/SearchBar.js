import React from "react";

const SearchBar = () => {
  return (
    <div className="search_bar">
      <input placeholder="Ex : La veganie ..."></input>
      <div>
        <button>Vegan</button>
        <button>Vegetarian</button>
        <button>Veg-options</button>
      </div>
    </div>
  );
};

export default SearchBar;
