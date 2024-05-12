import { useContext,React} from 'react';
import noteContext from '../context/Notes/noteContext';

export const NoteItem = (props) => {
  const {note,updateNote}= props;
  const context=useContext(noteContext);
  const {deleteNote}=context;
  const handleDeleteNote=()=>{
    deleteNote(note._id);
    props.showAlert("Note deleted Successfully","success");
  }
  return (
    <div className="col-md-3">
      <div className="card my-3">
          <div className="card-body">
            <div style={{display:"flex",alignItems:'center'}}>
            <h5 className="card-title">{note.title}</h5>
            <i type="button" onClick={handleDeleteNote} className="fa-solid fa-trash-can mx-2"></i>
            <i type="button" onClick={()=>updateNote(note)} className="fa-solid fa-pen-to-square mx-2"></i>
            </div>
            <p className="card-text">{note.description}</p>
          </div>
      </div>
    </div>
  )
}
export default NoteItem;
