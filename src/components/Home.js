import React, { useContext } from 'react'
import Notes from './Notes';
import noteContext from '../context/Notes/noteContext';

const Home = (props) => {
  const context=useContext(noteContext);
  const {notes}=context;
  return (
    <div >
      <Notes showAlert={props.showAlert} notes={notes}/>
    </div>
  )
}
export default Home;