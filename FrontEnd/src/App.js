import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Chat from "./Components/Chat/Chat";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <div className="App">
            <div className="app-body">
              <Sidebar />
              <Chat />
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
