import Events from "./Events";
import Relations from "./Relations";
import React, { useRef, useState } from "react";
import "../styles/filemanager.css";

function FileManager({ events, relations, tests, testsActive, setEvents, setRelations, setTests, setTestsActive}) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("dcr.json");

  // const saveState = () => {
  //   const state = {
  //     events,
  //     relations,
  //   };
  //   const a = document.createElement("a");
  //   const file = new Blob([JSON.stringify(state)], { type: "application/json" });
  //   a.href = URL.createObjectURL(file);
  //   a.download = fileName;
  //   a.click();
  // }

  const saveState = async () => {
    const state = {
      events,
      relations,
      tests,
      testsActive,
    };
    // tests.context is a Set, which is not serializable
    // Convert it to an array before saving
    state.tests = state.tests.map((test) => ({
      ...test,
      context: Array.from(test.context),
    }));
    const fileContent = JSON.stringify(state);

    if ("showSaveFilePicker" in window) {
      // If the File System Access API is supported
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: fileName,
          types: [
            {
              description: "JSON Files",
              accept: { "application/json": [".json"] },
            },
          ],
        });
        const writable = await handle.createWritable();
        await writable.write(fileContent);
        await writable.close();
      } catch (err) {
        console.error("Save operation failed:", err);
      }
    } else {
      // Fallback for browsers that do not support the File System Access API
      const a = document.createElement("a");
      const file = new Blob([fileContent], { type: "application/json" });
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
    }
  };

  const askForFilePath = () => {
    fileInputRef.current.click();
  };

  const loadState = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const state = JSON.parse(e.target.result);
      // Convert context from array to Set
      state.tests = state.tests.map((test) => ({
        ...test,
        context: new Set(test.context),
      }));
      setEvents(state.events);
      setRelations(state.relations);
      setTests(state.tests);
      setTestsActive(state.testsActive);
    };
    reader.readAsText(file);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  return (
    <div className="file-manager">
      <button className="save-load-button" onClick={saveState}>
        Save
      </button>
      <button className="save-load-button" onClick={askForFilePath}>
        Load
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={loadState}
      />
      <Events events={events} />
      <Relations relations={relations} />
    </div>
  );
}

export default FileManager;
