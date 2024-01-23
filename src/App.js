import React from "react";
import Header from "./Header";
import NoteInput from "./NoteInput";
import Note from "./Note";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const existingNotes = localStorage.getItem("copyNotes");

  useEffect(() => {
    setNotes(existingNotes ? JSON.parse(existingNotes) : []);
  }, [existingNotes]);

  const addNote = (newNote) => {
    setNotes((prevNotes) => {
      localStorage.setItem(
        "copyNotes",
        JSON.stringify([...prevNotes, newNote])
      );
      return [...prevNotes, newNote];
    });
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      const remainNotes = JSON.parse(existingNotes).filter((noteItem, index) => {
        return index !== id;
      });
      localStorage.setItem("copyNotes", JSON.stringify(remainNotes));
      return remainNotes;
    });
  };

  return (
    <div className="app-container">
      <Header />
      <NoteInput onAdd={addNote} />
      <div className="notes-wrapper">
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
