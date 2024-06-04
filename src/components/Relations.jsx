import { Arrow } from "react-konva";
import { RELATION_TYPES } from "../RelationTypes";

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
    // let fromArrowX = fromX + (Math.cos(angle) * eventWidth) / 2;
    // let fromArrowY = fromY + (Math.sin(angle) * eventHeight) / 2;
    // let toArrowX = toX - (Math.cos(angle) * eventWidth) / 2;
    // let toArrowY = toY - (Math.sin(angle) * eventHeight) / 2;

    let fromArrowX = fromX; //+ Math.sin(angle) / (eventHeight / 2);
    let fromArrowY = fromY;
    let toArrowX = toX;
    let toArrowY = toY;
    // console.log(angle);

    if (angle <= 0.25 * Math.PI && angle >= -0.25 * Math.PI) {
      // Right Side
      // console.log("Right Side");
      fromArrowY = (Math.tan(angle) * eventWidth) / 2 + fromY + shift;
      fromArrowX = fromX + eventWidth / 2;
      toArrowX = toX - eventWidth / 2;
      toArrowY = (Math.tan(angle) * -eventWidth) / 2 + toY + shift;
    } else if (angle >= 0.25 * Math.PI && angle <= 0.75 * Math.PI) {
      // Bottom Side
      fromArrowX = (Math.cos(angle) * eventHeight) / 2 + fromX - shift;
      fromArrowY = fromY + eventHeight / 2;
      toArrowY = toY - eventHeight / 2;
      toArrowX = (Math.cos(angle) * -eventHeight) / 2 + toX - shift;
    } else if (angle <= -0.25 * Math.PI && angle >= -0.75 * Math.PI) {
      // Top Side
      fromArrowX = (Math.cos(angle) * eventHeight) / 2 + fromX + shift;
      fromArrowY = fromY - eventHeight / 2;
      toArrowX = (Math.cos(angle) * -eventHeight) / 2 + toX + shift;
      toArrowY = toY + eventHeight / 2;
    } else if (angle >= 0.75 * Math.PI || angle <= -0.75 * Math.PI) {
      // Left Side
      fromArrowX = fromX - eventWidth / 2;
      fromArrowY = (Math.tan(angle) * -eventWidth) / 2 + fromY - shift;
      toArrowX = toX + eventWidth / 2;
      toArrowY = (Math.tan(angle) * eventWidth) / 2 + toY - shift;
    } else {
      console.warn("Invalid Angle Value in setArrowEndpoints() function.");
    }

    return [fromArrowX, fromArrowY, toArrowX, toArrowY];
  }

  return (
    <>
      {relations.map((relation) => {
        const color =
          relation.type === RELATION_TYPES.CONDITION
            ? "orange"
            : relation.type === RELATION_TYPES.RESPONSE
            ? "blue"
            : relation.type === RELATION_TYPES.INCLUDE
            ? "green"
            : relation.type === RELATION_TYPES.MILESTONE
            ? "purple"
            : "red";

        return (
          <Arrow
            key={relation.id}
            points={setArrowEndpoints(
              relation.fromEvent,
              relation.toEvent,
              relation.type
            )}
            tension={0.6}
            stroke={color}
            fill={color}
            // onClick={(e) => handleRelationClick(e, relation)}
            onContextMenu={(e) => handleRelationClick(e, relation)}
          />
        );
      })}
    </>
  );
}

export default Relations;
