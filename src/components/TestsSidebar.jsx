import React from "react";
import { useState, useEffect } from "react";
import "../styles/testsidebar.css";
import TestInfoWindow from "./TestInfoWindow";

function TestsSidebar({ tests, setTests }) {
  const [formState, setFormState] = useState({
    // showEventForm: false,
    // newEventName: "",
    // newEventType: "",
    showTestForm: false,
    newTestName: "",
    newPolarity: "+",
    selectedContextEvents: new Set(),
  });

  function  testClick(test) {
    setFormState({showTestForm: !formState.showTestForm, newTestName: test.name, newPolarity: test.polarity, selectedContextEvents: test.context})
  }

  function deleteTest(testName) {
    setFormState((prevState) => ({
        ...prevState,
        showTestForm: false,
      }));
    const updatedTests = tests.filter(
      (test) => test.name !== testName
    );
    // setTests(updatedTests)
    setTests({})
    // const index = tests.indexOf(test);
    // if (index > -1) {
    //   tests.splice(index, 1); 
    // }
  }

  return (
    <div className="test-sidebar">
      <h3 className="test-sidebar-text">Tests</h3>
      <div className="event-list">
        {tests.map((test) => (
          <div
            onClick={() => testClick(test)}
            className={test.status ? "enabled" : "disabled"}>
            {test.name}
          </div>
        ))}
      </div>

      <TestInfoWindow
        formState={formState}
        setFormState={setFormState}
        deleteTest={deleteTest}
        setTests={setTests}
      />


      {/* <div className="event-list">
          {simulatorEvents.map((event, index) => (
            <div
              key={index}
              onClick={() => eventClick(event)}
              className={
                !simulationValid
                  ? "neutral"
                  : simulatorState.enabledEvents.has(event.label)
                  ? "enabled"
                  : "disabled"
              }
            >
              {event.label}
            </div> */}

    </div>
  );
}


export default TestsSidebar;
