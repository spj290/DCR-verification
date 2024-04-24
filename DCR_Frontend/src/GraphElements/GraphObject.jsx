import React from "react";
import {Rect, Layer, Group, Text} from "react-konva";
import Event from './Event';
import Relation from './Relation';

// GraphObject class component: Represents the canvas currently
export default class GraphObject extends React.Component {
    // Constructor for the GraphObject component
    constructor(props) {
        super(props);
        // Initializing events and relations arrays
        this.events = [];
        this.relations = [];
        this.fromEventMap = {};
        this.toEventMap = {};
        this.eventIdCounter = 0;
        this.relationIdCounter = 0;
    }

    updateArrows = (eventId) => {
        // this.toEventMap[eventId].forEach((relationId) => {
        //     var fromEvent = this.relations[relationId].props.fromEvent;
        //     var toEvent = this.relations[relationId].props.toEvent;
        //     var label = this.relations[relationId].props.label;
        //     this.deleteRelation(relationId);
        //     this.addRelation(fromEvent, toEvent, label);
        //     console.log("updated arrow");
        // });
        console.log(eventId);
        console.log(this.events[eventId]);
    }
    
    // Method to add an Event component to the events array
    addEvent(pos, size, label) {
        var id = this.eventIdCounter++;
        this.fromEventMap[id] = [];
        this.toEventMap[id] = [];
        this.events.push(
        <Event
            key = {id}
            eventId = {id}
            pos={pos}
            size={size}
            label={label}
            onDragMove = {() => this.updateArrows(id)}
        />);
    }

    // deleteEvent(eventId) { // TODO fix this
    //     this.events.splice(eventId, 1);
    //     this.fromEventMap[eventId].forEach((relationId) => {
    //         this.deleteRelation(relationId);
    //     });
    //     this.toEventMap[eventId].forEach((relationId) => {
    //         this.deleteRelation(relationId);
    //     });
    //     this.fromEventMap[eventId] = [];
    //     this.toEventMap[eventId] = [];
    // }
    
    // Method to add a Relation component to the relations array
    addRelation(fromEvent, toEvent, label) {
        var id = this.relationIdCounter++;
        this.fromEventMap[fromEvent.props.eventId].push(id);
        this.toEventMap[toEvent.props.eventId].push(id);
        this.relations.push(
            <Relation
                key = {id}
                relationId = {id}
                fromEvent={fromEvent}
                toEvent={toEvent}
                label={label}
            />);
    }

    // deleteRelation(relationId) {
    //     this.relations.splice(relationId, 1);
    //     this.fromEventMap[this.relations[relationId].props.fromEvent.props.eventId].splice(relationId, 1);
    //     this.toEventMap[this.relations[relationId].props.toEvent.props.eventId].splice(relationId, 1);
    // }
    
    // Method to create an Event component when the Group component is clicked TODO fix this
    createEventPopup = () => {
        this.addEvent([302, 270], [100, 100], "aaaaa");
    }
    
    // Render method for the component
    render() {
        // Returning a Layer component with a Group component and the events and relations arrays
        return (
            <Layer>
                {/* <Group
                    x={10}
                    y={0}
                    onClick={this.createEventPopup}
                >
                    <Rect
                        width={100}
                        height={20}
                        fill={"white"}
                        stroke={"black"}
                    />
                    <Text
                        text={"Create Event"}
                        fontSize={15}
                        fill="black"
                        y={5}
                        width={100}
                        height={20}
                        align="center"
                    />
                </Group> */}
                {this.events}
                {this.relations}
            </Layer>
        );
    }
}
