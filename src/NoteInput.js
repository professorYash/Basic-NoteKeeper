import React, { useState } from "react";
import {toast} from "react-toastify"

function NoteInput(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  };

  const addNote = (event) => {
    if (note.title === '' || note.content === '') {
      toast.warning("Please fill all the fields!!!")
    } else {
      props.onAdd(note);
      setNote({
        title: "",
        content: "",
      });
    }
    event.preventDefault();
  };

  return (
    <div className="note-input">
      <form onSubmit={addNote}>
        <input
          type="text"
          name="title"
          className="form-control"
          onChange={handleChange}
          placeholder="Title...['Morning Meditation', 'Mindful Moments']"
          value={note.title}
        />
        <textarea
          name="content"
          className="form-control"
          onChange={handleChange}
          placeholder="Content... ['Reflecting on the sunrise and setting intentions for the day ahead.', 'Noticing the simple joys around me and embracing the present moment.']"
          value={note.content}
          rows={4}
        />
        <button className="btn btn-secondary" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default NoteInput;
