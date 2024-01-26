import React, { useState, useEffect } from "react";
import Header from "./Header";
import NoteInput from "./NoteInput";
import Note from "./Note";
import axios from "axios";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GrClose } from "react-icons/gr";
import convertUtcToIst from "./utils/dateTimeFormatter";

function App() {
  const [notes, setNotes] = useState([]);
  const [showFullPageView, setShowFullPageView] = useState(false);
  const [fullPageNoteData, setFullPageNoteData] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/notes`);
      setNotes(response.data.data);
    } catch (error) {
      if (error.message === 'Network Error') {
        toast.error("Unable to fetch notes, Server Issue. Please try after some time!!!");
      }
      else {
        toast.error(error.message);
      }
    }
  };
  useEffect(() => {
    const themeStylesheet = isDarkMode ? `${process.env.PUBLIC_URL}/styles-dark.css` : `${process.env.PUBLIC_URL}/styles-light.css`;
    const existingLink = document.getElementById("theme-stylesheet");

    if (existingLink) {
      existingLink.href = themeStylesheet;
    } else {
      const link = document.createElement("link");
      link.id = "theme-stylesheet";
      link.rel = "stylesheet";
      link.href = themeStylesheet;
      document.head.appendChild(link);
    }
  }, [isDarkMode]);

  const addNote = async (newNote) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/notes`, { title: newNote.title, content: newNote.content });
    if (response.status === 200) {
      toast.success("Successfully added, Thanks for sharing!!!");
      fetchNotes();
    }
  };

  const closeFullPageView = () => {
    setShowFullPageView(false);
  };

  const getFullPageView = (note) => {
    setShowFullPageView(true);
    setFullPageNoteData(note);
  };

  const toggleDarkMode = (darkMode) => {
    setIsDarkMode(!darkMode);
  };

  console.log("fullPageViewRef");

  return (
    <div className="app-container">
      <Header onToggleDarkMode={toggleDarkMode} />
      <NoteInput onAdd={addNote} />
      <div className="notes-wrapper">
        {notes?.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={noteItem.$id}
              title={noteItem.Title}
              content={noteItem.Content}
              createdAt={noteItem.$createdAt}
              onNoteClick={getFullPageView}
            />
          );
        })}
      </div>
      {showFullPageView && (
        <div className="full-page-view">
          <div className="modal">
            <h1>{fullPageNoteData.title}</h1>
            <p>{fullPageNoteData.content}</p>
            <button onClick={closeFullPageView}><GrClose /></button>
            <p className="note-date"><strong>{convertUtcToIst(fullPageNoteData.createdAt)}</strong></p>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
