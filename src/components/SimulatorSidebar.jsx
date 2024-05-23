function SimulatorSidebar({
  events,
  simulatorState,
  simulationValid,
  eventClick,
  clearSimulation,
  addTest,
}) {
  return (
    <div className="simulator-events">
      <h3 className="simulator-event-label-label">Event Labels</h3>
      <div className="event-list">
        {events.map((event, index) => (
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
      </div>
      <button onClick={addTest}>ADD EVENT</button>
      <button style={{ marginTop: "5px" }} onClick={addTest}>
        SAVE AS TEST
      </button>
      <button style={{ marginTop: "5px" }} onClick={clearSimulation}>
        RESET
      </button>
    </div>
  );
}

export default SimulatorSidebar;
