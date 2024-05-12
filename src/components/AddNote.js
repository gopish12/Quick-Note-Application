import React from 'react'
import noteContext from '../context/Notes/noteContext';
import { useContext,useState } from 'react';

const AddNote = (props) => {
  const [note, setnote] = useState({title:"",description:"",tag:""});
  const context=useContext(noteContext);
  const {addNote}=context;
  const handleOnChange=(event)=>{
      setnote({...note,[event.target.name]:[event.target.value]})
  }
  const handleAddNote=()=>{
      addNote(note.title[0],note.description[0],note.tag[0]);
      setnote({title:"",description:"",tag:""})
      props.showAlert("Note added Successfully","success");
  }
  return (
    <>
    <h2>Enter your Note Here</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input minLength="5" required onChange={handleOnChange} name="title" type="text" className="form-control" id="title" aria-describedby="emailHelp" value={note.title}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input minLength="5" required onChange={handleOnChange} name="description" type="text" className="form-control" id="description" value={note.description}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input onChange={handleOnChange} name="tag" type="text" className="form-control" id="tag" value={note.tag}/>
        </div>
        <button disabled={note.title==="" || note.description==="" || note.title[0].length<3 || note.description[0].length<5} onClick={handleAddNote} type="button" className="btn btn-primary">Add Note</button>
      </form>
    </>
  )
}
export default AddNote;