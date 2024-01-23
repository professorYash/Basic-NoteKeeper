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

  // const doSomeMagic = function (fn, delay) {
  //   let timeOutId;
  //   return function (...args) {
  //     if (timeOutId) {
  //       clearTimeout(timeOutId);
  //     }
  //     timeOutId = setTimeout(() => {
  //       fn.call(this, ...args);
  //     }, delay);
  //   };
  // };

  // const betterFunction = doSomeMagic(handleChange, 300);

  /*
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.call(this, ...args);
      }, delay);
    };
  };
  */

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
          placeholder="Title..."
          value={note.title}
        />
        <input
          type="text"
          name="content"
          className="form-control"
          onChange={handleChange}
          placeholder="Content..."
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
