import React from 'react';
import { Arrow, Text } from 'react-konva';
import { RELATION_TYPES, RELATION_COLORS, RELATION_SYMBOLS} from '../RelationTypes';

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
    let side = "";

    if (fromEvent.id === toEvent.id) {
      const selfshift = shift + 25;
      const ringRadius = 30; // Radius of the ring

      const topLeftX = fromX - eventWidth / 2;
      const topLeftY = fromY - eventHeight / 2;

      return {
        points:[
          topLeftX + selfshift,
          topLeftY, // Starting point (top-left corner of the event)
          topLeftX + selfshift,
          topLeftY - ringRadius, // Goes up
          topLeftX + ringRadius + selfshift,
          topLeftY - ringRadius - RELATION_SYMBOLS[type].FromSymbol.offset.height, // Goes left {NOTE} Added offset from symbol to make it look better
          topLeftX + ringRadius + selfshift,
          topLeftY, // Ending point (goes down)
        ],
        side: "bottom", // Normally an arrow that hits the top of a box would originate from the bottom of a box
                        // Since this is a self-relation, we will pass the origin side as bottom even though it originates from the top
      }
    }

    if (angle <= 0.25 * Math.PI && angle >= -0.25 * Math.PI) {
      // Right Side
      fromArrowY = (Math.tan(angle) * eventWidth) / 2 + fromY + shift;
      fromArrowX = fromX + eventWidth / 2;
      toArrowX = toX - eventWidth / 2;
      toArrowY = (Math.tan(angle) * -eventWidth) / 2 + toY + shift;
      side = "right";
    } else if (angle >= 0.25 * Math.PI && angle <= 0.75 * Math.PI) {
      // Bottom Side
      fromArrowX = (Math.cos(angle) * eventHeight) / 2 + fromX - shift;
      fromArrowY = fromY + eventHeight / 2;
      toArrowY = toY - eventHeight / 2;
      toArrowX = (Math.cos(angle) * -eventHeight) / 2 + toX - shift;
      side = "bottom";
    } else if (angle <= -0.25 * Math.PI && angle >= -0.75 * Math.PI) {
      // Top Side
      fromArrowX = (Math.cos(angle) * eventHeight) / 2 + fromX + shift;
      fromArrowY = fromY - eventHeight / 2;
      toArrowX = (Math.cos(angle) * -eventHeight) / 2 + toX + shift;
      toArrowY = toY + eventHeight / 2;
      side = "top";
    } else if (angle >= 0.75 * Math.PI || angle <= -0.75 * Math.PI) {
      // Left Side
      fromArrowX = fromX - eventWidth / 2;
      fromArrowY = (Math.tan(angle) * -eventWidth) / 2 + fromY - shift;
      toArrowX = toX + eventWidth / 2;
      toArrowY = (Math.tan(angle) * eventWidth) / 2 + toY - shift;
      side = "left";
    } else {
      console.warn("Invalid Angle Value in setArrowEndpoints() function.");
    }

    return {
      points: [fromArrowX, fromArrowY, toArrowX, toArrowY],
      side: side,
    };
  }

  return (
    <>
      {relations.map((relation) => {

        const color = RELATION_COLORS[relation.type];
        const offsetDirection = {
          "top": [0, -1],
          "right": [-1, 0],
          "bottom": [0, 1],
          "left": [1, 0],
        };
        var {points , side} = setArrowEndpoints(
          relation.fromEvent,
          relation.toEvent,
          relation.type
        );

        // change these to adjust the position of the symbols in relation to the arrow
        const fromOffsetX = 5;
        const fromOffsetY = 5;
        const toOffsetX = -7.5;
        const toOffsetY = -9;

        const FromSymbolPos = {
          x: points[0]-fromOffsetX*offsetDirection[side][0],
          y: points[1]+fromOffsetY*offsetDirection[side][1],
        };
        const ToSymbolPos = {
          x: points[points.length - 2]-toOffsetX*offsetDirection[side][0],
          y: points[points.length - 1]+toOffsetY*offsetDirection[side][1],
        };

        
        const arrowLengthFactorFrom = 0.8; // Change this to adjust the length of the arrow. Greater value means shorter arrow from origin
        const arrowLengthFactorTo = 1.8; // Change this to adjust the length of the arrow. Greater value means shorter arrow from destination
        points[points.length - 4] = points[points.length - 4] - offsetDirection[side][0] * RELATION_SYMBOLS[relation.type].FromSymbol.offset.width*arrowLengthFactorFrom;
        points[points.length - 3] = points[points.length - 3] + offsetDirection[side][1] * RELATION_SYMBOLS[relation.type].FromSymbol.offset.height*arrowLengthFactorFrom;
        points[points.length - 2] = points[points.length - 2] + offsetDirection[side][0] * RELATION_SYMBOLS[relation.type].ToSymbol.offset.width*arrowLengthFactorTo;
        points[points.length - 1] = points[points.length - 1] - offsetDirection[side][1] * RELATION_SYMBOLS[relation.type].ToSymbol.offset.height*arrowLengthFactorTo;

        return (
          <React.Fragment key={relation.id}>
            <Arrow
              points={points}
              tension={0.6}
              stroke={color}
              fill={color}
              onContextMenu={(e) => handleRelationClick(e, relation)}
            />
            <Text
              x={FromSymbolPos.x}
              y={FromSymbolPos.y}
              text={RELATION_SYMBOLS[relation.type].FromSymbol.symbol}
              align = "center"
              verticalAlign = "middle"
              fontSize={RELATION_SYMBOLS[relation.type].FromSymbol.offset.size}
              fill={color}
              offsetX={RELATION_SYMBOLS[relation.type].FromSymbol.offset.width}
              offsetY={RELATION_SYMBOLS[relation.type].FromSymbol.offset.height}
              
            />
            <Text
              x={ToSymbolPos.x}
              y={ToSymbolPos.y}
              text={RELATION_SYMBOLS[relation.type].ToSymbol.symbol}
              align='center'
              verticalAlign='middle'
              fontSize={RELATION_SYMBOLS[relation.type].ToSymbol.offset.size}
              fill={color}
              offsetX={RELATION_SYMBOLS[relation.type].ToSymbol.offset.width}
              offsetY={RELATION_SYMBOLS[relation.type].ToSymbol.offset.height}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}

export default Relations;
