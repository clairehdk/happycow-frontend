import React from "react";

const Fav = ({ favorites }) => {
  return (
    <div className="single_fav">
      <img src={favorites.thumbnail} />
      <h2>{favorites.name}</h2>
    </div>
  );
};

export default Fav;
