import React from "react";
import { Arrow, Text, Group } from "react-konva";

// Relation class component
export default class Relation extends React.Component {
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
    this.label = props.label;
    this.fromEvent = props.fromEvent;
    this.toEvent = props.toEvent;
  }
  
  initPoints = () => {
      // Calculating the points for the Arrow component
      var retPoints = [
        this.fromPos[0] + this.fromWidth,
        this.fromPos[1] + this.fromHeight / 2,
        this.toPos[0],
        this.toPos[1] + this.toHeight / 2,
      ];
      // Adjusting the points if the fromPos is greater than the toPos
      if (this.fromPos[0] > this.toPos[0]) {
        retPoints[2] = this.toPos[0] + this.toWidth;
        retPoints[3] = this.toPos[1] + this.toHeight / 2;
        retPoints[0] = this.fromPos[0];
      }
      if (this.fromPos[1] > this.toPos[1]) {
        retPoints[2] = this.toPos[0] + this.toWidth / 2;
        retPoints[3] = this.toPos[1] + this.toHeight;
        retPoints[1] = this.fromPos[1];
      }
      return retPoints;
  }


  // Initial state of the component
  state = {
    color: "red",
    points : [0,0,0,0]
  };
  // Initialise the points
  componentDidMount() {
    this.setState({
      points: this.initPoints()
    });
  }

  // Handler for click event
  handleClick = () => {
    // Changing the state color to a random color
    this.setState({
      color: Konva.Util.getRandomColor(), //TODO replace with code for popup menu
    });
  };

  updatePoints = () => {
    this.setState({
      points: this.initPoints()
    });
  }

  // Render method for the component
  render() {
    // Returning a Group component with an Arrow and Text child components
    return (
      <Group x={0} y={0}>
        <Arrow
          points={this.state.points}
          fill={this.state.color}
          stroke={"black"}
          shadowBlur={10}
          onClick={this.handleClick}
        />
        <Text
          text={this.label}
          fontSize={15}
          fill="black"
          x={this.state.points[0] + (this.state.points[2] - this.state.points[0]) / 2}
          y={this.state.points[1] + (this.state.points[3] - this.state.points[1]) / 2}
          width={this.width}
          height={this.height}
          align="center"
        />
      </Group>
    );
  }
}
