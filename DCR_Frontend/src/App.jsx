import React from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Rect } from "react-konva";
import GraphObject from "./GraphElements/GraphObject";
import Event from "./GraphElements/Event";
import Relation from "./GraphElements/Relation";
import Nav from "./Components/Navbar";
import Navbar from "./Components/Navbar";
import "./index.css";

// App functional component
const App = () => {
  // Creating a new GraphObject
  var graph = new GraphObject();
  // Adding Event components to the GraphObject
  graph.addEvent([100, 100], [100, 100], "Event 1");
  graph.addEvent([300, 300], [100, 100], "Event 2");
  graph.addEvent([500, 500], [100, 100], "Event 3");
  graph.addEvent([700, 700], [100, 100], "Bob");
  // Adding Relation components to the GraphObject
  graph.addRelation(graph.events[0], graph.events[1], "Relation 1");
  graph.addRelation(graph.events[1], graph.events[2], "Relation 2");
  graph.addRelation(graph.events[2], graph.events[3], "Relation 3");

  // Returning a div with a Navbar component and a Stage component that contains the GraphObject
  return (
    <div className="App">
      <Navbar />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        {graph.render()}
      </Stage>
    </div>
  );
};

// Getting the root element from the DOM
const container = document.getElementById("root");
// Creating a root for the React application
const root = createRoot(container);
// Rendering the App component into the root
root.render(<App />);

export default App;
