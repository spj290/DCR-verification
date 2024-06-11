import React from "react";
// import { Stage, Layer } from "react-konva";
// import Events from "./Events";
// import Relations from "./Relations";

function TestInfoWindow({formState, setFormState, deleteTest, setTests}) {
  function closeForm() {
    setFormState((prevState) => ({
      ...prevState,
      showTestForm: false,
    }));
  }

  return (
    <>
      {formState.showTestForm && (
        <form className="test-form">
          <button
            onClick={closeForm}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "red",
            }}
          >
            X
          </button>
          <button
            onClick={deleteTest(formState.newTestName)}
            style={{
                position:"absolute",
                top: 0,
                left: 0
            }}
            >
                Delete Test
          </button>
          <div
            style={{ whiteSpace: 'pre-line' }}
            >
            {[...formState.selectedContextEvents].join('\n')}
            {/* {[formState.selectedContextEvents].map((event, index) => (
                <div key={index}>{event}</div>
                ))} */}
            {/* {trace.map((event, index) => (
            <div key={index}>{event}</div>
            ))} */}
            </div>
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
      )}
    </>
  );
}

export default TestInfoWindow;
