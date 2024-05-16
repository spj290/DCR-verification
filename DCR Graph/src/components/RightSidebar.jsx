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

  return (
    <form className="right-sidebar">
      <label htmlFor="inputField">Label</label>
      <input
        type="text"
        value={newLabel}
        onChange={updateLabel}
        id="inputField"
        className="input-field"
      />
    </form>
  );
}

export default RightSidebar;
