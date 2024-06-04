import { Rect, Text, Group } from "react-konva";

function Events({
  events,
  selectedEventId,
  updateState,
  handleEventClick,
  handleEventRightClick,
  handleDragEnd,
  handleDragStart,
}) {
  return (
    <>
      {events.map((event) => (
        <Group
          key={event.id}
          x={event.position.x}
          y={event.position.y}
          draggable
          onDragMove={(e) => updateState(e, event)}
          onClick={(e) => handleEventClick(e, event)}
          onContextMenu={(e) => handleEventRightClick(e, event)}
          onDragStart={(e) => handleDragStart(e, event)}
          onDragEnd={(e) => handleDragEnd(e, event)}
        >
          <Rect
            width={80}
            height={100}
            fill="#f9f9f9"
            stroke={selectedEventId === event.id ? "lightblue" : "lightgrey"}
            strokeWidth={selectedEventId === event.id ? 3 : 2}
            dash={event.marking.included ? [1,0] : [5,5]}
            cornerRadius={15}
            shadowBlur={2}
            shadowOffsetX={2}
            shadowOffsetY={2}
            shadowOpacity={0.2}
          />
          <Text
            text={event.label}
            width={80}
            height={100}
            align="center"
            verticalAlign="middle"
            wrap="word"
            fontSize={16}
            fontFamily="sans-serif"
          />
          <Text
            text={event.marking.pending ? "!" : ""}
            fontSize={20}
            fontStyle="bold"
            fill="blue"
            offsetX={-5}
            offsetY={-5}
          />
          <Text
            text={event.marking.executed ? "✓" : ""}
            fontSize={20}
            fontStyle="bold"
            fill="green"
            offsetX={-55}
            offsetY={-5}
          />
        </Group>
      ))}
    </>
  );
}

export default Events;
