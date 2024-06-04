import React from "react";

function AddEventForm({ formState, setFormState, handleAddEventSubmit }) {
  function closeForm() {
    setFormState((prevState) => ({
      ...prevState,
      showEventForm: false,
    }));
  }
  return (
    <>
      {formState.showEventForm && (
        <form onSubmit={handleAddEventSubmit} className="simulator-form">
          <button
            onClick={closeForm}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "red",
            }}
          >
            X
          </button>
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
          <label>
            <input
              type="checkbox"
              checked={formState.marking.pending}
              onChange={() =>
                setFormState((prevState) => ({
                  ...prevState,
                  marking: {
                    ...prevState.marking,
                    pending: !prevState.marking.pending,
                  },
                }))
              }
            />
            Pending
          </label>
          <label>
            <input
              type="checkbox"
              checked={formState.marking.included}
              onChange={() =>
                setFormState((prevState) => ({
                  ...prevState,
                  marking: {
                    ...prevState.marking,
                    included: !prevState.marking.included,
                  },
                }))
              }
            />
            Included
          </label>
          <label>
            <input
              type="checkbox"
              checked={formState.marking.executed}
              onChange={() =>
                setFormState((prevState) => ({
                  ...prevState,
                  marking: {
                    ...prevState.marking,
                    executed: !prevState.marking.executed,
                  },
                }))
              }
            />
            Executed
          </label>
          <button type="submit">Add Event</button>
        </form>
      )}
    </>
  );
}

export default AddEventForm;
