import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import veg_cat from "../assets/img/vegetarian_cat.svg";
import vegan_cat from "../assets/img/vegan_cat.svg";
import veg_store from "../assets/img/veg_store.svg";
import other from "../assets/img/other_cat.svg";
import health_store from "../assets/img/health_store.svg";
import veg_options from "../assets/img/veg_opt_cat.svg";
import ice_cream from "../assets/img/ice_cat.svg";
import juice_bar from "../assets/img/juice_cat.svg";
import professional from "../assets/img/org_cat.svg";
import bakery from "../assets/img/bake_cat.svg";
import catering from "../assets/img/catering_cat.svg";
import delivery from "../assets/img/delivery_cat.svg";
import food_truck from "../assets/img/truck_cat.svg";
import vendor from "../assets/img/vendor_cat.svg";
import Loader from "./Loader";

const Places = ({ data, userToken, favorites, userId }) => {
  const [isFav, setIsFav] = useState(false);
  const [newFav, setNewFav] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  let isAlreadyFavorite =
    favorites && favorites.length > 0
      ? favorites.filter((fav) => fav.placeId === data.placeId)
      : [];

  useEffect(() => {
    if (isAlreadyFavorite && isAlreadyFavorite.length === 0) {
      setIsFav(false);
    } else {
      setIsFav(true);
    }
  }, []);

  const handleFav = async (event) => {
    event.preventDefault();
    try {
      if (!isFav) {
        if (isAlreadyFavorite && isAlreadyFavorite.length === 0 && !isFav) {
          const dataToSend = {
            placeId: data.placeId,
            name: data.name,
            thumbnail: data.thumbnail,
          };
          const response = await axios.post(
            `http://localhost:3001/fav/add`,
            dataToSend,
            {
              headers: {
                authorization: `Bearer ${userToken}`,
              },
            }
          );
          console.log(response.data);
          setIsFav(true);
        }
      } else {
        const dataToDelete = { userId: userId, id: favorites._id };
        const response = await axios.post(
          `http://localhost:3001/fav/remove`,
          dataToDelete,
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log(response.data);
        setIsFav(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // const addFav = async (event) => {
  //   event.preventDefault();
  //   try {
  //     if (isAlreadyFavorite && isAlreadyFavorite.length === 0 && !isFav) {
  //       const dataToSend = {
  //         placeId: data.placeId,
  //         name: data.name,
  //         thumbnail: data.thumbnail,
  //       };
  //       const response = await axios.post(
  //         `http://localhost:3001/fav/add`,
  //         dataToSend,
  //         {
  //           headers: {
  //             authorization: `Bearer ${userToken}`,
  //           },
  //         }
  //       );
  //       console.log(response.data);
  //       setIsFav(true);
  //     } else {
  //       alert("Hello");
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const removeFav = async () => {
  //   try {
  //     const dataToDelete = { userId, id: favorites._id };
  //     const response = await axios.post(
  //       `http://localhost:3001/fav/remove`,
  //       dataToDelete,
  //       {
  //         headers: {
  //           authorization: `Bearer ${userToken}`,
  //         },
  //       }
  //     );
  //     console.log(response.dataToDelete);
  //     // window.location.reload(false);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const displayStars = (number) => {
    let tab = [];

    for (let i = 1; i <= 5; i++) {
      if (number < i) {
        tab.push(<i className="far fa-star"></i>);
      } else {
        tab.push(<i className="fas fa-star"></i>);
      }
    }

    return tab;
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="place">
      {/* <p>{newFav[0].name}</p> */}
      <div className="img_favs">
        <img className="place_img" src={data.thumbnail} alt="place" />

        {userToken && (
          <button className="icon_fav" onClick={handleFav}>
            {isFav ? (
              <i className="fas fa-heart fa-lg"></i>
            ) : (
              <i className="far fa-heart fa-lg"></i>
            )}
          </button>
        )}
      </div>
      <Link to={`/places/${data.placeId}`}>
        <div className="place_description">
          <div className="place_title">
            <div>
              <img
                className="icon"
                src={
                  data.type === "Veg Store"
                    ? veg_store
                    : data.type === "vegan"
                    ? vegan_cat
                    : data.type === "vegetarian"
                    ? veg_cat
                    : data.type === "Other"
                    ? other
                    : data.type === "Health Store"
                    ? health_store
                    : data.type === "veg-options"
                    ? veg_options
                    : data.type === "Ice Cream"
                    ? ice_cream
                    : data.type === "Juice Bar"
                    ? juice_bar
                    : data.type === "Professional" ||
                      data.type === "Organization"
                    ? professional
                    : data.type === "Bakery"
                    ? bakery
                    : data.type === "Catering"
                    ? catering
                    : data.type === "Delivery"
                    ? delivery
                    : data.type === "Food Truck"
                    ? food_truck
                    : data.type === "Market Vendor" && vendor
                }
              ></img>
              <h1>{data.name}</h1>
            </div>
            <div>{displayStars(data.rating)}</div>
          </div>
          {/* <p>{data.address.substring(",", "france")}</p> */}
          <p>{data.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default Places;
