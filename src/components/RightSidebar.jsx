import { useState, useEffect } from "react";
import "../styles/rightSidebar.css";

function RightSidebar({
  selectedEventId,
  events,
  updateEventLabel,
  setEvents,
}) {
  const [newLabel, setNewLabel] = useState("");

  useEffect(() => {
    if (selectedEventId) {
      setNewLabel(events.find((event) => event.id === selectedEventId).label);
    }
  }, [selectedEventId]);

  function updateLabel(e) {
    const updatedLabel = e.target.value;
    setNewLabel(updatedLabel);
    updateEventLabel(selectedEventId, updatedLabel);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handlePending() {
    setEvents((events) =>
      events.map((event) =>
        event.id === selectedEventId
          ? {
              ...event,
              marking: { ...event.marking, pending: !event.marking.pending },
            }
          : event
      )
    );
  }

  function handleIncluded() {
    setEvents((events) =>
      events.map((event) =>
        event.id === selectedEventId
          ? {
              ...event,
              marking: { ...event.marking, included: !event.marking.included },
            }
          : event
      )
    );
  }

  function handleExecuted() {
    setEvents((events) =>
      events.map((event) =>
        event.id === selectedEventId
          ? {
              ...event,
              marking: { ...event.marking, executed: !event.marking.executed },
            }
          : event
      )
    );
  }
  function handleKeyDown(e) {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.stopPropagation();
    }
  }

  return (
    <div className="right-sidebar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputField">Label</label>
        <input
          type="text"
          value={newLabel}
          onChange={updateLabel}
          onKeyDown={handleKeyDown}
          id="inputField"
          className="input-field"
        />
      </form>
      <ul className="event-properties">
        <li>
          <label>
            <input
              type="checkbox"
              checked={
                events.find((event) => event.id === selectedEventId)?.marking
                  .pending
              }
              onChange={handlePending}
            />
            Pending
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={
                events.find((event) => event.id === selectedEventId)?.marking
                  .included
              }
              onChange={handleIncluded}
            />
            Included
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={
                events.find((event) => event.id === selectedEventId)?.marking
                  .executed
              }
              onChange={handleExecuted}
            />
            Executed
          </label>
        </li>
      </ul>
    </div>
  );
}

export default RightSidebar;
