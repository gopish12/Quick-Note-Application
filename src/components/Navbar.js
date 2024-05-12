import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location=useLocation().pathname;
  const handleLogout=()=>{
    localStorage.removeItem('token');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">iNotebook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location==='/'?"active":""}`}aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location==='/about'?"active":""}`} to="/about">About</Link>
          </li>
        </ul>
        {!localStorage.getItem('token') && <div className="d-flex">
          <Link className="btn btn-dark mx-2" to="/login" role="button">Login</Link>
          <Link className="btn btn-dark" to="/signup" role="button">SignUp</Link>
        </div>}
        
        {localStorage.getItem('token') && <div className="d-flex">
          <Link onClick={handleLogout} className="btn btn-dark mx-2" to="/login" role="button">Logout</Link>
        </div>}

      </div>
    </div>
  </nav>
  )
}

export default Navbar;