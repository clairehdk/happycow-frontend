import React, { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";

const SearchMap = ({ currLat, currLng }) => {
  const [data, setData] = useState();
  const [dataNearMe, setDataNearMe] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingDataNearMe, setLoadingDataNearMe] = useState(true);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [options, setOptions] = useState(false);

  // const defaultCenter = [48.866667, 2.333333];
  // const defaultZoom = 13;
  const position = [lat, lng];

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
          console.log(position.coords.latitude);
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3001/");
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      await getLocation();
      // const { current = {} } = mapRef;
      // const { leafletElement: map } = current;
      // map.flyTo([48.9485403, 2.1481879], 14);
      const data = {
        currLat: lat,
        currLong: lng,
      };
      const response = await axios.post("http://localhost:3001/location", data);
      // console.log(response.data);
      setLoadingDataNearMe(false);
      setDataNearMe(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const mapRef = useRef();
  return loading ? (
    <div>Loading en cours... </div>
  ) : (
    // 2.1481181
    <div id="mapid">
      <form className="form_home">
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
            <input
              onClick={handleSubmit}
              type="text"
              value="Current location"
            ></input>
            <i className="fas fa-location-arrow"></i>
          </div>
        </div>
      </form>
      {/* <MapContainer
        className="map"
        ref={mapRef}
        center={defaultCenter}
        zoom={defaultZoom}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer> */}
      {lat === null && lng === null ? (
        <MapContainer
          className="map"
          center={[48.866667, 2.333333]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {data.map((item) => {
            return (
              <Marker position={[item.location.lat, item.location.lng]}>
                <Popup>
                  {item.name} <br /> {item.address}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      ) : (
        <MapContainer
          className="map"
          center={[position]}
          zoom={13}
          scrollWheelZoom={false}
        >
          {loadingDataNearMe === true ? (
            <p>Loading en cours...</p>
          ) : (
            dataNearMe &&
            dataNearMe.placesNearMe.map((item) => {
              return (
                <Marker position={[item.location.lat, item.location.lng]}>
                  <Popup>
                    {item.name} <br /> {item.address}
                  </Popup>
                </Marker>
              );
            })
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default SearchMap;

// Paris
// [48.866667, 2.333333];
