import React from "react";
import "../styles/testsidebar.css";

function TestsSidebar({ tests }) {
  return (
    <div className="test-sidebar">
      <h3 className="test-sidebar-text">Tests</h3>
      <div className="event-list test-event-list">
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
