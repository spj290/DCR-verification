using System;
using System.Reflection.Emit;
using GraphObject;
static class Program
{
    public static GraphObject.GraphObject? currentGraph; // TODO: figure out if we want to keep it nullable
    // public static Simulator.Simulator simulator;
    // public static Tests tests;
    public static int graphIdGenKey{get; private set;}
    public static int eventIdGenKey {get; private set;}
    public static int relationIdGenKey{get; private set;}
    public static void Main()
    {
        graphIdGenKey = 0;
        eventIdGenKey = 0;
        relationIdGenKey = 0;
        currentGraph = createGraph("Graph 1");
        Events.Event event1 = createEvent(0, 0, 100, 100, "Event 1");
        Events.Event event2 = createEvent(0, 0, 100, 100, "Event 2");
        Events.Event event3 = createEvent(1,1,200,200, "Event 3");
        currentGraph.AddEvent(event1);
        currentGraph.AddEvent(event2);
        Relations.IRelation relation1 = createRelation("PreCondition", 1, 2, "Relation 1");
        Relations.IRelation relation2 = createRelation("PreCondition", 3, 2, "Relation 2");
        currentGraph.AddRelation(relation1);
        currentGraph.AddEvent(event3);
        Console.WriteLine(currentGraph.relations[0].fromEvent);
        currentGraph.EditRelation(relation1.relationId, relation2);
        Console.WriteLine(currentGraph.relations[0].relationText);
        // int index = currentGraph.events.FindIndex(x => x.eventId == event1.eventId);
        // Console.WriteLine(currentGraph.events[index].eventLabel);
        // currentGraph.EditEvent(event1.eventId, event3);
        // Console.WriteLine(currentGraph.events[index].eventLabel);
        // simulator = new Simulator.Simulator();
        // tests = new Tests();
    }
    private static GraphObject.GraphObject createGraph(string label)
    {
        graphIdGenKey++;
        return new GraphObject.GraphObject(graphIdGenKey, label);
    }
    private static Events.Event createEvent(int x, int y, int width, int height,string label = null)
    {
        eventIdGenKey++;
        return new Events.Event(eventIdGenKey, x, y, width, height, label);
    }
    private static Relations.IRelation createRelation(string type, int fromEvent, int toEvent, string text = null)
    {
        relationIdGenKey++;
        switch (type)
        {
            case "PreCondition":
                return new Relations.PreCondition(relationIdGenKey, fromEvent, toEvent, text);
            case "Response":
                return new Relations.Response(relationIdGenKey, fromEvent, toEvent, text);
            case "Includes":
                return new Relations.Includes(relationIdGenKey, fromEvent, toEvent, text);
            case "Excludes":
                return new Relations.Excludes(relationIdGenKey, fromEvent, toEvent, text);
            default:
                throw new Exception("Invalid relation type");
        }
    }
}
