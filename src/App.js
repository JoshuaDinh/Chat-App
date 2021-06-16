import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <div className="App">
            <Login />
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
