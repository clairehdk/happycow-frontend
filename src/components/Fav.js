import React from "react";

const Fav = ({ favorites }) => {
  return (
    <div>
      <img src={favorites.thumbnail} />
      <h1>{favorites.name}</h1>
    </div>
  );
};

export default Fav;
