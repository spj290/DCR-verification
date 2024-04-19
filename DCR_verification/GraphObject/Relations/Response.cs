namespace Relations;

public class Response : IRelation {
    
    public int relationId {get; private set;}
    public int fromEvent {get; private set;}
    public int toEvent {get; private set;}
    public string? relationText {get; private set;}
    public int depth {get; set;}

    public Response(int id, int from, int to, string? text) {
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
        // TODO: implement execute
        return;
    }
    public void Render(){
        return;
    }
}