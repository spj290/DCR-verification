import { Arrow } from "react-konva";
import { RELATION_TYPES } from "../RelationTypes";

function Relations({ relations, setArrowEndpoints }) {
  function setArrowEndpoints(fromEvent, toEvent, type) {
    const shift =
      type === RELATION_TYPES.CONDITION
        ? 0
        : type === RELATION_TYPES.RESPONSE
        ? -5
        : type === RELATION_TYPES.INCLUDE
        ? 5
        : type === RELATION_TYPES.MILESTONE
        ? -10
        : 10;

    const eventWidth = 80;
    const eventHeight = 100;

    const fromX = fromEvent.position.x + eventWidth / 2;
    const fromY = fromEvent.position.y + eventHeight / 2;

    const toX = toEvent.position.x + eventWidth / 2;
    const toY = toEvent.position.y + eventHeight / 2;

    const angle = Math.atan2(toY - fromY, toX - fromX);

    const fromArrowX = fromX + (Math.cos(angle) * eventWidth) / 2;
    const fromArrowY = fromY + (Math.sin(angle) * eventHeight) / 2;
    const toArrowX = toX - (Math.cos(angle) * eventWidth) / 2;
    const toArrowY = toY - (Math.sin(angle) * eventHeight) / 2;
    if (Math.abs(fromArrowX - toArrowX) < Math.abs(fromArrowY - toArrowY))
      return [fromArrowX + shift, fromArrowY, toArrowX + shift, toArrowY];
    return [fromArrowX, fromArrowY + shift, toArrowX, toArrowY + shift];
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
            stroke={color}
            fill={color}
          />
        );
      })}
    </>
  );
}

export default Relations;
