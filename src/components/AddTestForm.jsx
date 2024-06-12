import React from "react";
import Draggable from "react-draggable";
import "../styles/addeventform.css";

function AddTestForm({
  simulatorEvents,
  customEvents,
  formState,
  setFormState,
  handleAddTestSubmit,
  handleContextEventChange,
}) {
  function closeForm() {
    setFormState((prevState) => ({
      ...prevState,
      showTestForm: false,
    }));
  }

  return (
    <>
      {formState.showTestForm && (
        <Draggable>
          <form onSubmit={handleAddTestSubmit} className="simulator-form">
            <button onClick={closeForm} className="close--button">
              <span className="close-icon">&times;</span>
            </button>
            <input
              className="input--field"
              type="text"
              placeholder="Test Name"
              value={formState.newTestName}
              onChange={(e) =>
                setFormState((prevState) => ({
                  ...prevState,
                  newTestName: e.target.value,
                }))
              }
              required
            />
            <label>
              <input
                className="input-field--checkbox"
                type="radio"
                name="polarity"
                value="+"
                checked={formState.newPolarity === "+"}
                onChange={(e) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    newPolarity: e.target.value,
                  }))
                }
              />
              <span>+</span>
            </label>
            <label>
              <input
                type="radio"
                name="polarity"
                value="-"
                checked={formState.newPolarity === "-"}
                onChange={(e) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    newPolarity: e.target.value,
                  }))
                }
              />
              <span>-</span>
            </label>
            <p>Select context events:</p>
            <div className="event-list context-list">
              {[...simulatorEvents, ...customEvents].map((event) => (
                <div
                  className={
                    formState.selectedContextEvents.has(event.label) &&
                    "selected"
                  }
                  onClick={() => handleContextEventChange(event.label)}
                >
                  {event.label}
                </div>
              ))}
            </div>
            <button type="submit" className="button-submit">Add Test</button>
          </form>
        </Draggable>
      )}
    </>
  );
}

export default AddTestForm;
