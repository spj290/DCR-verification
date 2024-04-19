namespace Relations;

public class Includes : IRelation {
    
    public int relationId {get; private set;}
    public int fromEvent {get; private set;}
    public int toEvent {get; private set;}
    public string? relationText {get; private set;}
    public int depth {get; set;}

    public Includes(int id, int from, int to, string? text) {
        relationId = id;
        fromEvent = from;
        toEvent = to;
        relationText = text;
    }

    public void EditRelation(int newFromEvent, int newToEvent, string? newRelationText = null) {
        fromEvent = newFromEvent;
        toEvent = newToEvent;
        if (newRelationText != null) {
            relationText = newRelationText;
        }
    }
    
    public void Execute(){
        //todo: implement execute
    }
    public void Render(){
        return;
    }
}