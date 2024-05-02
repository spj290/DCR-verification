import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Simulator from "./components/Simulator";
import GraphEditor from "./components/GraphEditor";
import { useState } from "react";

function App() {
  const [events, setEvents] = useState([]);
  const [relations, setRelations] = useState([]);

  return (
    <Router>
      <nav className="navbar">
        <Link to="/">EDITOR</Link>
        <Link to="/simulator">SIMULATOR</Link>
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
