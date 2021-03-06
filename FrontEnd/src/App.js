import { useState, useEffect } from "react";
import "./App.css";
import Pusher from "pusher-js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Chat from "./Components/Chat/Chat";

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/messages/sync")
        .then((res) => res.json())
        .then((data) => setMessages(data));
    };
    fetchData();
  }, []);

  // Listens to changes in the database / real time
  useEffect(() => {
    const pusher = new Pusher("61555feb51e255bda7c7", {
      cluster: "us3",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <div className="App">
            <Sidebar />
            <Chat messages={messages} />
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
