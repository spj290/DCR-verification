import { useState } from "react";
import { execute, getEnabled } from "../../BitDCRAlign-main/src/bitAlign";
import {
  bitDCRtoLabelDCR,
  bitGraphToGraphPP,
  dcrToBitDCR,
  bitToRegularDCR,
} from "../../BitDCRAlign-main/src/utility";
import { convertToDCRGraph } from "../utils";

function Simulator({ events, relations, tests, setTests }) {
  const [trace, setTrace] = useState([]);
  const [simulatorState, setSimulatorState] = useState({
    currDCRGraph: convertToDCRGraph(events, relations),
    enabledEvents:
      events.length == 0
        ? new Set()
        : getEnabled(dcrToBitDCR(convertToDCRGraph(events, relations))),
  });
  const [simulationValid, setsimulationValid] = useState(true);

  function eventClick(event) {
    setTrace([...trace, event.label]);
    if (!simulationValid) return;
    if (!simulatorState.enabledEvents.has(event.label)) {
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
    setSimulatorState({
      currDCRGraph: bitToRegularDCR(DCRGraph),
      enabledEvents: getEnabled(DCRGraph),
    });
  }

<<<<<<< HEAD
=======
  // function simulate() {
  //   const eventIdSet = new Set(
  //     events.map((event) => {
  //       return event.id;
  //     })
  //   );

  //   const test = {
  //     polarity: "+",
  //     trace: trace.map((event) => event.id),
  //     context: eventIdSet,
  //   };

  //   const bitModelPP = bitGraphToGraphPP(
  //     bitDCRtoLabelDCR(dcrToBitDCR(convertToDCRGraph()))
  //   );
  //   const validSimulation = checkAlignment(test, bitModelPP, 10);

  //   setsimulationCheck({
  //     show: true,
  //     message: validSimulation ? "Simulation successful" : "Simulation failed",
  //     validSimulation: validSimulation,
  //   });

    setTimeout(() => {
      setsimulationCheck({ show: false });
    }, 3000);

>>>>>>> 5085a3877aabb71582c053a24e476eedd3bdc178
  function clearSimulation() {
    setSimulatorState({
      currDCRGraph: convertToDCRGraph(events, relations),
      enabledEvents:
        events.length == 0
          ? new Set()
          : getEnabled(dcrToBitDCR(convertToDCRGraph(events, relations))),
    });
    setsimulationValid(true);
    setTrace([]);
  }
<<<<<<< HEAD

  function addTest() {
    setTests([
      ...tests,
      {
        name: `Test${tests.length + 1}`,
        polarity: "+",
        trace: trace,
        context: new Set(
          events.map((event) => {
            return event.label;
          })
        ),
        status: true,
      },
    ]);
  }
=======
>>>>>>> 5085a3877aabb71582c053a24e476eedd3bdc178

  return (
    <div className="simulator">
      <div className="simulator-canvas">
        {trace.map((event) => (
          <div>{event}</div>
        ))}
      </div>
      <div className="simulator-events">
        <h3 className="simulator-event-label-label">Event Labels</h3>
        <div className="event-list">
          {events.map((event, index) => (
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
            </div>
          ))}
        </div>
<<<<<<< HEAD
        <button>ADD EVENT</button>
        <button style={{ marginTop: "5px" }} onClick={addTest}>
          SAVE AS TEST
        </button>
        <button style={{ marginTop: "5px" }} onClick={clearSimulation}>
          RESET
        </button>
=======
        <button onClick={simulate}>Simulate</button>
        <button onClick={clearSimulation}>Clear Simulation</button>
>>>>>>> 5085a3877aabb71582c053a24e476eedd3bdc178
      </div>
    </div>
  );
}

export default Simulator;
