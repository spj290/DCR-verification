import { RELATION_TYPES } from "../RelationTypes";

function ContextMenu({ contextMenu, addRelation, deleteEvent }) {
  return (
    <div
      className="context-menu"
      style={{
        left: contextMenu.position.x,
        top: contextMenu.position.y,
      }}
    >
      <div
        onClick={() => addRelation(contextMenu.event, RELATION_TYPES.CONDITION)}
      >
        Condition
      </div>
      <div
        onClick={() => addRelation(contextMenu.event, RELATION_TYPES.RESPONSE)}
      >
        Response
      </div>
      <div
        onClick={() => addRelation(contextMenu.event, RELATION_TYPES.EXCLUDE)}
      >
        Exclude
      </div>
      <div
        onClick={() => addRelation(contextMenu.event, RELATION_TYPES.INCLUDE)}
      >
        Include
      </div>
      <div
        onClick={() => addRelation(contextMenu.event, RELATION_TYPES.MILESTONE)}
      >
        Milestone
      </div>
      <div onClick={() => deleteEvent(contextMenu.event)}>Delete</div>
    </div>
  );
}

export default ContextMenu;
