function Simulator({ events, relations }) {
  return (
    <div className="app">
      <div></div>
      <div className="right-sidebar">
        <h3>Event Labels</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {events.map((event, index) => (
            <li key={index}>{event.label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Simulator;
