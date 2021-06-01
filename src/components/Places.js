import React from "react";
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

const Places = ({ data }) => {
  return (
    <div className="place">
      <img className="place_img" src={data.thumbnail} alt="place" />
      <div className="place_description">
        <div className="place_title">
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
          <h1>{data.name}</h1>
        </div>
        {/* <p>{data.address.substring(",", "france")}</p> */}
        <p>{data.description}</p>
      </div>
    </div>
  );
};

export default Places;
