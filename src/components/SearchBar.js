import React from "react";
import FilterTypeButton from "./FilterTypeButton";
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

const SearchBar = ({ handleSearch, handleType, type, setType }) => {
  return (
    <div className="search_bar">
      <input placeholder="Ex : La veganie ..." onChange={handleSearch}></input>
      <div className="types_button">
        <FilterTypeButton
          handleType={handleType}
          type={type}
          setType={setType}
          value="Vegan"
          name="vegan"
          src={vegan_cat}
        />
        <FilterTypeButton
          handleType={handleType}
          type={type}
          setType={setType}
          value="Vegetarian"
          name="vegetarian"
          src={veg_cat}
        />
        <FilterTypeButton
          handleType={handleType}
          type={type}
          setType={setType}
          value="Veg-options"
          name="veg-options"
          src={veg_options}
        />
        <FilterTypeButton
          handleType={handleType}
          type={type}
          setType={setType}
          value="Delivery"
          name="Delivery"
          src={delivery}
        />
        <FilterTypeButton
          handleType={handleType}
          type={type}
          setType={setType}
          value="Catering"
          name="Catering"
          src={catering}
        />
        <FilterTypeButton
          handleType={handleType}
          type={type}
          setType={setType}
          value="Veg Store"
          name="Veg Store"
          src={veg_store}
        />
        <FilterTypeButton
          handleType={handleType}
          type={type}
          setType={setType}
          value="Other"
          name="Other"
          src={other}
        />
        <FilterTypeButton
          handleType={handleType}
          type={type}
          setType={setType}
          value="Health Store"
          name="Health Store"
          src={health_store}
        />
        <FilterTypeButton
          handleType={handleType}
          type={type}
          setType={setType}
          value="Ice Cream"
          name="Ice Cream"
          src={ice_cream}
        />
        <FilterTypeButton
          handleType={handleType}
          type={type}
          setType={setType}
          value="Juice Bar"
          name="Juice Bar"
          src={juice_bar}
        />
        <FilterTypeButton
          handleType={handleType}
          type={type}
          setType={setType}
          value="Food Truck"
          name="Food Truck"
          src={food_truck}
        />
        <FilterTypeButton
          handleType={handleType}
          type={type}
          setType={setType}
          value="Market Vendor"
          name="Market Vendor"
          src={vendor}
        />
        <FilterTypeButton
          handleType={handleType}
          type={type}
          setType={setType}
          value="Organization"
          name="Organization"
          src={professional}
        />
        <FilterTypeButton
          handleType={handleType}
          type={type}
          setType={setType}
          value="Bakery"
          name="Bakery"
          src={bakery}
        />
      </div>
    </div>
  );
};

export default SearchBar;
