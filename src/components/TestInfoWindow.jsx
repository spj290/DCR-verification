import React from "react";
import Draggable from "react-draggable";
// import { Stage, Layer } from "react-konva";
// import Events from "./Events";
// import Relations from "./Relations";


import "../styles/testwindowinfo.css";

function TestInfoWindow({formState, setFormState, deleteTest}) {
  function closeForm() {
    setFormState((prevState) => ({
      ...prevState,
      showTestForm: false,
    }));
  }

  return (
    <>
      {formState.showTestForm && (
        <Draggable>
          <form className="test-form">
            <button
              onClick={closeForm}
              className="close--button"
            >
              <span class="close-icon">&times;</span>
            </button>
            <h3>
              Polarity: {formState.newPolarity === "+"? "+":"-"}
            </h3>
            <div>
              <h3>
                  Context Events:
              </h3>
            <div
              style={{ whiteSpace: 'pre-line' }}
              >
              {[...formState.selectedContextEvents].join('\n')}
              </div>
            </div>
            <div>
              <h3>Trace:</h3>
              <div style={{ whiteSpace: 'pre-line' }}>
              {[...formState.trace].join('\n')}
              </div>
            </div>
            <button
              onClick={() => deleteTest(formState.newTestName)}
              className="button--delete"
              >
                  Delete Test
            </button>
              
            {/* <Stage
              className="canvas"
              width={500}
              height={500}
              draggable
              // onClick={handleStageClick()}
              // onContextMenu={addEvent}>
              >
              {/* <Layer>
                  <Events
                  events={[formState.selectedContextEvents]}
                  // setEvents={setEvents}
                  />
              </Layer> </Stage> */}
            
          </form>
        </Draggable>
      )}
    </>
  );
}

export default TestInfoWindow;
