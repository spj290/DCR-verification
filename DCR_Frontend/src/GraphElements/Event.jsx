import React from "react";
import {Rect, Text, Group} from "react-konva";

class Event extends React.Component {
  // Constructor for the Event component
  constructor(props) {
    super(props);
    // Assigning properties from props to local variables
    this.id = props.eventId;
    this.x = props.pos[0];
    this.y = props.pos[1];
    this.width = props.size[0];
    this.height = props.size[1];
    this.label = props.label;
    if (props.onDragMove) {
      this.onDragMove = props.onDragMove;
    }
  }

  // Initial state of the component
  state = {
    color: "green",
  };

  // Handler for click event
  handleClick = () => {
    // Changing the state color to a random color
    this.setState({
      color: Konva.Util.getRandomColor(), //TODO replace with code for popup menu
    });
  };

  

  // Render method for the component
  render() {
    // Returning a Group component with a Rect and Text child components
    return (
      <Group
      draggable
      x={this.x}
      y={this.y}
      onClick={this.handleClick}
      // onDragMove={this.onDragMove}
      onDragMove={() => console.log(this.x, this.y)}
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