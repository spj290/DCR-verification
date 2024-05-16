using Events;

namespace Relations;

public interface IRelation: ICanvasObject {
    
    int relationId {get;}
    int fromEvent {get;}
    int toEvent {get;}
    string? relationText {get;}

    void EditRelation(int newFromEvent, int newToEvent, string? newRelationText);
    Event Execute(Event toEvent);
}