import React from "react";
import Header from "./Header";
import NoteInput from "./NoteInput";
import Note from "./Note";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes`);
      setNotes(response.data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addNote = async (newNote) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/notes`, { title: newNote.title, content: newNote.content });
    if (response.status === 200) {
      fetchNotes();
    }
  };

  return (
    <div className="app-container">
      <Header />
      <NoteInput onAdd={addNote} />
      <div className="notes-wrapper">
        {notes?.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={noteItem.$id}
              title={noteItem.Title}
              content={noteItem.Content}
            />
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
