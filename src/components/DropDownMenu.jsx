import React from "react";
import "../styles/dropdownmenu.css";

function DropDownMenu({
  events,
  setEvents,
  relations,
  setRelations,
  className,
  onMouseLeave,
}) {
  function reset() {
    console.log("Resetting events and relations");
    setEvents([]);
    setRelations([]);
  }

  return (
    <div className={`dropdown ${className}`} onMouseLeave={onMouseLeave}>
      <ul className="dropdown-content">
        <li>
          <button onClick={reset}>Reset</button>
        </li>
        <li>
          <button>Delete</button>
        </li>
        <li>
          <button>Undo</button>
        </li>
        <li>
          <button>Redo</button>
        </li>
      </ul>
    </div>
  );
}

export default DropDownMenu;
