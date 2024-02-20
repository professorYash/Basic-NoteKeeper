import React, { useState, useEffect } from "react";
import axios from "axios";

// Core components
import Header from "./Header";
import NoteInput from "./NoteInput";
import Note from "./Note";

// Icons
import { GrClose } from "react-icons/gr";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

// Utilities
import fetchNotes from "./utils/fetchNotes";
import convertUtcToIst from "./utils/dateTimeFormatter";

// Third-party library
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [notes, setNotes] = useState([]);
  const [showFullPageView, setShowFullPageView] = useState(false);
  const [fullPageNoteData, setFullPageNoteData] = useState({});
  const [fullPageNoteDataContent, setFullPageNoteDataContent] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPageNull, setPreviousPageNull] = useState(false);
  const [nextPageNull, setNextPageNull] = useState(false);
  const [hideScrollbar, setHideScrollbar] = useState(false);

  useEffect(() => {
    fetchNotes(currentPage).then((data) => {
      if (data.data) {
        setNotes(data.data);
        setPreviousPageNull(data.previousValueNull);
        setNextPageNull(data.nextValueNull);
      } else if (data.message) {
        toast.error(data.message);
      }
    });
  }, [currentPage]);

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

  useEffect(() => {
    if (showFullPageView) {
      const pageContent = document.querySelector('.pageContent');
      const handleResize = () => {
        if (pageContent.scrollHeight > pageContent.clientHeight) {
          setHideScrollbar(false);
        } else if (pageContent.scrollHeight === pageContent.clientHeight) {
          setHideScrollbar(true);
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [showFullPageView]);
  const addNote = async (newNote) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/notes`, { title: newNote.title, content: newNote.content });
    if (response.status === 200) {
      toast.success("Successfully added, Thanks for sharing!!!");
      fetchNotes(currentPage).then((data) => {
        if (data.data) {
          setNotes(data.data);
          setPreviousPageNull(data.previousValueNull);
          setNextPageNull(data.nextValueNull);
        } else if (data.message) {
          toast.error(data.message);
        }
      });
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const closeFullPageView = () => {
    setShowFullPageView(false);
    setFullPageNoteData({});
    setFullPageNoteDataContent([])
  };

  const getFullPageView = (note) => {
    setShowFullPageView(true);
    setFullPageNoteData(note);
    if (fullPageNoteData) {
      const content = note?.content.split("\n");
      setFullPageNoteDataContent(content)
    }
  };

  const toggleDarkMode = (darkMode) => {
    setIsDarkMode(!darkMode);
  };

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
      <div className="paginate-button">
        <button className="back-button" onClick={handlePreviousPage} disabled={previousPageNull}><IoIosArrowBack /></button>
        <button className="forward-button" onClick={handleNextPage} disabled={nextPageNull}><IoIosArrowForward /></button>
      </div>
      {showFullPageView && (
        <div className="full-page-view">
          <div className="modal">
            <h1>{fullPageNoteData.title}</h1>
            <div className={`pageContent ${hideScrollbar ? 'hide-scrollbar' : ''}`}>
              {fullPageNoteDataContent && fullPageNoteDataContent?.map((paragraph, index) =>
                <p key={index}>{paragraph}</p>
              )}
            </div>
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
