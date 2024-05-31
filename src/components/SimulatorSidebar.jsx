import "../styles/simulatorsidebar.css";

function SimulatorSidebar({
  simulatorEvents,
  customEvents,
  simulatorState,
  simulationValid,
  eventClick,
  customClick,
  clearSimulation,
  addTest,
  addCustomEvent,
}) {
  return (
    <>
      <div className="simulator-events">
        <h3 className="simulator-event-label-label">Event Labels</h3>
        <div className="event-list">
          {simulatorEvents.map((event, index) => (
            <div
              key={index}
              onClick={() => eventClick(event)}
              className={
                !simulationValid
                  ? "neutral"
                  : simulatorState.enabledEvents.has(event.label)
                  ? "enabled"
                  : "disabled"
              }
            >
              {event.label}
            </div>
          ))}
          {customEvents.map((event, index) => (
            <div
              key={index}
              onClick={() => customClick(event)}
              className={!simulationValid ? "neutral" : "disabled"}
            >
              {event.label}
            </div>
          ))}
        </div>
      </div>
      <div className="button-container">
        <button className="default-button-style" onClick={addCustomEvent}>
          ADD EVENT
        </button>
        <button
          className="default-button-style"
          style={{ marginTop: "5px" }}
          onClick={addTest}
        >
          SAVE AS TEST
        </button>
        <button
          className="default-button-style"
          style={{ marginTop: "5px" }}
          onClick={clearSimulation}
        >
          RESET
        </button>
      </div>
    </>
  );
}

export default SimulatorSidebar;
