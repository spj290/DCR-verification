import Canvas from "./Canvas";
import RightSidebar from "./RightSidebar";
import { useState } from "react";
import "../styles/grapheditor.css";
import TestsSidebar from "./TestsSidebar";

function GraphEditor({
  events,
  setEvents,
  relations,
  setRelations,
  testsActive,
  tests,
}) {
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
          testsActive={testsActive}
          setSidebarActive={setSidebarActive}
          events={events}
          setEvents={setEvents}
          selectedEventId={selectedEventId}
          setSelectedEventId={setSelectedEventId}
          relations={relations}
          setRelations={setRelations}
        />
      </div>
      <div>
        {testsActive ? (
          <TestsSidebar tests={tests} />
        ) : (
          sidebarActive && (
            <RightSidebar
              selectedEventId={selectedEventId}
              events={events}
              updateEventLabel={updateEventLabel}
            />
          )
        )}
      </div>
    </div>
  );
}

export default GraphEditor;
