import React from "react";

export default function Navbar() {
  return (
    <nav>
      <h1>DCR Simulator</h1>
      <div className="nav-spacer">
        <button className="nav-button">New</button>
        <button className="nav-button">Save</button>
        <button className="nav-button">Load</button>
        <button className="nav-button">Simulate</button>
        <button className="nav-button">Tests</button>
      </div>
    </nav>
  );
}
