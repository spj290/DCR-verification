import React from "react";
import { Arrow, Text, Group } from "react-konva";

// Relation class component
class Relation extends React.Component {
  // Constructor for the Relation component
  constructor(props) {
    super(props);
    // Assigning properties from props to local variables
    this.id = props.relationId;
    this.fromPos = props.fromEvent.props.pos;
    this.toPos = props.toEvent.props.pos;
    this.fromWidth = props.fromEvent.props.size[0];
    this.toWidth = props.toEvent.props.size[0];
    this.fromHeight = props.fromEvent.props.size[1];
    this.toHeight = props.toEvent.props.size[1];
    // Calculating the points for the Arrow component
    this.points = [
      this.fromPos[0] + this.fromWidth,
      this.fromPos[1] + this.fromHeight / 2,
      this.toPos[0],
      this.toPos[1] + this.toHeight / 2,
    ];
    // Adjusting the points if the fromPos is greater than the toPos
    if (this.fromPos[0] > this.toPos[0]) {
      this.points[2] = this.toPos[0] + this.toWidth;
      this.points[3] = this.toPos[1] + this.toHeight / 2;
      this.points[0] = this.fromPos[0];
    }
    if (this.fromPos[1] > this.toPos[1]) {
      this.points[2] = this.toPos[0] + this.toWidth / 2;
      this.points[3] = this.toPos[1] + this.toHeight;
      this.points[1] = this.fromPos[1];
    }
    this.label = props.label;
  }
  
  // Initial state of the component
  state = {
    color: "red",
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
    // Returning a Group component with an Arrow and Text child components
    return (
      <Group x={0} y={0} onDblClick={this.handleClick}>
        <Arrow
          points={this.points}
          fill={this.state.color}
          stroke={"black"}
          shadowBlur={10}
          onClick={this.handleClick}
        />
        <Text
          text={this.label}
          fontSize={15}
          fill="black"
          x={this.points[0] + (this.points[2] - this.points[0]) / 2}
          y={this.points[1] + (this.points[3] - this.points[1]) / 2}
          width={this.width}
          height={this.height}
          align="center"
        />
      </Group>
    );
  }
}

export default Relation;
