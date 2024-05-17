import { useState } from "react";
import checkAlignment from "../../BitDCRAlign-main/src/tdm";
import { RELATION_TYPES } from "../RelationTypes";

function Simulator({ events, relations }) {
  const [trace, setTrace] = useState([]);
  const [simulationCheck, setsimulationCheck] = useState({
    show: false,
    message: "",
    validSimulation: false,
  });

  function eventClick(event) {
    setTrace([...trace, { label: event.label, id: event.id }]);
  }

  function simulate() {
    const eventIdSet = new Set(
      events.map((event) => {
        return event.id;
      })
    );

    const test = {
      polarity: "+",
      trace: trace.map((event) => event.id),
      context: eventIdSet,
    };

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

    const model = {
      events: eventIdSet,
      ...relationTypes,
      marking: {
        executed: new Set(),
        included: eventIdSet,
        pending: new Set(),
      },
    };

    const validSimulation = checkAlignment(test, model, 10);

    setsimulationCheck({
      show: true,
      message: validSimulation ? "Simulation successful" : "Simulation failed",
      validSimulation: validSimulation,
    });

    setTimeout(() => {
      setsimulationCheck({ show: false });
    }, 3000);
  }

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
            <div key={index} onClick={() => eventClick(event)}>
              {event.label}
            </div>
          ))}
        </div>
        <button onClick={simulate}>Simulate</button>
      </div>
      {simulationCheck.show && (
        <div
          className={`simulation-check ${
            simulationCheck.validSimulation ? "success" : "failure"
          }`}
        >
          {simulationCheck.message}
        </div>
      )}
    </div>
  );
}

export default Simulator;
