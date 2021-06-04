import SearchHome from "../components/SearchHome";
import { useEffect, useState } from "react";
import axios from "axios";
import Places from "../components/Places";
import SearchBar from "../components/SearchBar";
import Limit from "../components/Limit";
import Loader from "../components/Loader";

const Home = ({
  name,
  setName,
  handleSearch,
  limit,
  setLimit,
  skip,
  type,
  setType,
  handleType,
  favorites,
  userToken,
}) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/?name=${name}&type=${type}&limit=${limit}`
        );
        // console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, [type, name, limit]);

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
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="home">
      <SearchHome />
      <h2>Nos restaurants</h2>
      <SearchBar
        handleSearch={handleSearch}
        handleType={handleType}
        type={type}
        setType={setType}
      />
      <Limit setLimit={setLimit} />
      <div className="places">
        {data.map((place) => {
          return (
            <Places
              key={place.placeId}
              data={place}
              userToken={userToken}
              favorites={favorites}
            />
          );
        })}
        {/* <button onClick={getLocation}>Get Location</button>
        <h1>Coordinates</h1>
        <p>{status}</p>
        {lat && <p>Latitude: {lat}</p>}
        {lng && <p>Longitude: {lng}</p>} */}
      </div>
    </div>
  );
};

export default Home;
