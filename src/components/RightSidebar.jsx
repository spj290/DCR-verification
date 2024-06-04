import { useState, useEffect } from "react";
import "../styles/rightSidebar.css";

function RightSidebar({ selectedEventId, events, updateEventLabel }) {
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

  function handleKeyDown(e) {
    if (e.key === 'Backspace' || e.key === 'Delete') {
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
    </div>
  );
}

export default RightSidebar;
