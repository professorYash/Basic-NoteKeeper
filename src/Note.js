import convertUtcToIst from "./utils/dateTimeFormatter";

function Note(props) {
  const truncatedContent = props.content.length > 50 ? props.content.substring(0, 50) + "..." : props.content;
  const setFullPageNoteData = () => {
    props.onNoteClick({ title: props.title, content: props.content, createdAt: props.createdAt });
  };
  return (
    <div className="note" id={props.id} onClick={setFullPageNoteData}>
      <h1>{props.title}</h1>
      <p>{truncatedContent}</p>
      <p className="note-date"><strong>{convertUtcToIst(props.createdAt)}</strong></p>
    </div>
  );
}

export default Note;
