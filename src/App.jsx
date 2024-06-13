import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Simulator from "./components/Simulator";
import GraphEditor from "./components/GraphEditor";
import { useState, useEffect } from "react";
import { convertToDCRGraph } from "./utils";
import checkAlignment from "../BitDCRAlign-main/src/tdm";
import Navbar from "./components/Navbar";

function App() {
  const [events, setEvents] = useState([]);
  const [relations, setRelations] = useState([]);
  const [testsActive, setTestsActive] = useState(false);
  const [tests, setTests] = useState([]);

  // When the app first loads up, check if there are any events or relations saved in local storage
  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    const savedRelations = localStorage.getItem("relations");
    const savedTests = localStorage.getItem("tests");
    const savedTestsActive = localStorage.getItem("testsActive");

    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
    if (savedRelations) {
      setRelations(JSON.parse(savedRelations));
    }
    if (savedTests) {
      const parsedTests = JSON.parse(savedTests);
      parsedTests.forEach((test) => {
        test.context = new Set(test.context);
      });
      setTests(parsedTests);
    }
    if (savedTestsActive) {
      setTestsActive(JSON.parse(savedTestsActive));
    }
    console.log("Events, relations and tests loaded from local storage");
  }, []);

  // Every time the events, relations, test or testsActive, state changes, save it to local storage
  useEffect(() => {
    if (events.length > 0 || relations.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
      localStorage.setItem("relations", JSON.stringify(relations));
      // tests.context is a Set, which is not serializable, so we need to convert it to an array
      const convertedTests = tests.map((test) => {
        return {
          ...test,
          context: Array.from(test.context),
        };
      });
      localStorage.setItem("tests", JSON.stringify(convertedTests));
      localStorage.setItem("testsActive", JSON.stringify(testsActive));
      console.log("Events, relations and tests saved to local storage");
    }
  }, [events, relations, tests , testsActive]);

  useEffect(() => {
    const eventLabels = events.map((event) => event.label);
    const intervalId = setInterval(() => {
      setTests(
        tests.map((test) => {
          return {
            ...test,
            status:
              test.trace.every((element) => eventLabels.includes(element)) &&
              checkAlignment(test, convertToDCRGraph(events, relations), 10),
          };
        })
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [tests, events, relations]);

  return (
    <Router>
      <Navbar
        events={events}
        relations={relations}
        setEvents={setEvents}
        setRelations={setRelations}
        tests={tests}
        setTests={setTests}
        testsActive={testsActive}
        setTestsActive={setTestsActive}
      />
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
              setTests={setTests}
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
              testsActive={testsActive}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
