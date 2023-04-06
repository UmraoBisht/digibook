import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom'

function Navbar() {
  const nav=useNavigate();
  const hanldleLogout=()=>{
    localStorage.clear();
    nav('/login');
  }
  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary bg-primary" style={{ height: '60px' }}
      data-bs-theme="dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="#">DigiBook❤️</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="contact">Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="about">About</NavLink>
            </li>
          </ul>
          {!localStorage.getItem('AuthToken') ? <div className='login-signup-section'>
            <NavLink className="btn btn-primary mx-1" to="login">Login</NavLink>
            <NavLink className="btn btn-primary mx-1" to="signup">Signup</NavLink>
          </div> :
            <button className="btn btn-primary mx-1" onClick={hanldleLogout}>Logout</button>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar