import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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

import { Map, TileLayer, Popup, Marker } from "react-leaflet";

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

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="container">
      <div className="details_header">
        <div className="head">
          <h1>{data.name}</h1>
          <div className="head_type">
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
                  : data.type === "Professional" || data.type === "Organization"
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
            <p>{data.type}</p>
          </div>
        </div>
        <div className="content">
          <div className="sub_content">
            <div style={{ width: "55%" }}>
              <div style={{ display: "flex", width: "100%" }}>
                <div className="block">
                  <div className="col-left">
                    <i class="fas fa-phone-alt fa-lg"></i>
                  </div>
                  <div className="col-right">
                    <h1>CONTACT</h1>
                    <p>{data.phone}</p>
                  </div>
                </div>
                <div className="block">
                  <div className="col-left">
                    <i class="fas fa-map-marker-alt fa-lg"></i>
                  </div>
                  <div className="col-right">
                    <h1>FIND</h1>
                    <p>{data.address}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="content_description">{data.description}</p>
              </div>
            </div>
            <Map
              style={{ height: "200px", width: "500px" }}
              center={[data.location.lat, data.location.lng]}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[data.location.lat, data.location.lng]}
              ></Marker>
            </Map>
          </div>
          <div className="pictures">
            {data.pictures.map((picture, index) => {
              return <img className="picture_place" src={picture} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
