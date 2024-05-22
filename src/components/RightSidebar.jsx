import { useState, useEffect } from "react";

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

  return (
    <div className="right-sidebar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputField">Label</label>
        <input
          type="text"
          value={newLabel}
          onChange={updateLabel}
          id="inputField"
          className="input-field"
        />
      </form>
    </div>
  );
}

export default RightSidebar;
