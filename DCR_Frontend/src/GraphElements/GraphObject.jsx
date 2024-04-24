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
    }
    
    // Method to add an Event component to the events array
    addEvent(pos, size, label) {
        this.events.push(<Event pos={pos} size={size} label={label}/>);
    }
    
    // Method to add a Relation component to the relations array
    addRelation(fromEvent, toEvent, label) {
        this.relations.push(<Relation fromEvent={fromEvent} toEvent={toEvent} label={label}/>);
    }
    
    // Method to create an Event component when the Group component is clicked
    createEventPopup = () => {
        this.addEvent([302, 270], [100, 100], "aaaaa");
    }
    
    // Render method for the component
    render() {
        // Returning a Layer component with a Group component and the events and relations arrays
        return (
            <Layer>
                <Group
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
                </Group>
                {this.events}
                {this.relations}
            </Layer>
        );
    }
}
