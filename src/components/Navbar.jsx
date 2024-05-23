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
      <button
        className="links"
        onMouseEnter={() => setOpenDropdown((prev) => !prev)}
      >
        OPTIONS
      </button>
      <div className="test-status">
        <span>Tests Passed: </span>
        <div
          className="test-passed"
          style={{
            backgroundColor: `${
              tests.every((test) => test.status) ? "green" : "red"
            }`,
          }}
        ></div>
      </div>

      {openDropdown && (
        <DropDownMenu onMouseLeave={() => setOpenDropdown((prev) => !prev)} />
      )}
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
