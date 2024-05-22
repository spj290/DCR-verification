import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Simulator from "./components/Simulator";
import GraphEditor from "./components/GraphEditor";
import { useState , useEffect } from "react";
import FileManager from "./components/FileManager";

function App() {
  const [events, setEvents] = useState([]);
  const [relations, setRelations] = useState([]);

  // When the app first loads up, check if there are any events or relations saved in local storage
  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    const savedRelations = localStorage.getItem("relations");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
    if (savedRelations) {
      setRelations(JSON.parse(savedRelations));
    }
  }, []);

  // Every time the events or relations state changes, save it to local storage
  useEffect(() => {
    if (events.length > 0) {
    localStorage.setItem("events", JSON.stringify(events));
    localStorage.setItem("relations", JSON.stringify(relations));
    console.log("Events and relations saved to local storage");
    }
  }, [events, relations]);

  return (
    <Router>
      <nav className="navbar">
        <h1 className="navbar-title">DCR Graphing Tool</h1>
        <Link className="links" to="/">
          EDITOR
        </Link>
        <Link className="links" to="/simulator">
          SIMULATOR
        </Link>
        <FileManager
          events={events}
          relations={relations}
          setEvents={setEvents}
          setRelations={setRelations}
        />
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <GraphEditor
              events={events}
              setEvents={setEvents}
              relations={relations}
              setRelations={setRelations}
            />
          }
        />
        <Route
          path="/simulator"
          element={<Simulator events={events} relations={relations} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
