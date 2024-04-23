import React from "react";
import {Rect, Text, Group, Layer} from "react-konva";
import Event from './Event';
import Relation from './Relation';

class GraphObject extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        events: [],
        relations: []
    };
    handleClick = () => {
        // If blank space is clicked, show menu to add event or relation
        

    }

    addEvent = (pos, size, label) => {
        var event = new Event({eventId: this.events.length + 1, pos: pos, size: size, label: label})
        this.events.push(event)
    }
    addRelation = (fromEvent, toEvent, label) => {
        var relation = new Relation({relationId: this.relations.length + 1, fromEvent: fromEvent, toEvent: toEvent, label: label})
        this.relations.push(relation)
    }

    render() {
        return (
            <Layer>
                {this.events.map((event) => event.render())}
                {this.relations.map((relation) => relation.render())}
            </Layer>

        );
    }
    }
export default GraphObject;
