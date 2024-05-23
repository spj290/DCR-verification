import Canvas from "./Canvas";
import RightSidebar from "./RightSidebar";
import { useState } from "react";
import "../styles/grapheditor.css";

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
          <div className="right-sidebar">
            <h3>Tests</h3>
            <div className="event-list">
              {tests.map((test) => (
                <div className={test.status ? "enabled" : "disabled"}>
                  {test.name}
                </div>
              ))}
            </div>
          </div>
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
