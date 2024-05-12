import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from "./components/Home"
import About from './components/About';
import NoteState from './context/Notes/NoteState'
import Alert from './components/Alert';
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setalert] = useState(null);
  
  const showAlert=(msg,type)=>{
    setalert({
      msg:msg,
      type:type
    })

    setTimeout(()=>{
      setalert(null);
    },1500)
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          {alert && <Alert alert={alert}/>}
          <div className="container" style={{marginTop:"60px"}}>
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert}/>}/>
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login showAlert={showAlert}/>} />
              <Route exact path='/signup' element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}
export default App;
