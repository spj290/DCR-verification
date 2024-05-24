import { RELATION_TYPES } from "../RelationTypes";
import "../styles/contextmenu.css";
function ContextMenu({
  contextMenu,
  relations,
  events,
  selectedEventId,
  addRelation,
  udpateRelation,
  deleteRelation,
  deleteEvent,
}) {

  const isDisabled = (type) => {
    return relations.some(relation => contextMenu.event !== null && relation.toEvent.id === contextMenu.event.id && relation.fromEvent.id === selectedEventId && relation.type === type);
  };

  return (
    <div
      className="context-menu"
      style={{
        left: contextMenu.position.x,
        top: contextMenu.position.y,
      }}
    >
      {Object.values(RELATION_TYPES).map((type) => {
        const disabled = isDisabled(type);
        
        return (
          <div
            key={type}
            onClick={
              // if contextMenu.event is not null, add relation
              // else if contextMenu.relation is not null, update relation type
              // else do nothing
              disabled ? null
              : contextMenu.event
                ? () => addRelation(contextMenu.event, type)
                : () => udpateRelation(contextMenu.relation, type)
            }
            style={{ 
              pointerEvents: disabled ? 'none' : 'auto', 
              opacity: disabled ? 0.5 : 1,
              cursor: disabled ? 'not-allowed' : 'pointer',
              color: disabled ? '#aaa' : 'inherit',
            }}
          >
            {type}
          </div>
        );
      })}
      <div
        onClick={
          // if contextMenu.relation is not null, delete relation
          // else if contextMenu.event is not null, delete event
          // else do nothing
          contextMenu.relation
            ? () => deleteRelation(contextMenu.relation)
            : () => deleteEvent(contextMenu.event)
        }
      >
        Delete
      </div>
    </div>
  );
}

export default ContextMenu;
