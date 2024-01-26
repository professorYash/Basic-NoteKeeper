import React from "react";

function Note(props) {
  const truncatedContent = props.content.length > 30 ? props.content.substring(0, 30) + "..." : props.content;
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{truncatedContent}</p>
    </div>
  );
}

export default Note;
