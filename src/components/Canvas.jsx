import { Stage, Layer } from "react-konva";
import { useState, useCallback, useEffect } from "react";
import Events from "./Events";
import Relations from "./Relations";
import ContextMenu from "./ContextMenu";

function Canvas({
  sidebarActive,
  testsActive,
  setSidebarActive,
  events,
  setEvents,
  selectedEventId,
  setSelectedEventId,
  relations,
  setRelations,
}) {
  const [contextMenu, setContextMenu] = useState(null);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Function to save current state to history
  const saveToHistory = (currentEvents, currentRelations) => {
    setHistory((prevHistory) => [
      ...prevHistory,
      { events: currentEvents, relations: currentRelations },
    ]);
    setRedoStack([]); // Clear the redo stack whenever a new action is performed
  };

  // Undo function
  const handleUndo = useCallback(() => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setRedoStack((prevRedoStack) => [
        { events, relations },
        ...prevRedoStack,
      ]);
      setEvents(lastState.events);
      setRelations(lastState.relations);
      setHistory((prevHistory) => prevHistory.slice(0, -1));
    }
  }, [history, events, relations]);

  // Redo function
  const handleRedo = useCallback(() => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setHistory((prevHistory) => [...prevHistory, { events, relations }]);
      setEvents(nextState.events);
      setRelations(nextState.relations);
      setRedoStack((prevRedoStack) => prevRedoStack.slice(1));
    }
  }, [redoStack, events, relations]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Delete event, undo, redo, and keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        handleRedo();
      } else if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        if (selectedEventId) {
          const eventToDelete = events.find(
            (event) => event.id === selectedEventId
          );
          deleteEvent(eventToDelete);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleUndo, handleRedo, selectedEventId]);

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
      pending: false,
      executed: false,
      included: true
    };
    saveToHistory(events, relations);
    setEvents([...events, event]);
  }

  function deleteEvent(eventToDelete) {
    saveToHistory(events, relations);
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
      // Left click
      setSelectedEventId(event.id);
      setSidebarActive(true);
      setContextMenu(null);
    }
  }

  function handleRelationClick(e, relation) {
    // create dropdown menu to change relation type or delete relation
    e.evt.preventDefault();
    e.cancelBubble = true;

    const position = {
      x: e.target.getStage().getPointerPosition().x,
      y: e.target.getStage().getPointerPosition().y,
    };
    setContextMenu({ relation: relation, position: position });
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
      saveToHistory(events, relations);
      setRelations([...relations, relation]);
    }
    setContextMenu(null);
  }

  function updateRelation(relation, type) {
    saveToHistory(events, relations);
    const updatedRelations = relations.map((rel) => {
      if (rel.id === relation.id) {
        return { ...rel, type: type };
      }
      return rel;
    });
    setRelations(updatedRelations);
    setContextMenu(null);
  }
  function deleteRelation(relation) {
    saveToHistory(events, relations);
    const updatedRelations = relations.filter((rel) => rel.id !== relation.id);
    setRelations(updatedRelations);
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
  // New function to handle saving to history on drag end
  function handleDragStartEnd() {
    saveToHistory(events, relations); // Save current state to history only on drag end
  }

  const handleStageClick = () => (e) => {
    if (e.target === e.target.getStage()) {
      setSidebarActive(false);
      setSelectedEventId(null);
      setContextMenu(null);
    }
  };

  return (
    <>
      <Stage
        className="canvas"
        width={windowWidth - (sidebarActive || testsActive ? 220 : 35)}
        height={window.innerHeight - 90}
        draggable
        onClick={handleStageClick()}
        onContextMenu={addEvent}
      >
        <Layer>
          <Events
            events={events}
            selectedEventId={selectedEventId}
            updateState={updateState}
            handleEventClick={handleEventClick}
            handleEventRightClick={handleEventRightClick}
            handleDragEnd={handleDragStartEnd}
            handleDragStart={handleDragStartEnd}
          />
          <Relations
            relations={relations}
            handleRelationClick={handleRelationClick}
          />
        </Layer>
      </Stage>
      {contextMenu && (
        <ContextMenu
          contextMenu={contextMenu}
          addRelation={addRelation}
          deleteEvent={deleteEvent}
          udpateRelation={updateRelation}
          deleteRelation={deleteRelation}
        />
      )}
    </>
  );
}

export default Canvas;
