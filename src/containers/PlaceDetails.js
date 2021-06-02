import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const PlaceDetails = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { placeId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/places/:${placeId}`
        );
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return loading ? <div>Loading...</div> : <div>{data.name}</div>;
};

export default PlaceDetails;
