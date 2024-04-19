using System.ComponentModel;
using System.Diagnostics.Tracing;
using Events;
using Relations;


namespace GraphObject;

public class GraphObject{
    public int graphId {get; private set;}
    
    public string graphLabel {get; private set;}
    public List<Event> events {get; private set;}
    private List<IRelation> relations {get; set;}
    
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
    public void EditEvent(int eventId, Event newEvent) {
        try {
            // events.Find(x => x.eventId == eventId) = newEvent;
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
      // #TODO
      return;
    }
}