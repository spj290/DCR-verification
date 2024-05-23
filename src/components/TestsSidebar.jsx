function TestsSidebar({ tests }) {
  return (
    <div className="right-sidebar">
      <h3>Tests</h3>
      <div className="event-list">
        {tests.map((test) => (
          <div className={test.status ? "enabled" : "disabled"}>
            {test.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestsSidebar;
