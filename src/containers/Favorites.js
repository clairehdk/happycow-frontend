import React, { useEffect, useState } from "react";
import Fav from "../components/Fav";
import axios from "axios";
import Loader from "../components/Loader";

const Favorites = ({ userToken, userId }) => {
  const [favs, setFavs] = useState();
  const [loading, setLoading] = useState(true);
  // RECUPERATION DES FAVORIS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = { userId };
        const response = await axios.post(
          `http://localhost:3001/user/favs`,
          data,
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log(response.data);
        setFavs(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="favorites">
      <h1>Mes favoris</h1>
      {favs.map((fav) => {
        return <Fav key={fav._id} favorites={fav} />;
      })}
    </div>
  );
};

export default Favorites;
