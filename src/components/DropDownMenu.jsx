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
}) {
  function reset() {
    console.log("Resetting events and relations");
    setEvents([]);
    setRelations([]);
  }

  return (
    <div className="dropdown">
      <ul className="dropdown-content">
        <li>
          <button onClick={reset}>Reset</button>
        </li>
        <li>
          <a href="#">Delete</a>
        </li>
        <li>
          <a href="#">Undo</a>
        </li>
        <li>
          <a href="#">Redo</a>
        </li>
      </ul>
    </div>
  );
}

export default DropDownMenu;
