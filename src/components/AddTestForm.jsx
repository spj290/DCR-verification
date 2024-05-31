import React from "react";

function AddTestForm({
  simulatorEvents,
  customEvents,
  formState,
  setFormState,
  handleAddTestSubmit,
  handleContextEventChange,
}) {
  return (
    <>
      {formState.showTestForm && (
        <form onSubmit={handleAddTestSubmit} className="simulator-form">
          <input
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
            +
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
            -
          </label>
          <p>Select context events:</p>
          <div className="event-list context-list">
            {[...simulatorEvents, ...customEvents].map((event) => (
              <div
                className={
                  formState.selectedContextEvents.has(event.label) && "selected"
                }
                onClick={() => handleContextEventChange(event.label)}
              >
                {event.label}
              </div>
            ))}
          </div>
          <button type="submit">Add Test</button>
        </form>
      )}
    </>
  );
}

export default AddTestForm;
