import { Stage, Layer } from "react-konva";
import { useState } from "react";
import Events from "./Events";
import Relations from "./Relations";
import ContextMenu from "./ContextMenu";

function Canvas({
  sidebarActive,
  setSidebarActive,
  events,
  setEvents,
  selectedEventId,
  setSelectedEventId,
  relations,
  setRelations,
}) {
  const [contextMenu, setContextMenu] = useState(null);

  function addEvent(e) {
    e.evt.preventDefault();

    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const canvasPosition = stage.getAbsolutePosition();

    const position = {
      x: pointerPosition.x - canvasPosition.x,
      y: pointerPosition.y - canvasPosition.y,
    };

    const event = {
      position: position,
      id: crypto.randomUUID(),
      label: `Event${events.length + 1}`,
    };
    setEvents([...events, event]);
  }

  function deleteEvent(eventToDelete) {
    const updatedEvents = events.filter(
      (event) => event.id !== eventToDelete.id
    );
    setEvents(updatedEvents);

    const updatedRelations = relations.filter(
      (relation) =>
        relation.fromEvent.id !== eventToDelete.id &&
        relation.toEvent.id !== eventToDelete.id
    );
    setRelations(updatedRelations);

    setContextMenu(null);

    if (selectedEventId === eventToDelete.id) {
      setSelectedEventId(null);
    }
  }

  function handleEventClick(e, event) {
    if (e.evt.button === 0) {
      if (selectedEventId === event.id) {
        setSidebarActive(false);
        setSelectedEventId(null);
      } else {
        setSidebarActive(true);
        setSelectedEventId(event.id);
      }
    }
  }

  function handleEventRightClick(e, event) {
    e.evt.preventDefault();
    e.cancelBubble = true;

    const position = {
      x: e.target.getStage().getPointerPosition().x,
      y: e.target.getStage().getPointerPosition().y,
    };

    setContextMenu({ event: event, position: position });
  }

  function addRelation(event, type) {
    if (selectedEventId !== null) {
      const selectedEvent = events.find(
        (event) => event.id === selectedEventId
      );

      const relation = {
        fromEvent: selectedEvent,
        toEvent: event,
        type: type,
        id: crypto.randomUUID(),
      };

      setRelations([...relations, relation]);
    }
    setContextMenu(null);
  }

  function updateState(e, dragEvent) {
    const updatedEvents = events.map((event) => {
      if (event.id === dragEvent.id) {
        const updatedEvent = {
          ...event,
          position: {
            x: e.target.x(),
            y: e.target.y(),
          },
        };
        if (event.id === contextMenu?.event.id) {
          setContextMenu({ ...contextMenu, event: updatedEvent });
        }
        return updatedEvent;
      }
      return event;
    });
    const updatedRelations = relations.map((relation) => {
      const updatePosition = (targetEvent) => {
        if (targetEvent.id === dragEvent.id) {
          return {
            ...targetEvent,
            position: {
              x: e.target.x(),
              y: e.target.y(),
            },
          };
        }
        return targetEvent;
      };
      return {
        ...relation,
        fromEvent: updatePosition(relation.fromEvent),
        toEvent: updatePosition(relation.toEvent),
      };
    });
    setEvents(updatedEvents);
    setRelations(updatedRelations);
  }

  return (
    <>
      <Stage
        className="canvas"
        width={window.innerWidth * (sidebarActive ? 0.9 : 1)}
        height={window.innerHeight - 40}
        draggable
        onContextMenu={addEvent}
      >
        <Layer>
          <Events
            events={events}
            selectedEventId={selectedEventId}
            updateState={updateState}
            handleEventClick={handleEventClick}
            handleEventRightClick={handleEventRightClick}
          />
          <Relations relations={relations} />
        </Layer>
      </Stage>
      {contextMenu && (
        <ContextMenu
          contextMenu={contextMenu}
          addRelation={addRelation}
          deleteEvent={deleteEvent}
        />
      )}
    </>
  );
}

export default Canvas;
