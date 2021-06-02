import SearchHome from "../components/SearchHome";
import { useEffect, useState } from "react";
import axios from "axios";
import Places from "../components/Places";

const Home = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3001/");
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

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
    <div>Loading en cours</div>
  ) : (
    <div>
      <SearchHome />
      <div className="places">
        {data.map((place) => {
          return <Places key={place.placeId} data={place} />;
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
