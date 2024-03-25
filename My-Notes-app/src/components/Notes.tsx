import { MdEdit, MdDelete } from "react-icons/md";
import "../css/sidebar.css";
import { useState } from 'react'
import { NotesProps, RequestParameter } from '../utils'

export default function Notes({noteId, title, getAllOpenTab, notes,  setNotes}: NotesProps) {
  const [isOpen , setIsOpen] = useState(true)


  const postNewOpenTab = async(noteId: number) => {
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
          await getAllOpenTab();
        // how can i call the seAscurrentTab function over here
      } 
    }
    catch(error){
      console.log(error);
    }
  }

  const deleteNote = async () => {
    try {
      const deleteNoteParameter: RequestParameter = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken")!
        },
        body: JSON.stringify({
          noteId: noteId,
          title: title,
        })
      }
      const response = await fetch("http://localhost:8000/deleteNote", deleteNoteParameter);

      if (response.status === 201) {
        // here change the notes state so that react re-render the Note component
        setNotes(notes.filter((note) => note.note_id !== noteId));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="note-container">
        <div
          className="left-part"
          onClick={() => isOpen && postNewOpenTab(noteId)}
        >
          <MdEdit />
          <p className="note-title">{title}</p>
        </div>
        <MdDelete
          className="delete-btn"
          onClick={() => deleteNote() }
        />
      </div>
    </>
  );
}
