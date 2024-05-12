import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const host = "http://127.0.0.1:5000";
    const notesInitial=[];
    const [notes,setNotes]=useState(notesInitial)

    //Function to get all the notes of this user
    const getNotes = async () => {
      // API Call 
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json()
      setNotes(json)
    }

    //Function to add a new note 
    const addNote=async (title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/addNote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag})
      });
      const note = await response.json();
      setNotes(notes.concat(note))
    }


    
    //Function to delete an existing note 
    const deleteNote=async(id)=>{
        // API Call 
      const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      getNotes();
    }

    
    //Function to edit an existing note 
    const editNote=async(id,title,description,tag)=>{
      // Using the fetch API to bring the user's notes
      console.log(id,title,description,tag)
      const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
     //till above code updation is done in the database 

      //so as to display it to the user
      let newNotes=JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id){
          newNotes[index].title=title;
          newNotes[index].description=description;
          newNotes[index].tag=tag;
          break;
        }
      }
      setNotes(newNotes);
    }
    
    return (
        <NoteContext.Provider value={{notes,setNotes,addNote,editNote,deleteNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;