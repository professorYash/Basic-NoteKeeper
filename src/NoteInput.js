import React from "react";
import { useState } from "react";

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
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  };
  return (
    <div className="noteInput">
      <form onSubmit={addNote}>
        <input
          type="text"
          name="title"
          className="form-control"
          onChange={handleChange}
          placeholder="Title...['late night thoughts', 'my dream job']"
          value={note.title}
        />
        <input
          type="text"
          name="content"
          className="form-control"
          onChange={handleChange}
          placeholder="Content... ['mujhe lagta ki ab kuchh nahi ho sakta', 'To sleep all day without caring anything']"
          value={note.content}
        />
        <button className="btn btn-secondary" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default NoteInput;
