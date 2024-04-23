import React from "react";
import { Arrow, Text, Group } from "react-konva";

class Relation extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.relationId;
    this.fromPos = props.fromEvent.props.pos;
    this.toPos = props.toEvent.props.pos;
    this.fromWidth = props.fromEvent.props.size[0];
    this.toWidth = props.toEvent.props.size[0];
    this.fromHeight = props.fromEvent.props.size[1];
    this.toHeight = props.toEvent.props.size[1];
    this.points = [
      this.fromPos[0] + this.fromWidth,
      this.fromPos[1] + this.fromHeight / 2,
      this.toPos[0],
      this.toPos[1] + this.toHeight / 2,
    ];
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
  state = {
    color: "red",
  };
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor(), //TODO replace with code for popup menu
    });
  };
  render() {
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
export default Relation;
