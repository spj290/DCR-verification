import React from "react";
import "../styles/dropdownmenu.css";

function DropDownMenu({
  events,
  setEvents,
  relations,
  setRelations,
  tests,
  setTests,
  testsActive,
  setTestsActive,
  className,
  onMouseLeave,
}) {
  function reset() {
    console.log("Resetting events and relations");
    setEvents([]);
    setRelations([]);
    setTests([]);
    setTestsActive(false);
    localStorage.clear();
  }

  return (
    <div className={`dropdown ${className}`} onMouseLeave={onMouseLeave}>
      <ul className="dropdown-content">
        <li>
          <button className="default-button-style" onClick={reset}>
            Reset
          </button>
        </li>
        <li>
          <button className="default-button-style">Delete</button>
        </li>
        <li>
          <button className="default-button-style">Undo</button>
        </li>
        <li>
          <button className="default-button-style">Redo</button>
        </li>
      </ul>
    </div>
  );
}

export default DropDownMenu;
