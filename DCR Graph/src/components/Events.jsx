import { Rect, Text, Group } from "react-konva";

function Events({
  events,
  selectedEventId,
  updateState,
  handleEventClick,
  handleEventRightClick,
}) {
  return (
    <>
      {events.map((event) => (
        <Group
          x={event.position.x}
          y={event.position.y}
          draggable
          onDragMove={(e) => updateState(e, event)}
          onClick={(e) => handleEventClick(e, event)}
          onContextMenu={(e) => handleEventRightClick(e, event)}
        >
          <Rect
            width={80}
            height={100}
            fill="beige"
            stroke={selectedEventId === event.id ? "dodgerBlue" : "grey"}
            strokeWidth={selectedEventId === event.id ? 4 : 2}
          />
          <Text
            text={event.label}
            width={80}
            height={100}
            align="center"
            verticalAlign="middle"
            wrap="word"
          />
        </Group>
      ))}
    </>
  );
}

export default Events;
