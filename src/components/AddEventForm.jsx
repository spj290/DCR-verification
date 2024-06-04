import React from "react";

function AddEventForm({ formState, setFormState, handleAddEventSubmit }) {
  function closeForm() {
    setFormState(prevState => ({
      ...prevState,
      showEventForm: false
    }));
  }
  return (
    <>
      {formState.showEventForm && (
        <form onSubmit={handleAddEventSubmit} className="simulator-form">
          <button onClick={closeForm} style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'red' }}>X</button>
          <input
            type="text"
            placeholder="Event Name"
            value={formState.newEventName}
            onChange={(e) =>
              setFormState((prevState) => ({
                ...prevState,
                newEventName: e.target.value,
              }))
            }
            required
          />
          <input
            type="text"
            placeholder="Event Type"
            value={formState.newEventType}
            onChange={(e) =>
              setFormState((prevState) => ({
                ...prevState,
                newEventType: e.target.value,
              }))
            }
            required
          />
          <button type="submit">Add Event</button>
        </form>
      )}
    </>
  );
}

export default AddEventForm;
