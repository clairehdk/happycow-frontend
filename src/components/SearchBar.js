import React from "react";

const SearchBar = ({ handleSearch, handleType }) => {
  return (
    <div className="search_bar">
      <input placeholder="Ex : La veganie ..." onChange={handleSearch}></input>
      <div>
        <input onClick={handleType} value="vegan" />
        <input onClick={handleType} value="vegetarian" />
        <input onClick={handleType} value="veg-options" />
      </div>
    </div>
  );
};

export default SearchBar;
