import "./App.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

// Import des Hooks
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import des containers
import Home from "./containers/Home";
import Modal from "./components/Modal";
// Import des composants
import Header from "./components/Header";
import SearchMap from "./containers/SearchMap";
import PlaceDetails from "./containers/PlaceDetails";
import SignUp from "./containers/SignUp";
import Favorites from "./containers/Favorites";

function App() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userId, setUserId] = useState(Cookies.get("userId") || null);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // AFFICHAGE DE LA MODAL D'INSCRIPTION / LOGIN
  const setModal = () => {
    setIsModalOpened(!isModalOpened);
    setErrorMessage("");
  };

  // MISE EN PLACE DU TOKEN
  const setUser = (token, userId) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 1 });
      Cookies.set("userId", userId, { expires: 10 });
      setUserToken(token);
      setUserId(userId);
    } else {
      Cookies.remove("userToken");
      Cookies.remove("userId");
      setUserToken(null);
      setUserId(null);
    }
  };

  // RECUPERATION DES MESSAGES D'ERREUR
  const setError = (e) => {
    setErrorMessage(e);
  };

  // SEARCH BAR
  const handleSearch = (event) => {
    const value = event.target.value;
    // Peut-être setPage(1) si ça fou la merde
    setPage(1);
    setSkip(0);
    setName(value);
  };

  const handleType = (event) => {
    setType(event.target.value);
  };

  return (
    <Router>
      <Modal
        setUser={setUser}
        setError={setError}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
        isModalOpened={isModalOpened}
        setModal={setModal}
        setIsModalOpened={setIsModalOpened}
      />
      <Header userToken={userToken} setModal={setModal} setUser={setUser} />
      <Switch>
        <Route path="/favorites">
          <Favorites userToken={userToken} userId={userId} />
        </Route>
        <Route path="/signup">
          <SignUp
            setUser={setUser}
            setError={setError}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
        </Route>
        <Route path="/places/:placeId">
          <PlaceDetails />
        </Route>
        <Route path="/searchmap">
          <SearchMap />
        </Route>
        <Route path="/">
          <Home
            userToken={userToken}
            handleSearch={handleSearch}
            handleType={handleType}
            setName={setName}
            name={name}
            setLimit={setLimit}
            limit={limit}
            skip={skip}
            setLimit={setLimit}
            type={type}
            setType={setType}
            userId={userId}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
