import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import FileManager from "./FileManager";
import DropDownMenu from "./DropDownMenu";
import "../styles/navbar.css";
function Navbar({
  events,
  relations,
  setEvents,
  setRelations,
  tests,
  setTests,
  testsActive,
  setTestsActive,
}) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <nav className="navbar">
      <h1 className="navbar-title">DCR-Tool</h1>
      <Link className="links" to="/">
        EDITOR
      </Link>
      <Link className="links" to="/simulator">
        SIMULATOR
      </Link>
      <div className="links" onClick={() => setTestsActive(!testsActive)}>
        TESTS
      </div>
      <div
        className="options-menu"
        onMouseEnter={() => setOpenDropdown(true)}
        onMouseLeave={() => setOpenDropdown(false)}
      >
        <button className="options-button">OPTIONS</button>
        {openDropdown && (
          <DropDownMenu
            className={openDropdown ? "dropdown-open" : "dropdown-close"}
            setEvents={setEvents}
            setRelations={setRelations}
          />
        )}
      </div>

      <div className="test-status">
        <span>Tests Passed: </span>
        <div
          className="test-passed"
          style={{
            backgroundColor: `${
              tests.every((test) => test.status) ? "lightgreen" : "red"
            }`,
            boxShadow: `0 0 5px 1px ${
              tests.every((test) => test.status) ? "lightgreen" : "red"
            }`,
          }}
        ></div>
      </div>

      <FileManager
        events={events}
        relations={relations}
        setEvents={setEvents}
        setRelations={setRelations}
      />
    </nav>
  );
}

export default Navbar;
