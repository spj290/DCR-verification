import Canvas from "./Canvas";
import RightSidebar from "./RightSidebar";
import { useState } from "react";
import "../styles/grapheditor.css";

function GraphEditor({ events, setEvents, relations, setRelations }) {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  function updateEventLabel(eventId, newLabel) {
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        return { ...event, label: newLabel };
      }
      return event;
    });
    setEvents(updatedEvents);
  }

  return (
    <div className="app">
      <div className="canvas-container">
        <Canvas
          sidebarActive={sidebarActive}
          setSidebarActive={setSidebarActive}
          events={events}
          setEvents={setEvents}
          selectedEventId={selectedEventId}
          setSelectedEventId={setSelectedEventId}
          relations={relations}
          setRelations={setRelations}
        />
      </div>
      <div className={`sidebar ${sidebarActive ? "active" : ""}`}>
        {sidebarActive && (
          <RightSidebar
            selectedEventId={selectedEventId}
            events={events}
            updateEventLabel={updateEventLabel}
          />
        )}
      </div>
    </div>
  );
}

export default GraphEditor;
