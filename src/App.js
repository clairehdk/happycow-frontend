import "./App.css";
import { useState } from "react";
import Cookies from "js-cookie";

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

function App() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);

  // AFFICHAGE DE LA MODAL D'INSCRIPTION / LOGIN
  const setModal = () => {
    setIsModalOpened(!isModalOpened);
    setErrorMessage("");
  };

  // MISE EN PLACE DU TOKEN
  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 1 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
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
            handleSearch={handleSearch}
            handleType={handleType}
            setName={setName}
            name={name}
            setLimit={setLimit}
            limit={limit}
            skip={skip}
            setLimit={setLimit}
            handleType={handleType}
            type={type}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
