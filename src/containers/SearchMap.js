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
  const [dataNearAddress, setDataNearAddress] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingDataNearMe, setLoadingDataNearMe] = useState(true);
  const [coords, setCoords] = useState([]);
  const [status, setStatus] = useState(null);
  const [options, setOptions] = useState(false);
  const [googleCoords, setGoogleCoords] = useState([]);
  const [address, setAddress] = useState("");
  // const params = {
  //   access_key: "93f41a23e704c600a59357c4aeee42ea",
  //   query: "1600 Pennsylvania Ave NW",
  // };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3001/");
      // console.log(response.data);
      setData(response.data);
      setLoading(false);
    };
    fetchData();
    // control.addTo(map);
  }, []);

  const handleOptions = () => {
    setOptions(true);
  };

  const handleSelectAddress = async (event) => {
    event.preventDefault();
    let newAddress = address.label.replace(",", " ");
    const getGoogleAddress = async () => {
      const result = await axios.get(
        `http://api.positionstack.com/v1/forward?access_key=0ee6ece083ef976e3f687991f221fd78&query=${newAddress}`
      );
      return [result.data.data[0].latitude, result.data.data[0].longitude];
    };
    const googleCoords = await getGoogleAddress();
    console.log("Google coords :", googleCoords);
    // console.log(googleCoords);
    const data = {
      googleLat: googleCoords[0],
      googleLong: googleCoords[1],
    };
    const response = await axios.post("http://localhost:3001/adresses", data);
    console.log("data =>", response.data);
    setDataNearAddress(response.data);
    setCoords([]);
    setGoogleCoords(googleCoords);
    setLoadingDataNearMe(false);
  };

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
        setGoogleCoords([]);
        setCoords(coords);
        setLoadingDataNearMe(false);
      }
      // await getLocation();
    } catch (e) {
      console.log(e);
    }
  };

  // const mapRef = useRef();
  return loading ? (
    <div>Loading en cours... </div>
  ) : (
    // 2.1481181
    <div id="mapid">
      <div className="left_col">
        <form className="form_home">
          {/* <p>lat : {googleCoords.lat}</p>
        <p>long : {googleCoords.lng}</p>
        <p>Adresse : {address}</p> */}
          <div style={{ width: "92%", display: "flex" }}>
            <GooglePlacesAutocomplete
              apiKey="AIzaSyAFuJAdaqBVwPpC7z8ueOtd_0Z6pkqLnYQ"
              selectProps={{
                onChange: setAddress,
              }}
            />
          </div>
          <button onClick={handleSelectAddress}>Envoyer</button>
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
        {data.map((place) => {
          return (
            <div key={place.placeId}>
              <p>{place.name}</p>
            </div>
          );
        })}
      </div>
      {googleCoords.length > 1 ? (
        <Map
          className="map"
          center={googleCoords}
          zoom={15}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={googleCoords}></Marker>
          {loadingDataNearMe === true ? (
            <p>Loading en cours...</p>
          ) : (
            dataNearAddress &&
            dataNearAddress.placesNearAddress.map((item) => {
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
      ) : coords.length > 1 ? (
        <Map className="map" center={coords} zoom={13} scrollWheelZoom={true}>
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
      ) : (
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
      )}
    </div>
  );
};

export default SearchMap;

// Paris
// [48.866667, 2.333333];

// Moi
// [48.948564100000006, 2.1481505]
