import React, { useState, useEffect } from "react";
import axios from "axios";
import { Map, TileLayer, Popup, Marker } from "react-leaflet";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

const SearchMap = ({ currLat, currLng }) => {
  const [data, setData] = useState();
  const [dataNearMe, setDataNearMe] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingDataNearMe, setLoadingDataNearMe] = useState(true);
  const [coords, setCoords] = useState([]);
  const [status, setStatus] = useState(null);
  const [options, setOptions] = useState(false);
  // const [googleCoords, setGoogleCoords] = useState({ lat: null, lng: null });
  // const [address, setAddress] = useState("");
  const params = {
    access_key: "93f41a23e704c600a59357c4aeee42ea",
    query: "1600 Pennsylvania Ave NW",
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://api.positionstack.com/v1/forward",
        {
          params,
        }
      );
      const response = await axios.get("http://localhost:3001/");
      // console.log(result.data);
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    };
    fetchData();
    // control.addTo(map);
  }, []);

  const handleOptions = () => {
    setOptions(true);
  };

  // const handleSelectAddress = async (value) => {
  //   const results = await geocodeByAddress(value);
  //   console.log(results);
  //   const ll = await getLatLng(results[0]);
  //   setAddress(value);
  //   setGoogleCoords(ll);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!navigator.geolocation) {
        setStatus("Geolocation is not supported by your browser");
      } else {
        setStatus("Locating...");
        const getCoords = async () => {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          return [position.coords.latitude, position.coords.longitude];
        };
        const coords = await getCoords();
        console.log("coords :", coords);
        const data = {
          currLat: coords[0],
          currLong: coords[1],
        };
        const response = await axios.post(
          "http://localhost:3001/location",
          data
        );
        console.log("data =>", response.data);
        setDataNearMe(response.data);
        setCoords(coords);
        setLoadingDataNearMe(false);
      }
      // await getLocation();
    } catch (e) {
      console.log(e.response.data);
    }
  };

  // const mapRef = useRef();
  return loading ? (
    <div>Loading en cours... </div>
  ) : (
    // 2.1481181
    <div id="mapid">
      <form className="form_home">
        {/* <p>lat : {googleCoords.lat}</p>
        <p>long : {googleCoords.lng}</p>
        <p>Adresse : {address}</p> */}
        {/* <div style={{ width: "100%" }}>
          <GooglePlacesAutocomplete
            apiKey="AIzaSyAFuJAdaqBVwPpC7z8ueOtd_0Z6pkqLnYQ"
            selectProps={{
              address,
              onChange: setAddress,
            }}
            // value={address}
            // onChange={setAddress}
            onSelect={handleSelectAddress}
          />
        </div> */}
        <div>
          <input
            className="search_for"
            type="text"
            placeholder="Search for city, region or zipcode"
            onClick={handleOptions}
          ></input>
        </div>
        <div className={options ? "options" : "hidden"}>
          <div className="search_opt">
            <button onClick={handleSubmit}>
              Current location
              <i className="fas fa-location-arrow"></i>
            </button>
          </div>
        </div>
      </form>
      {coords.length < 1 ? (
        <Map
          className="map"
          center={[48.866667, 2.333333]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {data.map((item) => {
            return (
              <Marker
                key={item.placeId}
                position={[item.location.lat, item.location.lng]}
              >
                <Popup>
                  {item.name} <br /> {item.address}
                </Popup>
              </Marker>
            );
          })}
        </Map>
      ) : (
        <Map
          className="map"
          center={[48.948564100000006, 2.1481505]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {loadingDataNearMe === true ? (
            <p>Loading en cours...</p>
          ) : (
            dataNearMe &&
            dataNearMe.placesNearMe.map((item) => {
              return (
                <Marker
                  key={item.placeId}
                  position={[item.location.lat, item.location.lng]}
                >
                  <Popup>
                    {item.name} <br /> {item.address}
                  </Popup>
                </Marker>
              );
            })
          )}
        </Map>
      )}
    </div>
  );
};

export default SearchMap;

// Paris
// [48.866667, 2.333333];

// Moi
// [48.948564100000006, 2.1481505]
