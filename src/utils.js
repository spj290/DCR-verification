import { RELATION_TYPES } from "./RelationTypes";

export function convertToDCRGraph(events, relations) {
    const eventLabelSet = new Set(
      events.map((event) => {
        return event.label;
      })
    );

    const relationTypes = {
      conditionsFor: {},
      milestonesFor: {},
      responseTo: {},
      includesTo: {},
      excludesTo: {},
    };

    eventLabelSet.forEach((event) => {
      Object.values(relationTypes).forEach((relation) => {
        relation[event] = new Set();
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
    //   if (relation.type == RELATION_TYPES.CONDITION) 
    //     relationsMap[relation.type][relation.toEvent.label].add(
    //       relation.fromEvent.label
    // );
    //   else
      relationsMap[relation.type][relation.fromEvent.label].add(
        relation.toEvent.label
      );
    });
    return {
      events: eventLabelSet,
      ...relationTypes,
      marking: {
        executed: new Set(),
        included: eventLabelSet,
        pending: new Set(),
      },
    };
  }