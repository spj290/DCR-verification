import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Simulator from "./components/Simulator";
import GraphEditor from "./components/GraphEditor";
import { useState, useEffect } from "react";
import FileManager from "./components/FileManager";
import { convertToDCRGraph } from "./utils";
import checkAlignment from "../BitDCRAlign-main/src/tdm";

function App() {
  const [events, setEvents] = useState([]);
  const [relations, setRelations] = useState([]);
  const [testsActive, setTestsActive] = useState(false);
  const [tests, setTests] = useState([]);

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTests(
        tests.map((test) => ({
          ...test,
          status: checkAlignment(
            test,
            convertToDCRGraph(events, relations),
            10
          ),
        }))
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [tests, events, relations]);

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
        <div
          className="links"
          style={{
            border: `2px solid ${
              tests.every((test) => test.status) ? "green" : "red"
            }`,
          }}
          onClick={() => setTestsActive(!testsActive)}
        >
          TESTS
        </div>
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
              testsActive={testsActive}
              tests={tests}
            />
          }
        />
        <Route
          path="/simulator"
          element={
            <Simulator
              events={events}
              relations={relations}
              tests={tests}
              setTests={setTests}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
