import { RELATION_TYPES } from "../RelationTypes";

function ContextMenu({
    contextMenu,
    addRelation,
    udpateRelation,
    deleteRelation,
    deleteEvent,
  }) {
  return (
    <div
      className="context-menu"
      style={{
        left: contextMenu.position.x,
        top: contextMenu.position.y,
      }}
    >
      {Object.values(RELATION_TYPES).map((type) => (
        <div
          key={type}
          onClick={
            // if contextMenu.event is not null, add relation
            // else if contextMenu.relation is not null, update relation type
            // else do nothing
            contextMenu.event
              ? () => addRelation(contextMenu.event, type)
              : () => udpateRelation(contextMenu.relation, type)
          }>
          {type}
        </div>
      ))}
      <div onClick={
        // if contextMenu.relation is not null, delete relation
        // else if contextMenu.event is not null, delete event
        // else do nothing
        contextMenu.relation
          ? () => deleteRelation(contextMenu.relation)
          : () => deleteEvent(contextMenu.event)
      }>
        Delete
      </div>
    </div>
  );
}

export default ContextMenu;
