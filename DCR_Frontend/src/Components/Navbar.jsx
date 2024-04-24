import React from "react";
import { useState } from "react";
import DropdownMenu from "./DropdownMenu";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMouseEnter = (menu) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const menuOptions = {
    "New": ["New Event", "New Relation"],
    "Save": ["Save as XML", "Save as CSV"],
    "Load": ["Load from Computer", "Load from Database"],
    "Simulate": ["Simulate DCR", "Simulate DCR with Logs"],
    "Tests": ["Run Tests", "Run Performance Tests", "Run Integration Tests"],
    // Add more options for other menus here
  };

  return (
    <nav>
      <h1>DCR Simulator</h1>
      <div className="nav-spacer">
        {Object.keys(menuOptions).map((menu) => (
          <div
            className="menu"
            onMouseEnter={() => handleMouseEnter(menu)}
            onMouseLeave={handleMouseLeave}
          >
            <button className="nav-button">{menu}</button>
            {activeMenu === menu && <DropdownMenu options={menuOptions[menu]} />}
          </div>
        ))}
      </div>
    </nav>
  );
}
