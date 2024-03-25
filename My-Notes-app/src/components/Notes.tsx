import { MdEdit, MdDelete } from "react-icons/md";
import "../css/sidebar.css";
import { useState } from 'react'

export default function Notes(props) {
  const [isOpen , setIsOpen] = useState(true)


  const postNewOpenTab = async(noteId) => {
    try {
      const response = await fetch('http://localhost:8000/postNewOpenTab' ,{
        method: "POST",
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          note_id: noteId})
      })  
      if (response.status === 200){
        props.getAllOpenTab();
        // how can i call the seAscurrentTab function over here 

      } 
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <>
      <div className="note-container">
        <div
          className="left-part"
          onClick={() => isOpen && postNewOpenTab(props.noteId)}
        >
          <MdEdit />
          <p className="note-title">{props.title}</p>
        </div>
        <MdDelete
          className="delete-btn"
          onClick={async () => {
            try {
              const response = await fetch("http://localhost:8000/deleteNote", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  authorization: localStorage.getItem("jwtToken")
                },
                body: JSON.stringify({
                  noteId: props.noteId,
                  title: props.title,
                }),
              });

              if (response.status === 201) {
                // here change the notes state so that react re-render the Note component
                props.getAllNotes();
              }
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </div>
    </>
  );
}
