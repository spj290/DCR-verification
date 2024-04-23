import React from "react";
import {Rect, Text, Group} from "react-konva";

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.eventId;
    this.x = props.pos[0];
    this.y = props.pos[1];
    this.width = props.size[0];
    this.height = props.size[1];
    this.label = props.label;
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
      <Group
      draggable
      x={this.x}
      y={this.y}
      onClick={this.handleClick}
    >
      <Rect
        width={this.width}
        height={this.height}
        fill={this.state.color}

      />
      <Text
        text={this.label}
        fontSize={15}
        fill="white"
        x={0}
        y={this.height / 2 - 10}
        width={this.width}
        height={this.height}
        align="center"
      />
    </Group>
    );
  }
}
export default Event;