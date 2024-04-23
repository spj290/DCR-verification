import React from "react";
import { Rect } from "react-konva";

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.x = props.pos[0];
    this.y = props.pos[1];
    this.width = props.size[0];
    this.height = props.size[1];
  }
  state = {
    color: "green",
  };
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor(), //TODO replace with code for popup menu
    });
  };
  render() {
    return (
      <Rect
        x={this.x}
        y={this.y}
        width={100}
        height={100}
        draggable={true}
        fill={this.state.color}
        shadowBlur={10}
        onClick={this.handleClick}
      />
    );
  }
}
export default Event;