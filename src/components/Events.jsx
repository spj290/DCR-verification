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

  function handleIsPending(event) {
    if (event.pending) {
      return "!"
    } else {
      return ""
    }
  }

  // function handleIsExecuted(event) {
  //   if (event.exe)
  // }

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
            fill="beige"
            stroke={selectedEventId === event.id ? "dodgerBlue" : "grey"}
            strokeWidth={selectedEventId === event.id ? 4 : 2}
            dash={event.included === false ? [5,5] : [1,0]}
          />
          <Text
            text={event.label}
            width={80}
            height={100}
            align="center"
            verticalAlign="middle"
            wrap="word"
          />
          <Text
          text={handleIsPending(event)}
            fontSize={20}
            fontStyle={"bold"}
            offsetX={-5}
            offsetY={-5}
            fill={"blue"}
            />
          <Text
          text={event.executed === true ? "✓" : ""}
            fontSize={20}
            fontStyle={"bold"}
            offsetX={-55}
            offsetY={-5}
            fill={"green"}
            />


          
        </Group>
      ))}
    </>
  );
}

export default Events;
