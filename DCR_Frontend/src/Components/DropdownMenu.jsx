import React from "react";

export default function DropdownMenu({ options }) {
    return (
      <div className="dropdown-menu">
        {options.map((option, index) => (
          <button key={index} className="dropdown-button">{option}</button>
        ))}
      </div>
    );
  }