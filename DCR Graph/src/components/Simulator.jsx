import { useState } from "react";
import checkAlignment from "../../BitDCRAlign-main/src/tdm";
import { execute, getEnabled } from "../../BitDCRAlign-main/src/bitAlign";
import {
  bitDCRtoLabelDCR,
  bitGraphToGraphPP,
  dcrToBitDCR,
} from "../../BitDCRAlign-main/src/utility";
import { RELATION_TYPES } from "../RelationTypes";

function Simulator({ events, relations }) {
  const [trace, setTrace] = useState([]);
  const [simulatorState, setSimulatorState] = useState({
    currDCRGraph: convertToDCRGraph(events, relations),
    enabledEvents:
      events.length == 0
        ? new Set()
        : getEnabled(dcrToBitDCR(convertToDCRGraph(events, relations))),
  });

  function eventClick(event) {
    const graph = bitGraphToGraphPP(
      bitDCRtoLabelDCR(dcrToBitDCR(simulatorState.currDCRGraph))
    );
    execute(event.id, graph);

    setSimulatorState({ enabledEvents: getEnabled(graph)} // BitLabelDCRPP -> BitDCRGraph
    );
    setTrace([...trace, { label: event.label, id: event.id }]);
  }

  function convertToDCRGraph(events, relations) {
    const eventIdSet = new Set(
      events.map((event) => {
        return event.id;
      })
    );

    const relationTypes = {
      conditionsFor: {},
      milestonesFor: {},
      responseTo: {},
      includesTo: {},
      excludesTo: {},
    };

    eventIdSet.forEach((eventId) => {
      Object.values(relationTypes).forEach((relation) => {
        relation[eventId] = new Set();
      });
    });

    const relationsMap = {
      [RELATION_TYPES.CONDITION]: relationTypes.conditionsFor,
      [RELATION_TYPES.RESPONSE]: relationTypes.responseTo,
      [RELATION_TYPES.EXCLUDE]: relationTypes.excludesTo,
      [RELATION_TYPES.INCLUDE]: relationTypes.includesTo,
      [RELATION_TYPES.MILESTONE]: relationTypes.milestonesFor,
    };

    relations.map((relation) => {
      relationsMap[relation.type][relation.fromEvent.id].add(
        relation.toEvent.id
      );
    });

    return {
      events: eventIdSet,
      ...relationTypes,
      marking: {
        executed: new Set(),
        included: eventIdSet,
        pending: new Set(),
      },
    };
  }

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

  //   setTimeout(() => {
  //     setsimulationCheck({ show: false });
  //   }, 3000);
  // }

  return (
    <div className="app">
      <div>
        {trace.map((event) => (
          <div>{event.label}</div>
        ))}
      </div>
      <div className="simulator-events">
        <h3>Event Labels</h3>
        <div className="event-list">
          {events.map((event, index) => (
            <div
              key={index}
              onClick={() => eventClick(event)}
              style={{
                color: simulatorState.enabledEvents.has(event.id)
                  ? "green"
                  : "red",
              }}
            >
              {event.label}
            </div>
          ))}
        </div>
        <button>Simulate</button>
      </div>
      {/* {simulationCheck.show && (
        <div
          className={`simulation-check ${
            simulationCheck.validSimulation ? "success" : "failure"
          }`}
        >
          {simulationCheck.message}
        </div>
      )} */}
    </div>
  );
}

export default Simulator;
