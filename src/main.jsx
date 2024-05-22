import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const SUPPRESSED_WARNINGS = ['PascalCase', "uppercase"];
const consoleError = console.error;
console.error = function filterWarnings(msg, ...args) {
    if (!SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) {
        consoleError(msg, ...args);
    }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
