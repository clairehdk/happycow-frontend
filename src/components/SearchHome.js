import React from "react";
import donuts from "../assets/img/home.webp";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchHome = () => {
  const history = useHistory();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [status, setStatus] = useState(null);
  const [options, setOptions] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          history.push("/searchmap", { currLat: lat, currLng: lng });
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const handleOptions = () => {
    setOptions(true);
  };

  return (
    <div className="donuts_search">
      <img className="donuts" src={donuts} alt="donuts" />
      <div className="search">
        <h1>Find Vegan Restaurants Nearby</h1>
        <form className="form_home">
          <div>
            <input
              className="search_for"
              type="text"
              placeholder="Search for city, region or zipcode"
              onClick={handleOptions}
            ></input>
            <div className="search_icon">
              <input type="submit" value=""></input>
              <i class="fas fa-search fa-lg"></i>
            </div>
          </div>
          <div className={options ? "options" : "hidden"}>
            <div className="search_opt">
              <input
                onClick={getLocation}
                type="text"
                value="Current location"
              ></input>
              <i class="fas fa-location-arrow"></i>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchHome;
