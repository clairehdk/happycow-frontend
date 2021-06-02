import "./App.css";

// Import des Hooks
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import des containers
import Home from "./containers/Home";

// Import des composants
import Header from "./components/Header";
import SearchMap from "./containers/SearchMap";
import PlaceDetails from "./containers/PlaceDetails";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/places/:placeId">
          <PlaceDetails />
        </Route>
        <Route path="/searchmap">
          <SearchMap />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
