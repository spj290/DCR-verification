import React from "react";
import {Rect, Layer, Group, Text} from "react-konva";
import Event from './Event';
import Relation from './Relation';

export default class GraphObject extends React.Component {
    constructor(props) {
        super(props);
        this.events = [];
        this.relations = [];
    }
    addEvent(pos, size, label) {
        this.events.push(<Event pos={pos} size={size} label={label}/>);
    }
    addRelation(fromEvent, toEvent, label) {
        this.relations.push(<Relation fromEvent={fromEvent} toEvent={toEvent} label={label}/>);
    }
    createEventPopup = () => {
        this.addEvent([302, 270], [100, 100], "aaaaa");

    }
    render() {
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
