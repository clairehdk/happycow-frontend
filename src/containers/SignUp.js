import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import signup from "../assets/img/signup.jpeg";
import { Map, TileLayer, Popup, Marker } from "react-leaflet";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import Error from "../components/Error";

const SignUp = ({ setError, setUser, errorMessage, setErrorMessage }) => {
  const [address, setAddress] = useState("");
  const [myLoc, setMyLoc] = useState([]);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [vegstatus, setVegstatus] = useState("");
  const [birthyear, setBirthyear] = useState("");
  const history = useHistory();

  //   const handleSelectAddress = async (event) => {
  //     event.preventDefault();
  //     let newAddress = address.label.replace(",", " ");
  //     const getMyAddress = async () => {
  //       const result = await axios.get(
  //         `http://api.positionstack.com/v1/forward?access_key=0ee6ece083ef976e3f687991f221fd78&query=${newAddress}`
  //       );
  //       return [result.data.data[0].latitude, result.data.data[0].longitude];
  //     };
  //     const myLoc = await getMyAddress();
  //     console.log("My coords", myLoc);
  //   };
  const handlePass = (event) => {
    const value = event.target.value;
    setPassword(value);
  };
  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handleUserName = (event) => {
    const value = event.target.value;
    setUserName(value);
  };
  const handleVegstatus = (event) => {
    const value = event.target.value;
    setVegstatus(value);
  };
  const handleBirthyear = (event) => {
    const value = event.target.value;
    setBirthyear(value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = {
        email: email,
        username: username,
        password: password,
        vegstatus: vegstatus,
        birthyear: birthyear,
      };
      const response = await axios.post("http://localhost:3001/signup", data);
      console.log(response.data);
      const token = response.data.token;
      const userId = response.data._id;
      setUser(token, userId);
      history.push("/");
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };
  return (
    <div className="signup">
      <div className="left_col">
        <img src={signup} alt="community" />
      </div>
      <div className="right_col">
        <div className="description">
          <h1>Join the largest vegan and vegetarian community in the world.</h1>
          {errorMessage && <Error errorMessage={errorMessage} />}
          <form>
            <div className="both">
              <div>
                <h2>Username</h2>
                <input
                  type="text"
                  placeholder="Username"
                  onChange={handleUserName}
                />
              </div>
              <div>
                <h2>Password</h2>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={handlePass}
                />
              </div>
            </div>
            <div className="email">
              <h2>Email</h2>
              <input type="text" placeholder="Email" onChange={handleEmail} />
            </div>
            <div className="both">
              <div>
                <h2>Veg Status</h2>
                <select
                  name="veg_status"
                  id="veg_status"
                  onChange={handleVegstatus}
                >
                  <option value="Vegan">Please select an option</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Raw">Raw</option>
                  <option value="Mostly Veg">Mostly Veg</option>
                  <option value="Non Veg">Non Veg</option>
                  <option value="Herbivore">Herbivore</option>
                  <option value="Fruitarian">Fruitarian</option>
                </select>
              </div>
              <div>
                <h2>Birth year</h2>
                <select name="birth-year" onChange={handleBirthyear}>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                  <option value="2008">2008</option>
                  <option value="2007">2007</option>
                  <option value="2006">2006</option>
                  <option value="2005">2005</option>
                  <option value="2004">2004</option>
                  <option value="2003">2003</option>
                  <option value="2002">2002</option>
                  <option value="2001">2001</option>
                  <option value="2000">2000</option>
                  <option value="1999">1999</option>
                  <option value="1998">1998</option>
                  <option value="1997">1997</option>
                  <option value="1996">1996</option>
                  <option value="1995">1995</option>
                  <option value="1994">1994</option>
                  <option value="1993">1993</option>
                  <option value="1992">1992</option>
                  <option value="1991">1991</option>
                  <option value="1990">1990</option>
                  <option value="1989">1989</option>
                  <option value="1988">1988</option>
                  <option value="1987">1987</option>
                  <option value="1986">1986</option>
                  <option value="1985">1985</option>
                  <option value="1984">1984</option>
                  <option value="1983">1983</option>
                  <option value="1982">1982</option>
                  <option value="1981">1981</option>
                  <option value="1980">1980</option>
                  <option value="1979">1979</option>
                  <option value="1978">1978</option>
                  <option value="1977">1977</option>
                  <option value="1976">1976</option>
                  <option value="1975">1975</option>
                  <option value="1974">1974</option>
                  <option value="1973">1973</option>
                  <option value="1972">1972</option>
                  <option value="1971">1971</option>
                  <option value="1970">1970</option>
                  <option value="1969">1969</option>
                  <option value="1968">1968</option>
                  <option value="1967">1967</option>
                  <option value="1966">1966</option>
                  <option value="1965">1965</option>
                  <option value="1964">1964</option>
                  <option value="1963">1963</option>
                  <option value="1962">1962</option>
                  <option value="1961">1961</option>
                  <option value="1960">1960</option>
                  <option value="1959">1959</option>
                  <option value="1958">1958</option>
                  <option value="1957">1957</option>
                  <option value="1956">1956</option>
                  <option value="1955">1955</option>
                  <option value="1954">1954</option>
                  <option value="1953">1953</option>
                  <option value="1952">1952</option>
                  <option value="1951">1951</option>
                  <option value="1950">1950</option>
                  <option value="1949">1949</option>
                  <option value="1948">1948</option>
                  <option value="1947">1947</option>
                  <option value="1946">1946</option>
                  <option value="1945">1945</option>
                  <option value="1944">1944</option>
                  <option value="1943">1943</option>
                  <option value="1942">1942</option>
                  <option value="1941">1941</option>
                  <option value="1940">1940</option>
                  <option value="1939">1939</option>
                  <option value="1938">1938</option>
                  <option value="1937">1937</option>
                  <option value="1936">1936</option>
                  <option value="1935">1935</option>
                  <option value="1934">1934</option>
                  <option value="1933">1933</option>
                  <option value="1932">1932</option>
                  <option value="1931">1931</option>
                  <option value="1930">1930</option>
                  <option value="1929">1929</option>
                  <option value="1928">1928</option>
                  <option value="1927">1927</option>
                  <option value="1926">1926</option>
                  <option value="1925">1925</option>
                  <option value="1924">1924</option>
                  <option value="1923">1923</option>
                  <option value="1922">1922</option>
                  <option value="1921">1921</option>
                  <option value="1920">1920</option>
                  <option value="1919">1919</option>
                  <option value="1918">1918</option>
                  <option value="1917">1917</option>
                  <option value="1916">1916</option>
                  <option value="1915">1915</option>
                  <option value="1914">1914</option>
                  <option value="1913">1913</option>
                  <option value="1912">1912</option>
                  <option value="1911">1911</option>
                  <option value="1910">1910</option>
                  <option value="1909">1909</option>
                  <option value="1908">1908</option>
                  <option value="1907">1907</option>
                  <option value="1906">1906</option>
                  <option value="1905">1905</option>
                </select>
              </div>
            </div>
            {/* <GooglePlacesAutocomplete
              apiKey="AIzaSyAFuJAdaqBVwPpC7z8ueOtd_0Z6pkqLnYQ"
              selectProps={{
                onChange: setAddress,
              }}
            />
            <button onClick={handleSelectAddress}>Envoyer</button>
            {myLoc.length > 1 ? (
              <Map
                className="map"
                center={myLoc}
                zoom={15}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={myLoc}></Marker>
              </Map>
            ) : (
              <Map
                className="map_signup"
                center={[46.232192999999995, 2.209666999999996]}
                zoom={5}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </Map>
            )} */}
            <button onClick={handleSubmit}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
