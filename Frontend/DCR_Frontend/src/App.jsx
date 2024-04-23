import React from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Rect } from "react-konva";
import GraphObject from "./GraphElements/GraphObject";
import Event from "./GraphElements/Event";
import Relation from "./GraphElements/Relation";
import Nav from "./Components/Navbar";
import Navbar from "./Components/Navbar";
import "./index.css";

const App = () => {
  var graph = new GraphObject();
  graph.addEvent([100, 100], [100, 100], "Event 1");
  graph.addEvent([300, 300], [100, 100], "Event 2");
  graph.addEvent([500, 500], [100, 100], "Event 3");
  graph.addEvent([700, 700], [100, 100], "Bob");
  graph.addRelation(graph.events[0], graph.events[1], "Relation 1");
  graph.addRelation(graph.events[1], graph.events[2], "Relation 2");
  graph.addRelation(graph.events[2], graph.events[3], "Relation 3");

  return (
    <div className="App">
      <Navbar />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        {graph.render()}
      </Stage>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

export default App;
