import { useState } from "react";
import {
  execute,
  getEnabled,
  isAccepting,
} from "../../BitDCRAlign-main/src/bitAlign";
import {
  bitDCRtoLabelDCR,
  bitGraphToGraphPP,
  dcrToBitDCR,
  bitToRegularDCR,
} from "../../BitDCRAlign-main/src/utility";
import { convertToDCRGraph } from "../utils";
import TestsSidebar from "./TestsSidebar";
import SimulatorSidebar from "./SimulatorSidebar";
import AddEventForm from "./AddEventForm";
import AddTestForm from "./AddTestForm";

function Simulator({ events, relations, tests, setTests, testsActive }) {
  const [simulatorEvents, setSimulatorEvents] = useState(events);
  const [customEvents, setCustomEvents] = useState([]);
  const [trace, setTrace] = useState([]);
  const [simulatorState, setSimulatorState] = useState({
    currDCRGraph: convertToDCRGraph(events, relations),
    enabledEvents:
      events.length == 0
        ? new Set()
        : getEnabled(dcrToBitDCR(convertToDCRGraph(events, relations))),
  });
  const [simulationValid, setsimulationValid] = useState(true);
  const [acceptingState, setAcceptingState] = useState(
    simulatorState.currDCRGraph.events.size === 0
      ? true
      : isAccepting(dcrToBitDCR(simulatorState.currDCRGraph))
  );

  const [formState, setFormState] = useState({
    showEventForm: false,
    newEventName: "",
    marking: { pending: false, included: true, executed: false },
    showTestForm: false,
    newTestName: "",
    newPolarity: "+",
    selectedContextEvents: new Set(),
  });

  function eventClick(event) {
    setTrace([...trace, event.label]);
    if (!simulationValid) return;
    if (!simulatorState.enabledEvents.has(event.label)) {
      setAcceptingState(false);
      setsimulationValid(false);
      return;
    }
    const graph = bitGraphToGraphPP(
      bitDCRtoLabelDCR(dcrToBitDCR(simulatorState.currDCRGraph))
    );
    execute(event.label, graph);
    const {
      labels,
      labelMap,
      labelMapInv,
      conditions,
      includesFor,
      excludesFor,
      ...DCRGraph
    } = graph;
    setAcceptingState(isAccepting(DCRGraph));
    setSimulatorState({
      currDCRGraph: bitToRegularDCR(DCRGraph),
      enabledEvents: getEnabled(DCRGraph),
    });
  }

  function customClick(event) {
    setTrace([...trace, event.label]);
    setsimulationValid(false);
  }

  function clearSimulation() {
    setSimulatorState({
      currDCRGraph: convertToDCRGraph(events, relations),
      enabledEvents:
        events.length == 0
          ? new Set()
          : getEnabled(dcrToBitDCR(convertToDCRGraph(events, relations))),
    });
    setAcceptingState(
      events.length == 0
        ? true
        : isAccepting(dcrToBitDCR(simulatorState.currDCRGraph))
    );
    setCustomEvents([]);
    setsimulationValid(true);
    setTrace([]);
  }

  function addTest() {
    setFormState((prevState) => ({ ...prevState, showTestForm: true }));
  }

  function handleAddTestSubmit() {
    setTests([
      ...tests,
      {
        name: formState.newTestName,
        polarity: formState.newPolarity,
        trace: trace,
        context: formState.selectedContextEvents,
        status: true,
      },
    ]);
    setFormState((prevState) => ({
      ...prevState,
      showTestForm: false,
      newTestName: "",
      newPolarity: "+",
    }));
  }

  function addCustomEvent() {
    setFormState((prevState) => ({ ...prevState, showEventForm: true }));
  }

  function handleAddEventSubmit(e) {
    e.preventDefault();
    const newEvent = {
      label: formState.newEventName,
      type: formState.newEventType,
    };
    setCustomEvents([...customEvents, newEvent]);
    setFormState((prevState) => ({
      ...prevState,
      showEventForm: false,
      newEventName: "",
      newEventType: "",
    }));
  }

  function handleContextEventChange(eventLabel) {
    setFormState((prevState) => {
      const selectedContextEvents = new Set(prevState.selectedContextEvents);
      if (selectedContextEvents.has(eventLabel)) {
        selectedContextEvents.delete(eventLabel);
      } else {
        selectedContextEvents.add(eventLabel);
      }
      return { ...prevState, selectedContextEvents };
    });
  }

  return (
    <div className="simulator">
      <div
        className="simulator-canvas"
        style={{ border: `2px solid ${acceptingState ? "#90EE90" : "red"}` }}
      >
        {trace.map((event, index) => (
          <div key={index}>{event}</div>
        ))}
      </div>
      <div className="sidebar-container">
        <div>
          <SimulatorSidebar
            simulatorEvents={simulatorEvents}
            customEvents={customEvents}
            simulatorState={simulatorState}
            simulationValid={simulationValid}
            eventClick={eventClick}
            customClick={customClick}
            clearSimulation={clearSimulation}
            addTest={addTest}
            addCustomEvent={addCustomEvent}
          />
          <AddEventForm
            formState={formState}
            setFormState={setFormState}
            handleAddEventSubmit={handleAddEventSubmit}
          />
          <AddTestForm
            simulatorEvents={simulatorEvents}
            customEvents={customEvents}
            formState={formState}
            setFormState={setFormState}
            handleAddTestSubmit={handleAddTestSubmit}
            handleContextEventChange={handleContextEventChange}
          />
        </div>
        {testsActive && <TestsSidebar tests={tests} setTests={setTests} />}
      </div>
    </div>
  );
}

export default Simulator;
