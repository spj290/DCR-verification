import React from "react";
import Draggable from "react-draggable";
import "../styles/addeventform.css";


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
        <Draggable>
        <form onSubmit={handleAddEventSubmit} className="simulator-form-2">
          <button
            className="close--button"
            onClick={closeForm}
          >
            <span class="close-icon">&times;</span>
          </button>
          <input
            className="input--field"
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
              className="input-field--checkbox"
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
          <button className="button-submit" type="submit">Add Event</button>
        </form>
      </Draggable>
      )}
    </>
  );
}

export default AddEventForm;
