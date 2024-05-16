using System.ComponentModel;
using System.Diagnostics.Tracing;
using Events;
using Relations;


namespace GraphObject;

public class GraphObject{
    public int graphId {get; private set;}
    public string graphLabel {get; private set;}
    public List<Event> events {get; private set;}
    public List<IRelation> relations {get; private set;}
    
    /// <summary>
    /// GraphObject contructor
    /// </summary>
    /// <param name="gId">graphId</param>
    /// <param name="gLabel">graphLabel</param>
    public GraphObject(int id, string gLabel) {
      graphId = id;
      graphLabel = gLabel;
      events = new List<Event>();
      relations = new List<IRelation>();
    }

    /// <summary>
    /// GraphObject contructor with an initial collection of events and relations
    /// </summary>
    /// <param name="gId">graphId</param>
    /// <param name="gLabel">graphLabel</param>
    /// <param name="eventCollection">collection of events</param>
    /// <param name="relationCollection">collections of relations</param>
    public GraphObject(int gId, string gLabel, List<Event> eventCollection, List<IRelation> relationCollection) {
      graphId = gId;
      graphLabel = gLabel;
      events = eventCollection;
      relations = relationCollection;
    }

    /// <summary>
    /// adds an event to the event collections
    /// </summary>
    /// <param name="newEvent">event to be added</param>
    public void AddEvent(Event newEvent) {
        events.Add(newEvent);
    }

    /// <summary>
    /// edits an event with eventId to a new event
    /// </summary>
    /// <param name="eventId">eventId to change</param>
    /// <param name="newEvent">new event</param>
    public void EditEvent(int eventId, Event newEvent) { // TODO: need to keep eventID
        try {
            Event e = events.Find(x => x.eventId == eventId);
            e.isEnabled  = newEvent.isEnabled;
            e.isExecuted = newEvent.isExecuted;
            e.isIncluded = newEvent.isIncluded;
            e.isPending  = newEvent.isPending;
            // events[index] = newEvent;
        } catch {
            Console.WriteLine("event not found");
        }
    }

    /// <summary>
    /// adds a relation to the relation collections
    /// </summary>
    /// <param name="newRelation">relation to be added</param>
    
    public void AddRelation(IRelation newRelation) {
        relations.Add(newRelation);
    }

    /// <summary>
    /// edits a relation with relationId to a new relation
    /// </summary>
    /// <param name="relationId">relationId to change</param>
    /// <param name="newRelation">new relation</param>
    public void EditRelation(int relationId, IRelation newRelation) { 
        // try {
            Relations.IRelation relation = relations.Find(x => x.relationId == relationId);
            int oldFrom = relation.fromEvent;
            int oldTo = relation.toEvent;
            events.Find(x => x.eventId == oldFrom).outRelations.Remove(relation);
            events.Find(x => x.eventId == oldTo).inRelations.Remove(relation);
            int newFrom = newRelation.fromEvent;
            int newTo = newRelation.toEvent;
            events.Find(x => x.eventId == newFrom).outRelations.Add(relation);
            events.Find(x => x.eventId == newTo).inRelations.Add(relation);
            string? relationText = newRelation.relationText;
            relation.EditRelation(newFrom, newTo, relationText);
        // } catch {
        //     Console.WriteLine("relation not found");
        // }
    }

    public void ExecuteRelation(int relationId) {
      IRelation r = relations..Find(x => x.relationId);
      int toEvent = r.toEvent;
      Event e = events.Find(x => x.eventId == eventId);
      EditEvent(toEvent, r.Execute(e));
    }

    public void ExecuteEvent(int EventId) {
        // try {
            int e = events.Find(x => x.eventId == eventId);
            List<IRelation> outs = e.outRelations;
            e.isExecuted = true;
            e.isPending = false;
            outs.ForEach(i => {ExecuteRelation(i);});
        // } catch {
        //     Console.WriteLine("event not found")
        // }
    }
}