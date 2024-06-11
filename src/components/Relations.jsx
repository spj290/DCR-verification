import React from 'react';
import { Arrow, Text } from 'react-konva';
import { RELATION_TYPES } from '../RelationTypes';

function Relations({ relations, setArrowEndpoints, handleRelationClick }) {
  function setArrowEndpoints(fromEvent, toEvent, type) {
    const shift =
      type === RELATION_TYPES.CONDITION
        ? 0
        : type === RELATION_TYPES.RESPONSE
        ? -10
        : type === RELATION_TYPES.INCLUDE
        ? 10
        : type === RELATION_TYPES.MILESTONE
        ? -20
        : 20;

    const eventWidth = 80;
    const eventHeight = 100;

    const fromX = fromEvent.position.x + eventWidth / 2;
    const fromY = fromEvent.position.y + eventHeight / 2;

    const toX = toEvent.position.x + eventWidth / 2;
    const toY = toEvent.position.y + eventHeight / 2;

    if (fromEvent.id === toEvent.id) {
      const selfshift = shift + 25;
      const ringRadius = 30; // Radius of the ring

      const topLeftX = fromX - eventWidth / 2;
      const topLeftY = fromY - eventHeight / 2;

      return [
        topLeftX + selfshift,
        topLeftY, // Starting point (top-left corner of the event)
        topLeftX + selfshift,
        topLeftY - ringRadius, // Goes up
        topLeftX + ringRadius + selfshift,
        topLeftY - ringRadius, // Goes right
        topLeftX + ringRadius + selfshift,
        topLeftY, // Ending point (goes down)
      ];
    }

    const angle =
      shift === 0
        ? Math.atan2(toY - fromY, toX - fromX)
        : shift === 10
        ? Math.atan2(toY - fromY, toX - fromX)
        : shift === -10
        ? Math.atan2(toY - fromY, toX - fromX)
        : shift === -20
        ? Math.atan2(toY - fromY, toX - fromX)
        : Math.atan2(toY - fromY, toX - fromX);

    let fromArrowX = fromX;
    let fromArrowY = fromY;
    let toArrowX = toX;
    let toArrowY = toY;
    let side = 1;

    if (angle <= 0.25 * Math.PI && angle >= -0.25 * Math.PI) {
      // Right Side
      fromArrowY = (Math.tan(angle) * eventWidth) / 2 + fromY + shift;
      fromArrowX = fromX + eventWidth / 2;
      toArrowX = toX - eventWidth / 2;
      toArrowY = (Math.tan(angle) * -eventWidth) / 2 + toY + shift;
      side = 3;
    } else if (angle >= 0.25 * Math.PI && angle <= 0.75 * Math.PI) {
      // Bottom Side
      fromArrowX = (Math.cos(angle) * eventHeight) / 2 + fromX - shift;
      fromArrowY = fromY + eventHeight / 2;
      toArrowY = toY - eventHeight / 2;
      toArrowX = (Math.cos(angle) * -eventHeight) / 2 + toX - shift;
      side = 2;
    } else if (angle <= -0.25 * Math.PI && angle >= -0.75 * Math.PI) {
      // Top Side
      fromArrowX = (Math.cos(angle) * eventHeight) / 2 + fromX + shift;
      fromArrowY = fromY - eventHeight / 2;
      toArrowX = (Math.cos(angle) * -eventHeight) / 2 + toX + shift;
      toArrowY = toY + eventHeight / 2;
      side = 1;
    } else if (angle >= 0.75 * Math.PI || angle <= -0.75 * Math.PI) {
      // Left Side
      fromArrowX = fromX - eventWidth / 2;
      fromArrowY = (Math.tan(angle) * -eventWidth) / 2 + fromY - shift;
      toArrowX = toX + eventWidth / 2;
      toArrowY = (Math.tan(angle) * eventWidth) / 2 + toY - shift;
      side = 4;
    } else {
      console.warn("Invalid Angle Value in setArrowEndpoints() function.");
    }

    return [fromArrowX, fromArrowY, toArrowX, toArrowY,side];
  }

  return (
    <>
      {relations.map((relation) => {
        const color =
          relation.type === RELATION_TYPES.CONDITION
            ? 'orange'
            : relation.type === RELATION_TYPES.RESPONSE
            ? 'blue'
            : relation.type === RELATION_TYPES.INCLUDE
            ? 'green'
            : relation.type === RELATION_TYPES.MILESTONE
            ? 'purple'
            : 'red';
        const ballLogic =
        [[[0,0,-16,-24],[0,0,-16,-14],[0,0,-11,-19],[0,0,-19,-19]],[[0,-9,0,0],[0,9,0,0],[9,0,0,0],[-7,0,0,0]]]
        const characterAndOffset = //[[firstchar,secondchar],[offsets for symbols],[offsets for arrows]]
        relation.type === RELATION_TYPES.CONDITION
        ? [["⠀",'◆'],[[-18,-10,0,0],[-18,-28,0,0],[-26,-21,0,0],[-9,-21,0,0]],[[0,0,0,20],[0,0,0,-16],[0,0,-16,0],[0,0,18,0]]]
        : relation.type === RELATION_TYPES.RESPONSE
        ? [["●",'⠀'],[[-21,-8,ballLogic[0][0][2],ballLogic[0][0][3]],[-21,-27,ballLogic[0][1][2],ballLogic[0][1][3]],[-28,-19,ballLogic[0][2][2],ballLogic[0][2][3]],[-9,-19,ballLogic[0][3][2],ballLogic[0][3][3]]],ballLogic[1]]
        : relation.type === RELATION_TYPES.INCLUDE
        ? [["●",'＋'],[[-21,-8,-16,-24],[-21,-27,-16,-14],[-28,-19,-11,-19],[-9,-19,-19,-19]],[[ballLogic[1][0][0],ballLogic[1][0][1],0,20],[ballLogic[1][1][0],ballLogic[1][1][1],0,-18],[ballLogic[1][2][0],ballLogic[1][2][1],-16,0],[ballLogic[1][3][0],ballLogic[1][3][1],20,0]]]
        : relation.type === RELATION_TYPES.MILESTONE
        ? [["⠀",'◇'],[[-18,-9,0,0],[-18,-28,0,0],[-26,-20,0,0],[-7,-21,0,0]],[[0,0,0,20],[0,0,0,-16],[0,0,-16,0],[0,0,20,0]]]
        : [["●",'%'],[[-19,-6,ballLogic[0][0][2],ballLogic[0][0][3]],[-19,-28,ballLogic[0][1][2],ballLogic[0][1][3]],[-28,-18,ballLogic[0][2][2],ballLogic[0][2][3]],[-7,-19,ballLogic[0][3][2],ballLogic[0][3][3]]],[[ballLogic[1][0][0],ballLogic[1][0][1],0,20],[ballLogic[1][1][0],ballLogic[1][1][1],0,-18],[ballLogic[1][2][0],ballLogic[1][2][1],-19,0],[ballLogic[1][3][0],ballLogic[1][3][1],22,0]]];

        const points2 = setArrowEndpoints(
          relation.fromEvent,
          relation.toEvent,
          relation.type
        );//.slice(0,4)
        const points = points2.slice(0,4);
        const side = points2.slice(4,5)[0]-1;
        const arrowvariables = points.map(function(v,i){
          return v+characterAndOffset[2][side][i]
        })

        const startX = points[points.length - 4];
        const startY = points[points.length - 3];
        const endX = points[points.length - 2];
        const endY = points[points.length - 1];

        return (
          <React.Fragment key={relation.id}>
            <Arrow
              points={arrowvariables}
              tension={0.6}
              stroke={color}
              fill={color}
              onContextMenu={(e) => handleRelationClick(e, relation)}
            />
            <Text
              x={endX+characterAndOffset[1][side][0]}
              y={endY+characterAndOffset[1][side][1]}
              text={characterAndOffset[0][1]} // Replace with your desired character
              fontSize={20}
              fill={color}
              offsetX={-10}
              offsetY={-10}
            />
            <Text
              x={startX+characterAndOffset[1][side][2]}
              y={startY+characterAndOffset[1][side][3]}
              text={characterAndOffset[0][0]} // Replace with your desired character
              fontSize={20}
              fill={color}
              offsetX={-10}
              offsetY={-10}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}

export default Relations;
