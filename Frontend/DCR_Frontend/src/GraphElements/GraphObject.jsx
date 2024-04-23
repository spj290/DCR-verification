import React from "react";
import { Rect, Text, Group, Layer } from "react-konva";
import Event from "./Event";
import Relation from "./Relation";

export default class GraphObject extends React.Component {
  constructor(props) {
    super(props);
    this.events = [];
    this.relations = [];
  }
  addEvent(pos, size, label) {
    this.events.push(<Event pos={pos} size={size} label={label} />);
  }
  addRelation(fromEvent, toEvent, label) {
    this.relations.push(
      <Relation fromEvent={fromEvent} toEvent={toEvent} label={label} />
    );
  }
  handleClick = () => {
    console.log("GraphObject clicked");
  };
  render() {
    return (
      <Layer>
        {this.events}
        {this.relations}
      </Layer>
    );
  }
}
